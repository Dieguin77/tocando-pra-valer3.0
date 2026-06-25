## 🎨 Recomendações de Uso - EmojiIcon Component

### Padrões de Design Aplicados

Este documento descreve os padrões de uso estabelecidos para o componente EmojiIcon em toda a aplicação.

---

## 📐 Grid de Tamanhos

### Recomendações por Contexto

```
┌─────────────────────────────────────────────────┐
│ CONTEXTO          │ TAMANHO │ PIXELS │ EXEMPLO │
├─────────────────────────────────────────────────┤
│ Badges            │ xs     │ 16px   │ ✓       │
│ Links inline      │ sm     │ 20px   │ Ver → │
│ Botões padrão     │ md     │ 24px   │ Buscar │
│ Headings          │ lg     │ 32px   │ Admin   │
│ Hero sections     │ xl     │ 40px   │ 🎵      │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Casos de Uso Específicos

### SearchMusic Component
```jsx
// Header
<h2>
  <EmojiIcon emoji="search" size="lg" />
  Buscar Música no Genius
</h2>

// Botão
<button className="btn-search">
  <EmojiIcon emoji="search" size="md" />
  Buscar
</button>

// Link resultado
<a href="#">
  <EmojiIcon emoji="eye" size="md" />
  Ver no Genius
</a>
```

### AdminMusic Page
```jsx
// Título
<h1>
  <EmojiIcon emoji="book" size="lg" />
  Admin - Adicionar Músicas
</h1>

// Seção
<h2>
  <EmojiIcon emoji="check" size="lg" />
  Músicas Adicionadas
</h2>

// Botão de ação
<button>
  <EmojiIcon emoji="share" size="md" />
  Exportar JSON
</button>

// Link interno
<a>
  <EmojiIcon emoji="eye" size="sm" />
  Ver no Genius
</a>
```

### Song Page
```jsx
// Botão principal
<button className="btn-action">
  <EmojiIcon emoji="eye" size="md" />
  Ver Para Impressão
</button>

// Botão complementar
<button className="btn-action">
  <EmojiIcon emoji="download" size="md" />
  Baixar Cifra
</button>

// Print toolbar
<button className="btn-print">
  <EmojiIcon emoji="printer" size="md" />
  Imprimir
</button>
```

### Home Page
```jsx
// Benefício com ícone grande
<div className="benefit-card">
  <div className="benefit-icon">
    <EmojiIcon emoji="brain" size="xl" />
  </div>
  <h3>Poder Cerebral</h3>
</div>

// Feature com ícone integrado
<li>
  <strong>
    <EmojiIcon emoji="music" size="md" />
    Transposição Inteligente
  </strong>
  Mude o tom com um clique.
</li>

// Social links (usando React Icons)
<a href="#">
  <FaInstagram /> Instagram
</a>
```

---

## 🎨 Spacing Guidelines

### Gap entre ícone e texto

```css
/* Padrão */
gap: 8px;

/* Maior em headers */
gap: 12px;

/* Menor em badges/links inline */
gap: 6px;
```

### Exemplos Práticos

```jsx
// Espaçamento padrão (8px)
<button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  <EmojiIcon emoji="download" size="md" />
  Baixar
</button>

// Espaçamento maior em header (12px)
<h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
  <EmojiIcon emoji="book" size="lg" />
  Título
</h1>

// Espaçamento menor em link (6px)
<a style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
  <EmojiIcon emoji="eye" size="sm" />
  Ver
</a>
```

---

## 🎨 Variantes de Botão por Contexto

### Primário (Ação Principal)
```jsx
<button className="btn-action btn-primary">
  <EmojiIcon emoji="search" size="md" />
  Buscar Música
</button>
```
**Quando usar**: CTAs principais, ações críticas

### Secundário (Ação Complementar)
```jsx
<button className="btn-action btn-secondary">
  <EmojiIcon emoji="info" size="md" />
  Mais Informações
</button>
```
**Quando usar**: Ações complementares, links com ícone

### Perigo (Ações Destrutivas)
```jsx
<button className="btn-remove">
  <EmojiIcon emoji="delete" size="md" />
  Remover
</button>
```
**Quando usar**: Delete, remove, ações irreversíveis

### Sucesso (Ações Confirmadas)
```jsx
<button className="btn-success">
  <EmojiIcon emoji="check" size="md" />
  Confirmar
</button>
```
**Quando usar**: Confirmações, completado, sucesso

### Ghost (Ação Discreta)
```jsx
<button className="btn-ghost">
  <EmojiIcon emoji="settings" size="md" />
  Configurações
