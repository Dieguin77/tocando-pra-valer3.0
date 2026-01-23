/**
 * 🎸 Serviço de Gerenciamento de Cifras
 * 
 * Este serviço gerencia o envio, aprovação e rejeição de cifras usando
 * múltiplas opções de backend. Escolha a que melhor se adapta às suas necessidades.
 * 
 * OPÇÕES DE BACKEND:
 * 
 * 1. FORMSPREE (Recomendado - Mais simples)
 *    - Crie conta em: https://formspree.io
 *    - Crie um form e pegue o endpoint ID
 *    - Configure: VITE_FORMSPREE_ENDPOINT_ID
 * 
 * 2. GOOGLE SHEETS (Gratuito e visual)
 *    - Use Google Apps Script como API
 *    - Configure: VITE_GOOGLE_SHEETS_WEBAPP_URL
 * 
 * 3. SUPABASE (Database completo)
 *    - Crie projeto em: https://supabase.com
 *    - Configure: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
 * 
 * 4. localStorage (Fallback - apenas desenvolvimento)
 *    - Usado automaticamente se nenhum backend configurado
 */

// =============================================================================
// CONFIGURAÇÃO DE BACKENDS
// =============================================================================

const BACKENDS = {
  FORMSPREE: 'formspree',
  GOOGLE_SHEETS: 'google_sheets',
  SUPABASE: 'supabase',
  LOCAL: 'localStorage',
};

// Detectar qual backend usar baseado nas variáveis de ambiente
const detectBackend = () => {
  if (import.meta.env.VITE_FORMSPREE_ENDPOINT_ID) return BACKENDS.FORMSPREE;
  if (import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL) return BACKENDS.GOOGLE_SHEETS;
  if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) return BACKENDS.SUPABASE;
  return BACKENDS.LOCAL;
};

const ACTIVE_BACKEND = detectBackend();

console.log(`🎸 CifrasService inicializado com backend: ${ACTIVE_BACKEND}`);

// =============================================================================
// 1. FORMSPREE - Backend mais simples (gratuito até 50 submissões/mês)
// =============================================================================

