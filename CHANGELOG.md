# Changelog

Todas as mudanças notáveis deste projeto são documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/)
e o projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

---

## [3.0.0] — 2026-06-26

### Adicionado
- Piano virtual com 2 oitavas completas e suporte a atalhos de teclado
- Afinador em tempo real via microfone (Web Audio API)
- Metrônomo interativo com controle de BPM e marcação visual/sonora
- Busca global de letras integrada às APIs Vagalume e Lyrics.ovh
- CORS Proxy próprio via Vercel Serverless Function (`/api/proxy.js`)
- Sistema de contribuição de cifras com 4 backends (Supabase, Google Sheets, Formspree, localStorage)
- Detecção automática de backend por variáveis de ambiente
- Fluxo completo de emails automáticos via EmailJS
  - Confirmação ao colaborador
  - Notificação ao administrador
  - Email de aprovação ou rejeição
- Dashboard administrativo para revisão e aprovação de cifras
- Dark Mode com persistência em localStorage e detecção de preferência do SO
- Script anti-FOUC no `<head>` para aplicar tema antes do React montar
- Code splitting com `React.lazy` + `Suspense` (cada rota = chunk separado)
- SEO completo: Open Graph, Twitter Cards, Schema.org JSON-LD
- `robots.txt` e `sitemap.xml`
- Hook customizado `useClickOutside` para lógica de dropdown reutilizável
- README profissional com badges, arquitetura, instruções e links

### Melhorado
- Busca em tempo real com `useDeferredValue` (React 18 nativo, sem lodash)
- Acessibilidade: `aria-label`, `aria-expanded`, `role`, `alt` text
- PageLoader com spinner animado
- Página 404 com mensagem temática e link de retorno
- Empty state da listagem de cifras com ícone e botão para limpar busca
- Loading state da letra com spinner animado
- Botão de menu mobile com ícone hamburger/X e atributos ARIA
- Canonical URL corrigida para o domínio de produção real
- Footer com classes CSS corretas (corrige bug de classe inválida)
- Stats bar com valores honestos e verificáveis
- CTA da hero com texto mais específico

### Corrigido
- `className="none"` no footer que tornava a seção invisible
- Classes de cor inválidas no Tailwind (`text-black-400`, `border-black-1000`)
- URL canônica apontando para domínio incorreto
- Domínio incorreto em `robots.txt` e `sitemap.xml`

---

## [2.0.0] — 2025

### Adicionado
- Biblioteca de cifras com busca em tempo real
- Diagramas de acordes automáticos (banco com 40+ acordes)
- Transposição de tom com um clique
- Sistema de upload de cifras pela comunidade
- Revisão e aprovação de cifras pelo administrador
- Integração com Vagalume API para busca de letras

### Melhorado
- Redesign completo da interface
- Responsividade mobile-first

---

## [1.0.0] — 2024

### Adicionado
- Lançamento inicial da plataforma
- Página de cifras básica
- Design inicial com identidade visual do projeto
