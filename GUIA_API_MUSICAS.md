# 🎸 Guia Completo: Integração de APIs de Música

## ✅ O que foi implementado

### 1. **Serviço Genius API** 
- Arquivo: `src/services/geniusAPI.js`
- Funções:
  - `searchSongOnGenius()` - Busca uma música
  - `enrichSongsWithGeniusData()` - Enriquece múltiplas músicas
  - `getLyricsFromGenius()` - Busca letras (requer backend)

### 2. **Componente SearchMusic**
- Arquivo: `src/components/SearchMusic.jsx`
- Permite buscar e adicionar músicas do Genius
- Exibe imagem, artista, compositor e link

### 3. **Página AdminMusic**
- Arquivo: `src/pages/AdminMusic.jsx`
- Interface para gerenciar músicas
- Exportar dados como JSON
- Rota: `/admin/musicas`

---

## 🔑 Passo 1: Configurar Genius API

### 1.1 Criar Conta
```
1. Abra: https://genius.com/api-clients
2. Clique em "Sign Up"
3. Preencha seus dados
```

### 1.2 Criar API Client
```
1. Clique em "Create an API Client"
2. Preencha:
   - Application Name: "Tocando Pra Valer"
   - App Website: "https://tocandopravaler.com.br"
   - Redirect URL: "https://tocandopravaler.com.br"
```

### 1.3 Gerar Token
```
1. Na página do cliente, clique em "Generate Access Token"
2. Copie o token (começa com letras/números)
```

### 1.4 Configurar .env
```bash
# Crie um arquivo .env na raiz do projeto
# Conteúdo:
VITE_GENIUS_ACCESS_TOKEN=seu_token_aqui
```

---

## 🚀 Passo 2: Usar a Ferramenta de Admin

### 2.1 Acessar a Página
```
URL: http://localhost:5173/admin/musicas
```

### 2.2 Buscar uma Música
```
1. Digite o título (ex: "Imagine")
2. Digite o artista (ex: "John Lennon")
3. Clique em "Buscar"
4. A música será exibida se encontrada
```

### 2.3 Adicionar à Lista
```
A música é automaticamente adicionada ao clicar em "Buscar"
```

### 2.4 Exportar Dados
```
1. Clique em "Download JSON"
2. Abre um arquivo JSON com os dados
3. Copie e adicione ao seu banco de dados
```

---

## 📊 Estrutura de Dados Retornada

```javascript
{
  id: 1,
  titulo: "Bohemian Rhapsody",
  artista: "Queen",
  compositores: "Freddie Mercury",
  tom: "C",
  imagem: "https://images.genius.com/...",
  url: "https://genius.com/Queen-bohemian-rhapsody-lyrics",
  letra: ""  // Vazio - precisa ser preenchido manualmente
}
```

---

## ⚠️ Importante: Letras

**A Genius API não fornece letras por razões legais.**

### Opções para Obter Letras:

#### Opção 1: Preencher Manualmente
- Copie do CifraClub ou Genius
- Adicione os acordes entre colchetes

#### Opção 2: Usar Web Scraping (Backend)
```javascript
// Isso requer um servidor Node.js
// O servidor faria o scraping e retornaria a letra
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

app.get('/scrape/lyrics/:url', async (req, res) => {
  // Implementar scraping aqui
});
```

#### Opção 3: Banco de Dados Próprio
```
Manter um banco de dados com letras cifradas
Sincronizar com Genius para complementar informações
```

---

## 🎯 Fluxo Completo

```
1. Usar /admin/musicas
2. Buscar música no Genius
3. Exibir informações (artista, imagem, compositor)
4. Adicionar letra manualmente ou via scraping
5. Exportar JSON
6. Adicionar ao musicas.jsx ou banco de dados
7. Música aparece em /musicas
```

---

## 📝 Exemplo de Uso no Seu Código

### Para Buscar Uma Música:
```jsx
import { searchSongOnGenius } from './services/geniusAPI';

const song = await searchSongOnGenius('Imagine', 'John Lennon');
console.log(song);
// {
//   titulo: "Imagine",
//   artista: "John Lennon",
//   imagem: "...",
//   url: "..."
// }
```

### Para Enriquecer Dados Existentes:
```jsx
import { enrichSongsWithGeniusData } from './services/geniusAPI';

const musicas = [
  { titulo: "Imagine", artista: "John Lennon", letra: "..." }
];

const enriched = await enrichSongsWithGeniusData(musicas);
```

---

## 🛠️ Troubleshooting

### "VITE_GENIUS_ACCESS_TOKEN não configurado"
```
✓ Certifique-se de criar o arquivo .env
✓ Reinicie o servidor (npm run dev)
✓ Verifique se o token está correto
```

### "Música não encontrada"
```
✓ Tente buscar com nome exato (ex: "Bohemian Rhapsody", não "bohemian")
✓ Use artista conhecido
✓ Tente com variações do nome
```

### "Rate limit exceeded"
```
✓ Genius permite 1 requisição por segundo
✓ Aguarde um pouco
✓ Tente novamente
```

---

## 🚀 Próximas Melhorias

### 1. Integrar Spotify API
```bash
npm install spotify-web-api-js
```

### 2. Adicionar Web Scraping
```bash
npm install cheerio axios
```

### 3. Criar Backend Node.js
```javascript
// Para fazer scraping e armazenar letras
```

### 4. Integrar CifraClub
```
Se CifraClub tiver API pública (verificar)
```

---

## 📚 Documentação

- [Genius API Docs](https://docs.genius.com)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Last.fm API](https://www.last.fm/api)

---

## 💡 Dicas Finais

1. **Use a página `/admin/musicas` para adicionar músicas em massa**
2. **Exporte o JSON depois de buscar várias músicas**
3. **Edite manualmente as letras após baixar o JSON**
4. **Teste com algumas músicas populares primeiro**

---

Qualquer dúvida, consulte o arquivo `API_SETUP.md` ou a documentação das APIs!