const formspreeSubmit = async (cifra) => {
  const endpoint = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ENDPOINT_ID}`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      _subject: `🎵 Nova Cifra: ${cifra.titulo} - ${cifra.artista}`,
      id: cifra.id,
      titulo: cifra.titulo,
      artista: cifra.artista,
      compositor: cifra.compositor || 'Não informado',
      tom: cifra.tom,
      dificuldade: cifra.dificuldade,
      cifra: cifra.cifra,
      comentarios: cifra.comentarios || '',
      dataCriacao: cifra.dataCriacao,
      status: 'pendente',
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar para Formspree');
  }

  return await response.json();
};

// =============================================================================
// 2. GOOGLE SHEETS - Usar planilha como banco de dados
// =============================================================================

/**
 * Para usar Google Sheets:
 * 
 * 1. Crie uma planilha no Google Sheets com as colunas:
 *    ID | Titulo | Artista | Compositor | Tom | Dificuldade | Cifra | Comentarios | DataCriacao | Status
 * 
 * 2. Vá em Extensões > Apps Script e cole o código:
 * 
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   
 *   sheet.appendRow([
 *     data.id,
 *     data.titulo,
 *     data.artista,
 *     data.compositor,
 *     data.tom,
 *     data.dificuldade,
 *     data.cifra,
 *     data.comentarios,
 *     data.dataCriacao,
 *     data.status
 *   ]);
 *   
 *   return ContentService.createTextOutput(JSON.stringify({success: true}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * function doGet(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = sheet.getDataRange().getValues();
 *   const headers = data[0];
 *   const rows = data.slice(1);
 *   
 *   const result = rows.map(row => {
 *     const obj = {};
 *     headers.forEach((header, i) => obj[header.toLowerCase()] = row[i]);
 *     return obj;
 *   });
 *   
 *   return ContentService.createTextOutput(JSON.stringify(result))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 3. Implante como Web App (Executar como: Eu, Acesso: Qualquer pessoa)
 * 4. Copie a URL e configure em VITE_GOOGLE_SHEETS_WEBAPP_URL
 */

const googleSheetsSubmit = async (cifra) => {
  const webappUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL;
  
  const response = await fetch(webappUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: cifra.id,
      titulo: cifra.titulo,
      artista: cifra.artista,
      compositor: cifra.compositor || '',
      tom: cifra.tom,
      dificuldade: cifra.dificuldade,
      cifra: cifra.cifra,
      comentarios: cifra.comentarios || '',
      dataCriacao: cifra.dataCriacao,
      status: 'pendente',
    }),
  });

  if (!response.ok) {
    throw new Error('Falha ao enviar para Google Sheets');
  }

  return await response.json();
};

const googleSheetsGet = async (status = null) => {
  const webappUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBAPP_URL;
  
  const response = await fetch(webappUrl);
  if (!response.ok) {
    throw new Error('Falha ao buscar do Google Sheets');
  }

  const data = await response.json();
  
  if (status) {
    return data.filter(cifra => cifra.status === status);
  }
  
  return data;
};

// =============================================================================
// 3. SUPABASE - Database completo com realtime
// =============================================================================

/**
 * Para usar Supabase:
 * 
 * 1. Crie um projeto em https://supabase.com
 * 
 * 2. Execute o SQL para criar a tabela:
 * 
 * CREATE TABLE cifras (
 *   id TEXT PRIMARY KEY,
 *   titulo TEXT NOT NULL,
 *   artista TEXT NOT NULL,
 *   compositor TEXT,
 *   tom TEXT NOT NULL,
 *   dificuldade TEXT NOT NULL,
 *   cifra TEXT NOT NULL,
 *   comentarios TEXT,
 *   data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *   status TEXT DEFAULT 'pendente',
 *   data_aprovacao TIMESTAMP WITH TIME ZONE,
 *   motivo_rejeicao TEXT,
 *   data_rejeicao TIMESTAMP WITH TIME ZONE,
 *   musico_email TEXT
 * );
 * 
 * -- Habilitar RLS (Row Level Security)
 * ALTER TABLE cifras ENABLE ROW LEVEL SECURITY;
 * 
 * -- Policy para leitura (todos podem ler aprovadas)
 * CREATE POLICY "Cifras aprovadas são públicas" ON cifras
 *   FOR SELECT USING (status = 'aprovado');
 * 
 * -- Policy para inserção (todos podem enviar)
 * CREATE POLICY "Todos podem enviar cifras" ON cifras
 *   FOR INSERT WITH CHECK (true);
 * 
 * 3. Pegue a URL e anon key em Settings > API
 * 4. Configure em VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
 */

const supabaseClient = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return {
    from: (table) => ({
      insert: async (data) => {
        const response = await fetch(`${url}/rest/v1/${table}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': key,
            'Authorization': `Bearer ${key}`,
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Erro no Supabase');
        }
        
        return { data: null, error: null };
      },
      select: async (columns = '*') => {
        const response = await fetch(`${url}/rest/v1/${table}?select=${columns}`, {
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`,
          },
        });
        
        if (!response.ok) {
          const error = await response.json();
          return { data: null, error };
        }
        
        const data = await response.json();
        return { data, error: null };
      },
      update: async (data) => ({
        eq: async (column, value) => {
          const response = await fetch(`${url}/rest/v1/${table}?${column}=eq.${value}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'apikey': key,
              'Authorization': `Bearer ${key}`,
            },
            body: JSON.stringify(data),
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao atualizar');
          }
          
          return { error: null };
        },
      }),
      delete: async () => ({
        eq: async (column, value) => {
          const response = await fetch(`${url}/rest/v1/${table}?${column}=eq.${value}`, {
            method: 'DELETE',
            headers: {
              'apikey': key,
              'Authorization': `Bearer ${key}`,
            },
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao deletar');
          }
          
          return { error: null };
        },
      }),
    }),
  };
};

const supabaseSubmit = async (cifra) => {
  const client = supabaseClient();
  
  const { error } = await client.from('cifras').insert({
    id: cifra.id,
    titulo: cifra.titulo,
    artista: cifra.artista,
    compositor: cifra.compositor || null,
    tom: cifra.tom,
    dificuldade: cifra.dificuldade,
    cifra: cifra.cifra,
    comentarios: cifra.comentarios || null,
    data_criacao: cifra.dataCriacao,
    status: 'pendente',
    musico_email: cifra.musicoEmail || null,
  });

  if (error) throw error;
  
  return { success: true };
};

