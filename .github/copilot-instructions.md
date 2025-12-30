# Copilot Instructions - Tocando Pra Valer

## Visão Geral do Projeto
Plataforma de músicas cifradas para músicos, construída com **React 18 + Vite**. Deploy via **GitHub Pages**. O projeto oferece repertório de cifras, ferramentas musicais (metrônomo, afinador, piano virtual) e sistema de upload de cifras com moderação.

## Design System
- **Estilo Visual**: Design clean, minimalista, fundo branco
- **Cor principal**: `blue-500` (#3b82f6) para destaques e CTAs
- **Backgrounds**: `bg-white`, `bg-gray-50` para seções alternadas
- **Bordas**: `border-gray-100` ou `border-gray-200` para cards
- **Textos**: `text-gray-900` (títulos), `text-gray-600` (corpo), `text-gray-500` (secundário)
- **Hover states**: Sombras sutis (`hover:shadow-md`) e bordas coloridas (`hover:border-blue-300`)

## Arquitetura Principal

### Estrutura de Layouts (`src/App.jsx`)
- **PublicLayout**: Páginas públicas (Home, Busca Global, Piano) - fundo branco
- **PlatformLayout**: Área do aluno/admin (Músicas, Upload, Ferramentas) - fundo `bg-gray-50`
- Ambos usam Navbar compartilhada com design clean

### Fluxo de Dados das Músicas
1. Músicas estáticas em `src/data/musicas.jsx` (estrutura: id, titulo, artista, tom, letra com acordes)
2. Letras enriquecidas via API Vagalume em runtime (`src/services/vagalume.js`)
3. Busca de metadados via Genius API (`src/services/geniusAPI.js`)
4. Cifras enviadas por usuários ficam em **localStorage** com status: pendente → aprovado/rejeitado

### Sistema de Upload de Cifras
- Upload público: `/upload` → salva em `cifrasPendentes` (localStorage)
- Admin review: `/admin/revisar-cifras` → aprova/rejeita cifras
- Notificações via EmailJS (`src/services/emailService.js`)

## Convenções de Código

### Formato de Cifras
Acordes entre colchetes inline com a letra:
```
[C]Graça [G]maravilhosa, que [Am]doce o [F]som
```

### Lógica de Transposição (`src/utils/musicLogic.js`)
- `isChordLine(line)`: Detecta se linha contém acordes
- `transposeText(text, semitones)`: Transpõe cifra inteira
- Regex para acordes: `/^([A-G])(#|b)?(m|M|maj|min|dim|aug|sus|add)?\d*(\/[A-G](#|b)?)?$/`

### Ícones
Use `lucide-react` (não React Icons para novos componentes). Wrapper disponível em `src/components/EmojiIcon.jsx` para mapeamento emoji→ícone.

### Estilização
- **Tailwind CSS 4** - NÃO usar modo escuro (design apenas light/branco)
- Evitar gradientes complexos, glow effects e animações pesadas
- Preferir bordas e sombras sutis para hierarquia visual

## Comandos de Desenvolvimento

```bash
npm run dev      # Servidor local (Vite)
npm run build    # Build + cria 404.html para SPA no GitHub Pages
npm run deploy   # Deploy para gh-pages
npm run lint     # ESLint
```

## Variáveis de Ambiente (.env)
```env
VITE_VAGALUME_API_KEY=       # API de letras
VITE_GENIUS_ACCESS_TOKEN=    # API de metadados
VITE_EMAILJS_SERVICE_ID=     # Sistema de emails
VITE_EMAILJS_PUBLIC_KEY=
VITE_ADMIN_EMAIL=
```

## Rotas Principais
| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | Home | Landing page |
| `/musicas` | Songs | Lista de músicas |
| `/musica/:id` | Song | Detalhe com cifra |
| `/upload` | UploadPage | Envio de cifras |
| `/ferramentas` | ToolsPage | Metrônomo, afinador, piano |
| `/admin/revisar-cifras` | AdminReviewCifras | Moderação de cifras |
| `/admin/musicas` | AdminMusic | Gerenciamento via Genius API |

## Padrões Importantes

### Adicionar Nova Música
Edite `src/data/musicas.jsx` seguindo a estrutura:
```jsx
{
  id: 3,  // Incremental
  titulo: "Nome da Música",
  artista: "Artista",
  compositores: "Compositor",
  tom: "C",  // Tom original
  letra: `[C]Verso com [G]acordes...`
}
```

### Criar Novo Serviço de API
Siga padrão de `src/services/vagalume.js`:
1. Variável de ambiente para API key
2. Função assíncrona com tratamento de erro
3. Console.warn se credencial ausente