</button>
```
**Quando usar**: Ações secundárias, configurações

---

## 📱 Responsividade

### Mobile-first Approach

```css
/* Em telas pequenas (mobile) */
@media (max-width: 768px) {
  .btn-action {
    gap: 6px;  /* Reduz espaço */
    font-size: 0.9rem;
    padding: 8px 12px;
  }
  
  .emoji-icon-lg {
    width: 28px;  /* Reduz ícone grande */
    height: 28px;
  }
}
```

---

## ✨ Animações Recomendadas

### Hover Effect (Padrão)
```jsx
<button style={{ 
  display: 'flex', 
  alignItems: 'center',
  gap: '8px',
  transition: 'all 0.3s ease'
}}>
  <EmojiIcon emoji="download" size="md" />
  Baixar
</button>

/* CSS */
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

### Loading State (Ícone girando)
```jsx
{loading ? (
  <EmojiIcon emoji="search" size="md" className="spin" />
) : (
  <>
    <EmojiIcon emoji="search" size="md" />
    Buscar
  </>
)}
```

### Destaque (Pulso)
```jsx
<EmojiIcon emoji="heart" size="lg" className="pulse" />
```

---

## 🎯 Consistency Checklist

Ao adicionar novos ícones, verifique:

- [ ] Tamanho apropriado para contexto (xs/sm/md/lg/xl)?
- [ ] Gap correto entre ícone e texto (6px/8px/12px)?
- [ ] Variante de botão correta (primary/secondary/danger/success/ghost)?
- [ ] Alinhamento vertical correto (center)?
- [ ] Responde bem no mobile?
- [ ] Funciona em dark mode?
- [ ] Contraste adequado?
- [ ] Ícone adicionado ao mapa de ícones?

---

## 🚀 Performance Tips

### Evitar Múltiplos Re-renders

```jsx
// ❌ Não faça
<button onClick={handleClick}>
  <EmojiIcon emoji={dynamicEmoji} size="md" />
  Ação
</button>

// ✅ Faça
const [icon, setIcon] = useState('search');

<button onClick={handleClick}>
  <EmojiIcon emoji={icon} size="md" />
  Ação
</button>
```

### Memoização (se necessário)

```jsx
const MemoizedIcon = React.memo(({ emoji, size }) => (
  <EmojiIcon emoji={emoji} size={size} />
));
```

---

## 🎨 Dark Mode Support

Todos os ícones suportam dark mode automaticamente:

```jsx
// No CSS, usar cores herdadas
.emoji-icon {
  color: inherit;
}

// Componentes com dark mode automático
<button style={{ color: 'white' }}>  {/* dark mode */}
  <EmojiIcon emoji="download" />
  Baixar
</button>
```

---

## 📋 Template de Novo Componente com Ícones

```jsx
import EmojiIcon from '../components/EmojiIcon';

export default function NewComponent() {
  return (
    <div className="component-container">
      {/* Header com ícone grande */}
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <EmojiIcon emoji="music" size="lg" />
        Título do Componente
      </h2>
      
      {/* Ações com ícones md */}
      <div className="actions">
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EmojiIcon emoji="search" size="md" />
          Ação 1
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EmojiIcon emoji="download" size="md" />
          Ação 2
        </button>
      </div>
      
      {/* Conteúdo */}
      <div className="content">
        {/* Usar ícones sm para inline text */}
        <p>
          <EmojiIcon emoji="check" size="sm" style={{ marginRight: '6px' }} />
          Informação importante
        </p>
      </div>
    </div>
  );
}
```

---

## 🔧 Troubleshooting

### Ícone não aparece
```
✓ Verifique se o emoji está no mapa EMOJI_ICON_MAP
✓ Use lowercase: 'search' ao invés de 'Search'
✓ Importe EmojiIcon corretamente
```

### Ícone cortado/desalinhado
```
✓ Use size apropriado
✓ Verifique container height
✓ Use align-items: center em flexbox
```

### Cor não muda
```
✓ Ícones herdam color do parent
✓ Use style={{ color: '#fff' }}
✓ Verifique dark mode CSS
```

---

## 📞 Recursos

- **Lucide Icons**: https://lucide.dev/
- **Componente**: `src/components/EmojiIcon.jsx`
- **Guia**: `EMOJI_ICONS_GUIDE.md`
- **Exemplos ao vivo**: Verifique as páginas da aplicação

---

**Bom design com EmojiIcon! 🎨✨**