const supabaseGet = async (status = null) => {
  const client = supabaseClient();
  
  const { data, error } = await client.from('cifras').select('*');
  
  if (error) throw error;
  
  if (status) {
    return data.filter(cifra => cifra.status === status);
  }
  
  return data;
};

const supabaseUpdate = async (id, updates) => {
  const client = supabaseClient();
  
  const updateData = {
    ...updates,
    ...(updates.status === 'aprovado' && { data_aprovacao: new Date().toISOString() }),
    ...(updates.status === 'rejeitado' && { 
      data_rejeicao: new Date().toISOString(),
      motivo_rejeicao: updates.motivoRejeicao,
    }),
  };

  const { error } = await (await client.from('cifras').update(updateData)).eq('id', id);
  
  if (error) throw error;
  
  return { success: true };
};

const supabaseDelete = async (id) => {
  const client = supabaseClient();
  
  const { error } = await (await client.from('cifras').delete()).eq('id', id);
  
  if (error) throw error;
  
  return { success: true };
};

// =============================================================================
// 4. LOCALSTORAGE - Fallback para desenvolvimento
// =============================================================================

const localStorageSubmit = async (cifra) => {
  const pendentes = JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
  pendentes.push({
    ...cifra,
    status: 'pendente',
  });
  localStorage.setItem('cifrasPendentes', JSON.stringify(pendentes));
  
  return { success: true };
};

const localStorageGet = (status = null) => {
  if (!status) {
    const pendentes = JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
    const aprovadas = JSON.parse(localStorage.getItem('cifrasAprovadas') || '[]');
    const rejeitadas = JSON.parse(localStorage.getItem('cifrasRejeitadas') || '[]');
    return [...pendentes, ...aprovadas, ...rejeitadas];
  }

  switch (status) {
    case 'pendente':
      return JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
    case 'aprovado':
      return JSON.parse(localStorage.getItem('cifrasAprovadas') || '[]');
    case 'rejeitado':
      return JSON.parse(localStorage.getItem('cifrasRejeitadas') || '[]');
    default:
      return [];
  }
};

const localStorageUpdate = (id, updates) => {
  // Encontrar a cifra em pendentes
  const pendentes = JSON.parse(localStorage.getItem('cifrasPendentes') || '[]');
  const cifraIndex = pendentes.findIndex(c => c.id === id);
  
  if (cifraIndex === -1) return { success: false };
  
  const cifra = pendentes[cifraIndex];
  
  // Se está aprovando
  if (updates.status === 'aprovado') {
    const novasPendentes = pendentes.filter(c => c.id !== id);
    localStorage.setItem('cifrasPendentes', JSON.stringify(novasPendentes));
    
    const aprovadas = JSON.parse(localStorage.getItem('cifrasAprovadas') || '[]');
    aprovadas.push({
      ...cifra,
      ...updates,
      dataAprovacao: new Date().toISOString(),
    });
    localStorage.setItem('cifrasAprovadas', JSON.stringify(aprovadas));
  }
  
  // Se está rejeitando
  if (updates.status === 'rejeitado') {
    const novasPendentes = pendentes.filter(c => c.id !== id);
    localStorage.setItem('cifrasPendentes', JSON.stringify(novasPendentes));
    
    const rejeitadas = JSON.parse(localStorage.getItem('cifrasRejeitadas') || '[]');
    rejeitadas.push({
      ...cifra,
      ...updates,
      dataRejeicao: new Date().toISOString(),
    });
    localStorage.setItem('cifrasRejeitadas', JSON.stringify(rejeitadas));
  }
  
  return { success: true };
};

const localStorageDelete = (id, tipo) => {
  const key = tipo === 'aprovado' ? 'cifrasAprovadas' : 'cifrasRejeitadas';
  const cifras = JSON.parse(localStorage.getItem(key) || '[]');
  const novas = cifras.filter(c => c.id !== id);
  localStorage.setItem(key, JSON.stringify(novas));
  
  return { success: true };
};

// =============================================================================
// API PÚBLICA DO SERVIÇO
// =============================================================================

/**
 * Enviar nova cifra
 * @param {Object} cifraData - Dados da cifra
 * @returns {Promise<Object>} - Resultado do envio
 */
