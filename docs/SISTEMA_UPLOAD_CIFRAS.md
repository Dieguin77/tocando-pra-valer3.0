# 🎸 Sistema de Upload de Cifras - Guia de Uso

## 📋 Visão Geral

Sistema completo para músicos enviarem cifras com moderação do admin. As cifras podem ser:
- ✅ Aprovadas (publicadas no site)
- ❌ Rejeitadas (com motivo)
- ⏳ Pendentes (aguardando revisão)

---

## 🚀 Como Funciona

### 1. **Página de Upload (Público)**
**URL:** `/upload`

Qualquer pessoa pode:
- Enviar uma cifra com título, artista, tom, dificuldade
- Escrever a cifra em texto puro
- Adicionar comentários
- A cifra fica **pendente** até o admin revisar

**Formulário com:**
```
- Título da Música *
- Artista *
- Compositor
- Tom (C, C#, D, D#, E, F, F#, G, G#, A, A#, B)
- Dificuldade (Fácil, Intermediário, Difícil)
- Cifra (texto com acordes) *
- Comentários (opcional)
```

### 2. **Página de Revisão (Admin)**
**URL:** `/admin/revisar-cifras`

O admin pode:
- **Ver todas as cifras pendentes**
- **Expandir e ler** a cifra completa
- **Aprovar** - cifra é publicada
- **Rejeitar** - com motivo explicativo
- **Deletar** cifras aprovadas/rejeitadas

---

## 💾 Armazenamento (localStorage)

As cifras são armazenadas em 3 seções:

```javascript
// Pendentes (aguardando aprovação)
localStorage.getItem('cifrasPendentes')

// Aprovadas (publicadas)
localStorage.getItem('cifrasAprovadas')

// Rejeitadas (com motivo)
localStorage.getItem('cifrasRejeitadas')
```

### Estrutura de cada Cifra:
```json
{
  "id": "cifra_1702000000000",
  "titulo": "Aleluia",
  "artista": "Gabriela Rocha",
  "compositor": "Gabriela Rocha",
  "cifra": "C F\nAleluia, aleluia\nAm G\nQue reina em meu coração",
  "tom": "C",
  "dificuldade": "intermediário",
  "comentarios": "Versão simplificada",
  "dataCriacao": "2025-12-20T10:30:00.000Z",
  "status": "pendente|aprovado|rejeitado",
  "dataAprovacao": "2025-12-20T11:00:00.000Z", // apenas se aprovado
  "motivoRejeicao": "Acordes incorretos", // apenas se rejeitado
  "dataRejeicao": "2025-12-20T11:00:00.000Z" // apenas se rejeitado
}
```

---

## 🎯 Funcionalidades

### ✅ Usuário (Músico)
- [x] Upload de cifras
- [x] Validação de campos obrigatórios
- [x] Feedback de sucesso/erro
- [x] Guia de formatação
- [x] FAQ

### 👨‍💼 Admin
- [x] Visualizar cifras pendentes
- [x] Expandir/colapsar cifra
- [x] Aprovar cifra
- [x] Rejeitar com motivo
- [x] Deletar cifras
- [x] Ver histórico (aprovadas/rejeitadas)
- [x] Contagem de cifras por status

### 🎨 Interface
- [x] Tema claro/escuro
- [x] Responsivo (mobile/tablet/desktop)
- [x] Animações suaves
- [x] Loading states
- [x] Mensagens de feedback

---

## 🔧 Próximas Melhorias Possíveis

1. **Integração com Banco de Dados**
   - Substituir localStorage por banco real
   - Persistência de dados

2. **Autenticação**
   - Criar contas para músicos
   - Histórico de envios por usuário

3. **Sistema de Pontuação**
   - Pontos por cifra aprovada
   - Badge de colaborador

4. **Notificações**
   - Email quando cifra é aprovada/rejeitada
   - Alertas para o admin

5. **Busca Avançada**
   - Filtrar cifras por tom, dificuldade
   - Rating de cifras

6. **Revisão em Tempo Real**
   - Preview da cifra enquanto digita
   - Validação de acordes

---

## 📝 Exemplo de Uso

### 1. Músico Envia Cifra
```
Página: /upload
- Preenche: "Aleluia", "Gabriela Rocha", "C", "Intermediário"
- Cola a cifra com os acordes
- Clica em "Enviar Cifra"
✅ Mensagem: "Cifra enviada com sucesso! Obrigado por contribuir 🎵"
```

### 2. Admin Revisa
```
Página: /admin/revisar-cifras
- Vê "Pendentes (1)"
- Clica em "Ver Cifra"
- Expande e lê a cifra completa
- Clica em "Aprovar" ou "Rejeitar"
✅ Cifra movida para a aba apropriada
```

---

## 🗺️ Rotas do Sistema

| Rota | Descrição | Quem Acessa |
|------|-----------|------------|
| `/upload` | Página de upload | Público |
| `/admin/revisar-cifras` | Revisar cifras | Admin |
| `/` | Home | Público |
| `/musicas` | Repertório | Público |

---

## ⚡ Teste Rápido

1. Acesse: `http://localhost:5174/tocando-pra-valer3.0/upload`
2. Preencha o formulário com uma cifra de teste
3. Clique em "Enviar Cifra"
4. Acesse: `http://localhost:5174/tocando-pra-valer3.0/admin/revisar-cifras`
5. Veja a cifra em "Pendentes"
6. Clique em "Ver Cifra"
7. Aprove ou rejeite

---

## 📚 Tecnologias Utilizadas

- React (Hooks)
- localStorage (persistência)
- CSS3 (variáveis CSS para tema)
- React Router (navegação)
- Componentes customizados

---

## ✨ Status do Sistema

✅ **Completo e Funcional**
- Upload de cifras
- Sistema de revisão
- Persistência em localStorage
- Interface completa
- Responsivo
- Tema claro/escuro

🚀 **Pronto para Produção**
