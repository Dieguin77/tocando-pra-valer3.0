<div align="center">

  <img src="public/logo.png" alt="Tocando Pra Valer" width="110" />

  # 🎸 Tocando Pra Valer

  **Plataforma musical completa para músicos brasileiros**

  Cifras · Afinador · Metrônomo · Piano Virtual · Busca de Letras — tudo em um só lugar, 100% gratuito.

  <br />

  [![Demo Online](https://img.shields.io/badge/🌐%20Demo%20Online-tocando--pra--valer3--0.vercel.app-0172AA?style=for-the-badge)](https://tocando-pra-valer3-0.vercel.app)
  [![Licença MIT](https://img.shields.io/badge/Licença-MIT-22c55e?style=for-the-badge)](LICENSE)

  <br />

  ![React](https://img.shields.io/badge/React_18-20232a?style=flat-square&logo=react&logoColor=61DAFB)
  ![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
  ![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript_ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

  <br />

  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
  ![Status](https://img.shields.io/badge/status-active-success.svg?style=flat-square)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Demo ao Vivo](#-demo-ao-vivo)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Como Executar](#-como-executar)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Build e Deploy](#-build-e-deploy)
- [Integrações de API](#-integrações-de-api)
- [SEO e Performance](#-seo-e-performance)
- [Roadmap](#-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

O **Tocando Pra Valer** nasceu para resolver um problema real: músicos iniciantes e intermediários precisam de ferramentas práticas espalhadas em dezenas de sites diferentes. A proposta é centralizar tudo em uma plataforma leve, acessível e sem necessidade de cadastro.

### O Problema que Resolve

| Antes | Com o Tocando Pra Valer |
|---|---|
| 5 abas abertas para praticar | Tudo em uma só plataforma |
| Afinador num site, cifra em outro | Ferramentas integradas ao acervo |
| Sites lentos e cheios de anúncios | Interface limpa e rápida |
| Pagar para acessar conteúdo básico | 100% gratuito, sem cadastro |
| Não encontrar cifras específicas | Busca via APIs com milhões de músicas |

### Destaques Técnicos

- ⚡ **Code splitting** com `React.lazy` + `Suspense` — bundle inicial otimizado
- 🔁 **`useDeferredValue`** para debounce nativo de busca sem bibliotecas externas (React 18)
- 🔌 **Multi-backend** com detecção automática (Supabase · Formspree · Google Sheets · localStorage)
- 🌐 **CORS Proxy próprio** via Vercel Serverless Function com cache e whitelist de hosts
- 🎨 **Design system** com CSS custom properties (dark/light mode + anti-FOUC)
- 🪝 **Custom hooks** para lógica reutilizável (`useClickOutside`)
- ♿ **Acessibilidade**: `aria-label`, `aria-expanded`, `role`, `alt` text, focus management

---

## 🌐 Demo ao Vivo

> 🔗 **[tocando-pra-valer3-0.vercel.app](https://tocando-pra-valer3-0.vercel.app)**

| Seção | Rota |
|---|---|
| 🏠 Landing Page | `/` |
| 📖 Biblioteca de Cifras | `/#/musicas` |
| 🔧 Ferramentas (Piano · Afinador · Metrônomo) | `/#/ferramentas` |
| 🎹 Piano Virtual | `/#/piano` |
| 🔍 Busca de Letras | `/#/busca-global` |
| 📤 Enviar Cifra | `/#/upload` |

> **Screenshots** — adicione capturas de tela em `docs/screenshots/` para exibir aqui.

---

## ✨ Funcionalidades

### 📖 Biblioteca de Cifras
- Busca em tempo real com `useDeferredValue` (debounce nativo do React 18, sem lodash)
- Transposição automática de tom com um clique
- Diagramas visuais de acordes (banco com 40+ acordes para guitarra/violão)
- Busca de letra integrada à API Vagalume com fallback automático para Lyrics.ovh
- Embed de vídeo aula do YouTube diretamente na página da cifra
- Suporte a cifras enviadas pela comunidade (aprovadas via fluxo admin)

### 🔧 Ferramentas Musicais
- **Metrônomo** — BPM ajustável (60–240) com marcação visual e sonora sincronizadas
- **Afinador** — Detecção de frequência em tempo real via Web Audio API (microfone)
- **Piano Virtual** — 2 oitavas completas, suporte a clique do mouse e atalhos de teclado:

```
Teclas brancas:  A   S   D   F   G   H   J   K
Teclas pretas:   W   E       T   Y   U
```

### 🔍 Busca Global de Letras
- Busca por artista e título em qualquer idioma
- Integração primária com **Vagalume API** (especializado em músicas brasileiras)
- Fallback automático para **Lyrics.ovh** (cobertura internacional)
- CORS proxy próprio no Vercel com retry em múltiplos endpoints
- Transposição de tom diretamente na letra buscada

### 📤 Sistema de Contribuição de Cifras
- Formulário completo com validação de campos no client-side
- **4 backends suportados com detecção automática por variável de ambiente**:

```
Prioridade: Supabase → Google Sheets → Formspree → localStorage
```

- Fluxo completo de emails automáticos via EmailJS (sem servidor próprio):

```
Colaborador envia cifra
  ├─▶ Email de confirmação ao colaborador
  └─▶ Notificação ao administrador
        └─▶ Admin revisa em /admin/revisar-cifras
              ├─▶ Aprovação  → email ao colaborador
              └─▶ Rejeição   → email com motivo ao colaborador
```

### 🎨 UX / Design System
- **Dark Mode** com persistência em `localStorage` e detecção da preferência do SO
- Script anti-FOUC no `<head>` para aplicar o tema antes do React montar (zero flash)
- Glass morphism UI com `backdrop-filter: blur()`
- Design responsivo (mobile-first com breakpoints Tailwind)
- Animações e transições suaves em elementos interativos

---

## 🛠️ Tecnologias

### Core

| Tecnologia | Versão | Por que foi escolhida |
|---|---|---|
| [React](https://react.dev/) | 18.3 | Hooks modernos: `useDeferredValue`, `useTransition`, `lazy` |
| [Vite](https://vitejs.dev/) | 5.4 | HMR instantâneo, build com tree-shaking, plugin React |
| [React Router DOM](https://reactrouter.com/) | 7.0 | HashRouter para SPA em qualquer CDN sem config de servidor |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utilitários + `@theme` para design system customizado |

### Bibliotecas de UI e Utilitários

| Biblioteca | Uso |
|---|---|
| [Lucide React](https://lucide.dev/) | Ícones SVG modernos e acessíveis |
| [react-icons](https://react-icons.github.io/) | Ícones de marcas (Instagram, YouTube) |
| [@tombatossals/react-chords](https://github.com/tombatossals/react-chords) | Renderização de diagramas de acordes |
| [EmailJS](https://www.emailjs.com/) | Transações de email sem servidor próprio |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/nicolo-ribaudo/tailwind-merge) | Composição segura de classes CSS condicionais |

### APIs e Serviços Externos

| Serviço | Função | Autenticação |
|---|---|---|
| [Vagalume](https://api.vagalume.com.br/) | Letras de músicas brasileiras | API Key |
| [Lyrics.ovh](https://lyrics.ovh/) | Letras internacionais (fallback) | Pública |
| [YouTube IFrame API](https://developers.google.com/youtube/) | Embed de vídeos aula | Pública |
| [EmailJS](https://www.emailjs.com/) | Envio de emails transacionais | Service ID + Template ID |

### Infraestrutura

| Serviço | Uso |
|---|---|
| [Vercel](https://vercel.com/) | Hospedagem SPA + Serverless Functions |
| [Formspree](https://formspree.io/) | Backend para receber cifras (MVP) |
| [Supabase](https://supabase.com/) | PostgreSQL em tempo real (produção) |
| [gh-pages](https://github.com/tschaub/gh-pages) | Deploy alternativo no GitHub Pages |

---

## 🏗️ Arquitetura

```
┌──────────────────────────────────────────────────────────────┐
│                        BROWSER (SPA)                          │
│                                                               │
│  React 18 + HashRouter + ThemeContext                         │
│                                                               │
│  Rotas lazy-loaded (cada uma = chunk separado no build):      │
│  /           → Home.jsx                                       │
│  /musicas    → Songs.jsx       /musica/:id  → Song.jsx        │
│  /ferramentas→ ToolsPage.jsx   /piano       → PianoPage.jsx   │
│  /busca-global→ GlobalSearch.jsx  /upload   → UploadPage.jsx  │
│  /admin/*    → AdminMusic.jsx | AdminReviewCifras.jsx         │
│                                                               │
│  Hooks customizados:                                          │
│  useClickOutside → fecha dropdowns ao clicar fora            │
└─────────────────────────┬────────────────────────────────────┘
                           │ HTTPS
          ┌────────────────┴──────────────────────────┐
          │                                            │
┌─────────▼──────────┐              ┌──────────────────▼───────┐
│  /api/proxy.js      │              │    APIs Externas          │
│  Vercel Serverless  │              │  • Vagalume API           │
│  ─────────────────  │              │  • Lyrics.ovh (fallback)  │
│  Whitelist de hosts │              │  • YouTube Embed          │
│  Cache: 1h (CDN)    │              │  • EmailJS                │
│  Timeout: 12s       │              └───────────────────────────┘
└─────────┬──────────┘
          │
┌─────────▼──────────────────────────────────────┐
│          cifrasService.js (multi-backend)        │
│  Detecção automática via variáveis de ambiente  │
│  Supabase → Google Sheets → Formspree → localStorage │
└─────────────────────────────────────────────────┘
```

### Decisões Arquiteturais Importantes

**HashRouter vs BrowserRouter**
`HashRouter` garante que o app funcione em qualquer CDN (Vercel, GitHub Pages, Netlify) sem configuração de servidor para client-side routing. O `#` na URL torna a solução autocontida — funciona até em `file://`. O `vercel.json` redireciona rotas não-API para `index.html` como camada adicional para as Serverless Functions.

**Code Splitting por Rota**
Todas as páginas usam `React.lazy()` + `Suspense`. Cada rota vira um chunk separado no build do Vite, carregado sob demanda. O bundle inicial fica pequeno e o TTI (Time to Interactive) é reduzido.

**Multi-Backend com Detecção Automática**
O `cifrasService.js` verifica as variáveis de ambiente em tempo de execução e seleciona automaticamente o backend disponível. Nenhuma mudança de código é necessária ao migrar de Formspree para Supabase — só muda a variável de ambiente.

**CORS Proxy Próprio**
Em vez de depender de proxies públicos (instáveis e lentos), a Serverless Function `/api/proxy.js` no Vercel resolve o CORS com whitelist de hosts permitidos, cache de 1 hora no CDN e timeout configurado. O `GlobalSearch` implementa retry automático com fallback para proxy público.

---

## 📁 Estrutura de Pastas

```
tocando-pra-valer/
├── api/
│   └── proxy.js                    # Serverless Function — CORS Proxy
├── public/
│   ├── favicon.png
│   ├── logo.png
│   ├── robots.txt                  # Indexação para crawlers
│   └── sitemap.xml                 # Mapa do site para SEO
├── src/
│   ├── assets/                     # Imagens (importadas via módulo ES)
│   │   ├── adolescente-tocando.jpg
│   │   ├── homem-tocando.jpg
│   │   ├── logooficial.png
│   │   └── ...
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── ChordDiagram.jsx        # Diagrama visual (6 cordas, frets, barre)
│   │   ├── Metronome.jsx           # Metrônomo: BPM + marcação visual/sonora
│   │   ├── Navbar.jsx              # Barra de navegação global
│   │   ├── ThemeToggle.jsx         # Alternador dark/light
│   │   ├── Tuner.jsx               # Afinador via Web Audio API (microfone)
│   │   ├── UploadCifra.jsx         # Formulário de envio de cifras
│   │   └── VirtualPiano.jsx        # Piano 2 oitavas + atalhos de teclado
│   ├── contexts/
│   │   └── ThemeContext.jsx        # Context global: tema dark/light
│   ├── data/
│   │   ├── chords-db.jsx           # Banco de 40+ acordes (frets/fingers/barres)
│   │   └── musicas.jsx             # Seed data de músicas local
│   ├── hooks/
│   │   └── useClickOutside.js      # Fecha elemento ao clicar fora do ref
│   ├── pages/
│   │   ├── AdminMusic.jsx          # Admin: gestão do acervo de músicas
│   │   ├── AdminReviewCifras.jsx   # Admin: aprovação/rejeição de cifras
│   │   ├── GlobalSearch.jsx        # Busca de letras (Vagalume + Lyrics.ovh)
│   │   ├── Home.jsx                # Landing page da plataforma
│   │   ├── PianoPage.jsx           # Página dedicada ao piano virtual
│   │   ├── Song.jsx                # Cifra individual + diagrama + vídeo
│   │   ├── Songs.jsx               # Listagem de cifras + busca em tempo real
│   │   ├── ToolsPage.jsx           # Hub: Metrônomo | Afinador | Piano
│   │   └── UploadPage.jsx          # Formulário + guia de envio de cifras
│   ├── services/
│   │   ├── cifrasService.js        # CRUD de cifras (abstração multi-backend)
│   │   ├── emailService.js         # Transações de email via EmailJS
│   │   ├── geniusAPI.js            # Integração Genius API (planejado)
│   │   └── vagalume.js             # Busca de letras na API Vagalume
│   ├── utils/
│   │   └── musicLogic.js           # Transposição, teoria musical
│   ├── App.jsx                     # Roteador central + layouts + Suspense
│   ├── index.css                   # Design system: CSS vars + Tailwind + glass
│   └── main.jsx                    # Entry point: providers + HashRouter
├── .env.example                    # Template de variáveis de ambiente
├── CHANGELOG.md                    # Histórico de versões
├── index.html                      # HTML base: SEO + anti-FOUC script
├── package.json
├── tailwind.config.js
├── vercel.json                     # Rewrite SPA + detecção de Serverless
└── vite.config.js
```

---

## ⚙️ Pré-requisitos

- **Node.js** 18 LTS ou superior
- **npm** 9+

```bash
node --version   # v18.0.0 ou superior
npm --version    # 9.0.0 ou superior
```

---

## 💻 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/Dieguin77/tocando-pra-valer.git
cd tocando-pra-valer
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

> **Nota**: O projeto funciona sem nenhuma variável configurada. Sem elas, as cifras são salvas em `localStorage` e a busca de letras usa a Lyrics.ovh (pública, sem chave).

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: **http://localhost:5173**

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build otimizado para produção em `./dist` |
| `npm run preview` | Preview local do build de produção |
| `npm run lint` | Análise estática com ESLint |
| `npm run deploy` | Deploy no GitHub Pages via `gh-pages` |

---

## 🔧 Variáveis de Ambiente

Copie `.env.example` para `.env.local` e preencha:

```env
# ── BUSCA DE LETRAS ──────────────────────────────────────────
VITE_VAGALUME_API_KEY=sua_chave_aqui

# ── EMAIL (EmailJS) ──────────────────────────────────────────
# Crie templates em emailjs.com para cada evento do fluxo
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_CONFIRMACAO=template_xxxxxxx
VITE_EMAILJS_TEMPLATE_NOTIF_ADMIN=template_xxxxxxx
VITE_EMAILJS_TEMPLATE_APROVACAO=template_xxxxxxx
VITE_EMAILJS_TEMPLATE_REJEICAO=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
VITE_ADMIN_EMAIL=seu@email.com

# ── BACKEND DE CIFRAS (configure um dos três abaixo) ─────────
# Precedência automática: Supabase > Google Sheets > Formspree > localStorage

# Opção 1 — Formspree (mais simples, ideal para MVP)
VITE_FORMSPREE_ENDPOINT_ID=xpwznnge

# Opção 2 — Google Sheets via Apps Script
VITE_GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec

# Opção 3 — Supabase (recomendado para produção)
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 🚀 Build e Deploy

### Build de produção

```bash
npm run build
# Saída em ./dist/ — pronto para qualquer CDN ou servidor estático
```

### Deploy no Vercel (recomendado)

1. Faça push do repositório para o GitHub
2. Importe em [vercel.com/new](https://vercel.com/new)
3. Adicione as variáveis de ambiente no painel
4. O `vercel.json` já configura tudo:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/" }
  ]
}
```

As Serverless Functions em `/api/` são detectadas automaticamente.

### Deploy no GitHub Pages

```bash
npm run deploy
# Publica dist/ na branch gh-pages
# HashRouter garante funcionamento sem config adicional
```

---

## 🔌 Integrações de API

### CORS Proxy (`/api/proxy.js`)

Serverless Function que resolve problemas de CORS ao acessar APIs externas:

```
GET /api/proxy?url=https://api.vagalume.com.br/search.art.php?...
```

- Whitelist de hosts permitidos: `api.lyrics.ovh`, `api.vagalume.com.br`
- Cache no CDN da Vercel: `s-maxage=3600` (1 hora)
- Timeout: 12 segundos
- Estratégia de retry no cliente com fallback para proxy público

### Sistema de Email

Quatro templates EmailJS para o fluxo completo sem backend próprio:

| Função | Template | Disparado quando |
|---|---|---|
| `enviarConfirmacao()` | `TEMPLATE_CONFIRMACAO` | Cifra enviada com sucesso |
| `notificarAdminNovaCifra()` | `TEMPLATE_NOTIF_ADMIN` | Nova cifra recebida |
| `enviarNotificacaoAprovacao()` | `TEMPLATE_APROVACAO` | Admin aprova a cifra |
| `enviarNotificacaoRejeicao()` | `TEMPLATE_REJEICAO` | Admin rejeita a cifra |

---

## 📊 SEO e Performance

### Otimizações implementadas

| Área | Implementação |
|---|---|
| **Bundle** | Code splitting por rota (`React.lazy` + `Suspense`) |
| **Imagens** | `loading="lazy"` + `decoding="async"` |
| **Tema** | Anti-FOUC via script inline no `<head>` |
| **Schema.org** | JSON-LD (`EducationalOrganization`) |
| **Open Graph** | Meta tags completas (título, descrição, imagem, URL) |
| **Twitter Cards** | `summary_large_image` |
| **Canonical** | URL canônica para evitar conteúdo duplicado |
| **Robots** | `robots.txt` configurado para indexação completa |
| **Sitemap** | `sitemap.xml` com todas as URLs públicas |
| **Acessibilidade** | `aria-label`, `aria-expanded`, `role`, foco gerenciado |

---

## 🗺️ Roadmap

### ✅ v3.0 — atual

- [x] Biblioteca de cifras com busca em tempo real (`useDeferredValue`)
- [x] Transposição automática de tom
- [x] Piano virtual com atalhos de teclado
- [x] Afinador via microfone (Web Audio API)
- [x] Metrônomo interativo
- [x] Busca de letras com fallback automático (Vagalume → Lyrics.ovh)
- [x] Sistema de envio e aprovação de cifras (multi-backend)
- [x] Notificações por email sem servidor (EmailJS)
- [x] Dark Mode com persistência e anti-FOUC
- [x] CORS Proxy próprio (Vercel Serverless)
- [x] SEO: Open Graph, Twitter Cards, Schema.org

### 🔜 v4.0 — planejado

- [ ] Autenticação de usuários (Supabase Auth)
- [ ] Cifras favoritas salvas por usuário
- [ ] Metrônomo integrado dentro da página da cifra
- [ ] Modo apresentação (tela cheia, scroll automático)
- [ ] PWA — instalável como app no celular
- [ ] Blog com artigos de SEO (cifras por artista/gênero)
- [ ] Integração com Spotify para sugestão de cifras

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas!

### Enviar uma cifra

Use a plataforma em [`/#/upload`](https://tocando-pra-valer3-0.vercel.app/#/upload). Após revisão, sua cifra ficará disponível para todos.

### Contribuir com código

1. Faça um fork
2. Crie uma branch descritiva:
   ```bash
   git checkout -b feat/minha-feature
   git checkout -b fix/descricao-do-bug
   ```
3. Siga [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m "feat: adiciona modal de transposição inline"
   git commit -m "fix: corrige loop no afinador em Safari"
   ```
4. Abra um Pull Request descrevendo o problema resolvido

---

## 📄 Licença

Distribuído sob a **Licença MIT**. Consulte [`LICENSE`](LICENSE) para mais detalhes.

```
MIT License — Copyright (c) 2026 Diego Batista Gomes Moraes
```

---

## 📬 Contato

**Diego Batista Gomes Moraes** — Desenvolvedor Web Front-end & Full Stack

<div align="center">

  [![Portfólio](https://img.shields.io/badge/🌐_Portfólio-diegodev.dev.br-0172AA?style=flat-square)](https://diegodev.dev.br)
  [![GitHub](https://img.shields.io/badge/GitHub-Dieguin77-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Dieguin77)
  [![Email](https://img.shields.io/badge/Email-diegobatistt@gmail.com-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:diegobatistt@gmail.com)

  <br />

  [![Instagram](https://img.shields.io/badge/Instagram-@tocandopravaler-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://instagram.com/tocandopravaler)
  [![YouTube](https://img.shields.io/badge/YouTube-@TocandoPraValer-FF0000?style=flat-square&logo=youtube&logoColor=white)](https://youtube.com/@TocandoPraValer)
  [![WhatsApp](https://img.shields.io/badge/WhatsApp-Contato-25D366?style=flat-square&logo=whatsapp&logoColor=white)](https://wa.me/55999941669)

</div>

---

<div align="center">

  **Achou o projeto útil? [Deixe uma ⭐ estrela!](https://github.com/Dieguin77/tocando-pra-valer)**

  Feito com ❤️ e muito ☕ por [Diego Batista](https://diegodev.dev.br)

  *"A música é a taquigrafia da emoção." — Leon Tolstói*

</div>
