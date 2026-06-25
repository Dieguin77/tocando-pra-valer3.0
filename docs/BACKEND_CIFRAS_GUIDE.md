# 🎸 Sistema de Recebimento de Cifras - Backend Guide

Este documento descreve como configurar o sistema de backend para receber cifras enviadas pelos usuários.

## 📋 Visão Geral

O sistema suporta **4 opções de backend** para receber cifras:

| Backend | Dificuldade | Custo | Recursos |
|---------|------------|-------|----------|
| **Formspree** | ⭐ Fácil | Grátis (50/mês) | Recebe por email |
| **Google Sheets** | ⭐⭐ Médio | Grátis | Planilha visual |
| **Supabase** | ⭐⭐⭐ Avançado | Grátis | Database completo |
| **localStorage** | Automático | Grátis | Apenas local (fallback) |

---

## 🚀 Opção 1: FORMSPREE (Recomendado para começar)

A opção mais simples - você recebe as cifras por email.

### Setup (5 minutos)

1. **Crie uma conta** em [formspree.io](https://formspree.io)

2. **Crie um novo form**:
   - Clique em "New Form"
   - Dê um nome (ex: "Cifras Tocando Pra Valer")
   - Confirme seu email

3. **Pegue o endpoint ID**:
   - Na página do form, copie o ID (ex: `xyzabcde` de `https://formspree.io/f/xyzabcde`)

4. **Configure no `.env`**:
   ```env
   VITE_FORMSPREE_ENDPOINT_ID=xyzabcde
   ```

5. **Reinicie o servidor** (`npm run dev`)

### Como funciona

- Cada cifra enviada vai para seu email
- O sistema também salva localmente para você revisar no painel admin
- Gratuito até 50 envios por mês

---

## 📊 Opção 2: GOOGLE SHEETS (Visual e prático)

Use uma planilha do Google como banco de dados. Perfeito para visualizar e editar cifras.

### Setup (15 minutos)

#### 1. Crie a Planilha

1. Vá em [sheets.google.com](https://sheets.google.com) e crie uma nova planilha
2. Renomeie para "Cifras - Tocando Pra Valer"
3. Na primeira linha, adicione as colunas:

```
ID | Titulo | Artista | Compositor | Tom | Dificuldade | Cifra | Comentarios | DataCriacao | Status
```

#### 2. Configure o Apps Script

1. Vá em **Extensões > Apps Script**
2. Delete o código existente e cole:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.id,
      data.titulo,
      data.artista,
      data.compositor || '',
      data.tom,
      data.dificuldade,
      data.cifra,
      data.comentarios || '',
      data.dataCriacao,
      data.status || 'pendente'
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return ContentService.createTextOutput(JSON.stringify([]))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const headers = data[0].map(h => h.toString().toLowerCase());
    const rows = data.slice(1);
    
    const result = rows.map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
    
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({error: error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Salve o projeto (Ctrl+S)

#### 3. Implante como Web App

1. Clique em **Implantar > Nova implantação**
2. Selecione tipo: **App da Web**
3. Configure:
   - Descrição: "API de Cifras"
   - Executar como: **Eu (seu email)**
   - Quem pode acessar: **Qualquer pessoa**
4. Clique em **Implantar**
5. **Autorize** o acesso quando solicitado
6. **Copie a URL** do Web App

#### 4. Configure no `.env`

```env
VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/ABC123XYZ/exec
```

### Recursos

✅ Visualize todas as cifras na planilha  
✅ Edite status manualmente (pendente → aprovado)  
✅ Gratuito e ilimitado  
✅ Compartilhe com sua equipe  

---

## 🗄️ Opção 3: SUPABASE (Database completo)

Para quem quer um backend profissional com painel admin completo.

### Setup (20 minutos)

#### 1. Crie o Projeto

1. Vá em [supabase.com](https://supabase.com) e crie uma conta
2. Clique em "New Project"
3. Configure:
   - Nome: "tocando-pra-valer"
   - Senha do banco: (guarde em local seguro)
   - Região: South America (São Paulo)
4. Aguarde o projeto ser criado (~2 min)

#### 2. Crie a Tabela

1. Vá em **SQL Editor** (menu lateral)
2. Clique em "New query"
3. Cole e execute:

```sql
-- Tabela de cifras
CREATE TABLE cifras (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  artista TEXT NOT NULL,
  compositor TEXT,
  tom TEXT NOT NULL,
  dificuldade TEXT NOT NULL,
  cifra TEXT NOT NULL,
  comentarios TEXT,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pendente',
  data_aprovacao TIMESTAMP WITH TIME ZONE,
  motivo_rejeicao TEXT,
  data_rejeicao TIMESTAMP WITH TIME ZONE,
  musico_email TEXT
);

-- Habilitar Row Level Security
ALTER TABLE cifras ENABLE ROW LEVEL SECURITY;

-- Todos podem ver cifras aprovadas
CREATE POLICY "Cifras aprovadas são públicas" ON cifras
  FOR SELECT USING (status = 'aprovado' OR status = 'pendente');

-- Todos podem enviar novas cifras
CREATE POLICY "Todos podem enviar cifras" ON cifras
  FOR INSERT WITH CHECK (true);

-- Apenas admin pode atualizar (configure depois)
CREATE POLICY "Admin pode atualizar" ON cifras
  FOR UPDATE USING (true);

-- Apenas admin pode deletar
CREATE POLICY "Admin pode deletar" ON cifras
  FOR DELETE USING (true);

-- Index para performance
CREATE INDEX idx_cifras_status ON cifras(status);
CREATE INDEX idx_cifras_data ON cifras(data_criacao DESC);
```

4. Clique em "Run"

#### 3. Pegue as Credenciais

1. Vá em **Settings > API** (menu lateral)
2. Copie:
   - **Project URL**: `https://xyzabc.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...`

#### 4. Configure no `.env`

```env
VITE_SUPABASE_URL=https://xyzabc.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Recursos do Supabase

✅ Painel admin completo (Table Editor)  
✅ Filtros, ordenação, edição em massa  
✅ Realtime updates  
✅ 500MB storage gratuito  
✅ Authentication integrado (futura autenticação)  

---

## 🔧 Como o Sistema Detecta o Backend

O sistema detecta automaticamente qual backend usar baseado nas variáveis de ambiente:

```
1. Se VITE_FORMSPREE_ENDPOINT_ID → Usa Formspree
2. Se VITE_GOOGLE_SHEETS_WEBAPP_URL → Usa Google Sheets
3. Se VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY → Usa Supabase
4. Senão → Usa localStorage (fallback)
```

### Indicadores Visuais

O sistema mostra o status do backend:

- 🟢 **"Sincronizado"** - Backend configurado e funcionando
- 🟠 **"Modo Local"** - Usando localStorage (sem backend)

---

## 📱 Fluxo de uma Cifra

```
[Músico envia cifra]
       ↓
[cifrasService.js detecta backend]
       ↓
   ┌───┴───┐
   ↓       ↓
Formspree  Google Sheets / Supabase
(email)    (database)
   ↓       ↓
   └───┬───┘
       ↓
[Admin revisa em /admin/revisar-cifras]
       ↓
   ┌───┴───┐
   ↓       ↓
Aprovar    Rejeitar
   ↓       ↓
Publicada  Arquivada
```

---

## 🎯 Recomendação por Caso de Uso

| Situação | Recomendação |
|----------|--------------|
| Começando agora, poucas cifras | **Formspree** |
| Quer visualizar em planilha | **Google Sheets** |
| Site em produção, muitos usuários | **Supabase** |
| Apenas desenvolvimento local | **localStorage** |

---

## 🔒 Segurança

### Formspree
- Verificação de email
- Proteção contra spam

### Google Sheets
- Autenticação do Google
- Compartilhamento controlado

### Supabase
- Row Level Security (RLS)
- API keys com permissões limitadas
- Autenticação JWT

---

## 🚨 Troubleshooting

### "Cifras não aparecem no admin"

1. Verifique se o `.env` está configurado
2. Reinicie o servidor (`npm run dev`)
3. Verifique o console do navegador (F12)

### "Erro ao enviar cifra"

1. Verifique se as credenciais estão corretas
2. Verifique se o backend está acessível
3. O sistema usa localStorage como fallback

### "Google Sheets não recebe dados"

1. Verifique se o Web App está implantado como "Qualquer pessoa"
2. Teste a URL diretamente no navegador
3. Verifique os logs em Apps Script > Execuções

### "Supabase retorna erro 401"

1. Verifique se a anon key está correta
2. Verifique se as políticas RLS permitem a operação
3. Verifique se a tabela existe

---

## 📚 Arquivos Modificados

```
src/services/cifrasService.js  - Novo serviço de backend
src/components/UploadCifra.jsx - Integrado com novo serviço
src/pages/AdminReviewCifras.jsx - Integrado com novo serviço
.env.example - Novas variáveis de ambiente
```

---

## 🎵 Próximos Passos

1. Escolha seu backend preferido
2. Configure as credenciais no `.env`
3. Reinicie o servidor
4. Teste enviando uma cifra em `/upload`
5. Revise em `/admin/revisar-cifras`

**Dúvidas?** Abra uma issue no GitHub! 🚀
