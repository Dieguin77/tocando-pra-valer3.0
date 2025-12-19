# 🎵 APIs de Música - Resumo Rápido

## O que foi implementado?

✅ **Genius API Integration** - Busca informações de músicas  
✅ **SearchMusic Component** - Interface visual para buscar  
✅ **AdminMusic Page** - Página de gerenciamento (`/admin/musicas`)  
✅ **JSON Export** - Exporte dados para importar no banco  

---

## ⚡ Quick Start

### 1️⃣ Configurar Genius
```
1. Acesse: https://genius.com/api-clients
2. Clique em "Sign Up"
3. Crie um "API Client"
4. Copie o "Access Token"
5. Crie/edite o arquivo .env:
   VITE_GENIUS_ACCESS_TOKEN=seu_token_aqui
```

### 2️⃣ Testar a Ferramenta
```
http://localhost:5173/admin/musicas
```

### 3️⃣ Usar
```
- Busque uma música
- Exporte como JSON
- Importe para seu banco de dados
```

---

## 📁 Arquivos Criados

```
src/
├── services/
│   └── geniusAPI.js          # Serviço de API
├── components/
│   ├── SearchMusic.jsx       # Componente de busca
│   └── SearchMusic.css       # Estilos
├── pages/
│   ├── AdminMusic.jsx        # Página de admin
│   └── AdminMusic.css        # Estilos
├── App.jsx                   # Rota adicionada
│
├── .env.example              # Template do .env
├── API_SETUP.md              # Guia de configuração
└── GUIA_API_MUSICAS.md       # Guia completo
```

---

## 🎯 Dados Retornados

```json
{
  "id": 1,
  "titulo": "Imagine",
  "artista": "John Lennon",
  "compositores": "John Lennon",
  "tom": "C",
  "imagem": "https://...",
  "url": "https://genius.com/..."
}
```

---

## ⚠️ Importante

- **Letras não são fornecidas pela API** (motivos legais)
- Você precisa **preencher manualmente** ou usar web scraping no backend
- Rate limit: **1 requisição por segundo**

---

## 📖 Documentação

- `API_SETUP.md` - Configuração detalhada
- `GUIA_API_MUSICAS.md` - Guia completo com exemplos
- [Genius API](https://docs.genius.com)

---

## 🚀 Próximos Passos

1. Configurar token do Genius
2. Acessar `/admin/musicas`
3. Buscar e exportar músicas
4. Adicionar letras manualmente
5. Importar JSON para seu banco

---

**Qualquer dúvida, consulte os guias em formato markdown!**