export const enviarCifra = async (cifraData) => {
  const cifra = {
    id: `cifra_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...cifraData,
    dataCriacao: new Date().toISOString(),
    status: 'pendente',
  };

  try {
    switch (ACTIVE_BACKEND) {
      case BACKENDS.FORMSPREE:
        await formspreeSubmit(cifra);
        // Também salva localmente para exibir na admin (Formspree não tem GET)
        await localStorageSubmit(cifra);
        break;
      
      case BACKENDS.GOOGLE_SHEETS:
        await googleSheetsSubmit(cifra);
        break;
      
      case BACKENDS.SUPABASE:
        await supabaseSubmit(cifra);
        break;
      
      default:
        await localStorageSubmit(cifra);
    }

    console.log(`✅ Cifra enviada via ${ACTIVE_BACKEND}:`, cifra.titulo);
    
    return {
      success: true,
      cifra,
      message: 'Cifra enviada com sucesso! Aguarde a revisão.',
    };
  } catch (error) {
    console.error(`❌ Erro ao enviar cifra via ${ACTIVE_BACKEND}:`, error);
    
    // Fallback para localStorage se backend falhar
    if (ACTIVE_BACKEND !== BACKENDS.LOCAL) {
      console.log('⚠️ Usando fallback localStorage');
      await localStorageSubmit(cifra);
      return {
        success: true,
        cifra,
        message: 'Cifra salva localmente (modo offline).',
        offline: true,
      };
    }
    
    throw error;
  }
};

/**
 * Buscar cifras por status
 * @param {string} status - 'pendente', 'aprovado', 'rejeitado' ou null para todas
 * @returns {Promise<Array>} - Lista de cifras
 */
export const buscarCifras = async (status = null) => {
  try {
    switch (ACTIVE_BACKEND) {
      case BACKENDS.GOOGLE_SHEETS:
        return await googleSheetsGet(status);
      
      case BACKENDS.SUPABASE:
        return await supabaseGet(status);
      
      default:
        return localStorageGet(status);
    }
  } catch (error) {
    console.error('Erro ao buscar cifras:', error);
    // Fallback para localStorage
    return localStorageGet(status);
  }
};

/**
 * Aprovar cifra
 * @param {string} id - ID da cifra
 * @returns {Promise<Object>} - Resultado
 */
export const aprovarCifra = async (id) => {
  try {
    const updates = { status: 'aprovado' };
    
    switch (ACTIVE_BACKEND) {
      case BACKENDS.SUPABASE:
        return await supabaseUpdate(id, updates);
      
      default:
        return localStorageUpdate(id, updates);
    }
  } catch (error) {
    console.error('Erro ao aprovar cifra:', error);
    throw error;
  }
};

/**
 * Rejeitar cifra
 * @param {string} id - ID da cifra
 * @param {string} motivo - Motivo da rejeição
 * @returns {Promise<Object>} - Resultado
 */
export const rejeitarCifra = async (id, motivo) => {
  try {
    const updates = { 
      status: 'rejeitado',
      motivoRejeicao: motivo,
    };
    
    switch (ACTIVE_BACKEND) {
      case BACKENDS.SUPABASE:
        return await supabaseUpdate(id, updates);
      
      default:
        return localStorageUpdate(id, updates);
    }
  } catch (error) {
    console.error('Erro ao rejeitar cifra:', error);
    throw error;
  }
};

/**
 * Deletar cifra
 * @param {string} id - ID da cifra
 * @param {string} tipo - 'aprovado' ou 'rejeitado'
 * @returns {Promise<Object>} - Resultado
 */
export const deletarCifra = async (id, tipo) => {
  try {
    switch (ACTIVE_BACKEND) {
      case BACKENDS.SUPABASE:
        return await supabaseDelete(id);
      
      default:
        return localStorageDelete(id, tipo);
    }
  } catch (error) {
    console.error('Erro ao deletar cifra:', error);
    throw error;
  }
};

/**
 * Obter informações do backend ativo
 * @returns {Object} - Info do backend
 */
export const getBackendInfo = () => ({
  backend: ACTIVE_BACKEND,
  isConfigured: ACTIVE_BACKEND !== BACKENDS.LOCAL,
  features: {
    sync: ACTIVE_BACKEND === BACKENDS.SUPABASE || ACTIVE_BACKEND === BACKENDS.GOOGLE_SHEETS,
    realtime: ACTIVE_BACKEND === BACKENDS.SUPABASE,
    email: ACTIVE_BACKEND === BACKENDS.FORMSPREE,
  },
});

// Exportar constantes úteis
export { BACKENDS, ACTIVE_BACKEND };
