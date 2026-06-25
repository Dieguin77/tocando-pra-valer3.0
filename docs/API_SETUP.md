# 🎵 Integração com APIs de Música

## Resumo das APIs Disponíveis

### 1. **Genius API** ✅ Implementada
- **Para quê:** Buscar informações de músicas (título, artista, imagem)
- **Letras:** Não fornece via API (requer parsing de HTML - requer backend)
- **Configuração:** [Genius API Clients](https://genius.com/api-clients)

### 2. **Spotify API** 🚀 Recomendada para letras
- **Para quê:** Informações detalhadas de artistas e músicas
- **Vantagens:** Mais completo que Last.fm
- **Configuração:** [Spotify Developer](https://developer.spotify.com)

### 3. **Last.fm API**
- **Para quê:** Informações de artistas e estatísticas
- **Configuração:** [Last.fm API](https://www.last.fm/api)

### 4. **MusicBrainz API**
- **Para quê:** Banco de dados de músicas (sem letras)
- **Vantagens:** Sem autenticação obrigatória, gratuito
- **Configuração:** [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)

---

## 🔧 Passo a Passo: Configurar Genius API

### 1. Criar Conta no Genius
```
1. Acesse: https://genius.com/api-clients
2. Clique em "Sign Up"
3. Crie uma conta com email ou conta do Google
```

### 2. Criar API Client
```
1. Clique em "Create an API Client"
2. Preencha os dados:
   - Application Name: "Tocando Pra Valer"
   - App Website: "https://tocandopravaler.com.br"
   - Redirect URL: "https://tocandopravaler.com.br"
3. Clique em "Create Client"
```

### 3. Gerar Access Token
```
1. Na página do seu cliente, clique em "Generate Access Token"
2. Você verá um token grande que começa com "XXXXXXX"
3. Copie este token
```

### 4. Configurar no .env
```bash
# Copie o .env.example e renomeie para .env
cp .env.example .env

# Ou crie um novo arquivo .env na raiz do projeto
# Adicione:
VITE_GENIUS_ACCESS_TOKEN=seu_token_copiado_aqui
```

### 5. Verificar Funcionamento
```
O componente SearchMusic agora funcionará!
```

---

## 📝 Como Usar o SearchMusic Component

### No seu componente:
```jsx
import SearchMusic from './components/SearchMusic';

export default function MyPage() {
  const handleSongFound = (songData) => {
    console.log('Música encontrada:', songData);
    // Salvar em banco de dados, adicionar à lista, etc.
  };

  return (
    <div>
      <SearchMusic onSongFound={handleSongFound} />
    </div>
  );
}
```

---

## 🎯 Dados Retornados pela Genius API

```json
{
  "titulo": "Bohemian Rhapsody",
  "artista": "Queen",
  "url": "https://genius.com/Queen-bohemian-rhapsody-lyrics",
  "imagem": "https://images.genius.com/...",
  "compositores": "Freddie Mercury"
}
```

---

## ⚠️ Limitações

### Genius API
- ❌ **Não fornece letras** via API por razões legais
- ✅ Fornece informações básicas (artista, imagem, URL)
- ⚠️ Rate limit: 1 requisição por segundo

### Solução para Letras
Para obter letras, você teria que:
1. Usar web scraping (não recomendado - viola ToS)
2. Usar um serviço como AZLyrics ou similar
3. Usar seu próprio banco de dados de letras

---

## 🚀 Próximos Passos

### Opção 1: Integrar Spotify API
```bash
npm install axios
```

Isso permitiria buscar letras de forma mais confiável.

### Opção 2: Criar Backend
Você poderia criar um servidor Node.js que:
- Faz scraping seguro do Genius
- Armazena letras em banco de dados
- Retorna dados via API própria

### Opção 3: Usar Banco de Dados Local
Manter as letras no `musicas.jsx` e usar Genius só para complementar dados.

---

## 📚 Referências

- [Genius API Documentation](https://docs.genius.com)
- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [Last.fm API](https://www.last.fm/api)
- [MusicBrainz API](https://musicbrainz.org/doc/MusicBrainz_API)
