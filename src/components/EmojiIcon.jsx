import { 
  Search, 
  Eye, 
  Download, 
  Music, 
  BookOpen, 
  Printer, 
  Plus, 
  Trash2, 
  Share2,
  Brain,
  Smile,
  Users,
  Zap,
  Heart,
  CheckCircle,
  Camera,
  Play,
  Volume2,
  Settings,
  Guitar,
  Piano,
  Mic,
  Globe,
  Upload,
  Lightbulb,
  Wrench,
  Timer,
  Target,
  Award,
  Star,
  Clock,
  Send,
  MessageCircle,
  Mail,
  Home,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react';
import './EmojiIcon.css';

// Mapa de emojis para ícones Lucide React
const EMOJI_ICON_MAP = {
  // Busca e visualização
  '🔍': Search,
  'search': Search,
  
  // Visualização
  '👁️': Eye,
  'eye': Eye,
  'view': Eye,
  
  // Download
  '⬇️': Download,
  'download': Download,
  
  // Música
  '🎵': Music,
  'music': Music,
  'note': Music,
  
  // Instrumentos
  '🎸': Guitar,
  'guitar': Guitar,
  '🎹': Piano,
  'piano': Piano,
  '🎤': Mic,
  'mic': Mic,
  'microphone': Mic,
  
  // Livro/Documentação
  '📚': BookOpen,
  'book': BookOpen,
  
  // Impressão
  '🖨️': Printer,
  'print': Printer,
  
  // Plus/Adicionar
  '➕': Plus,
  'plus': Plus,
  'add': Plus,
  
  // Deletar/Remover
  '🗑️': Trash2,
  'delete': Trash2,
  'remove': Trash2,
  
  // Compartilhar
  '📤': Upload,
  'share': Share2,
  'upload': Upload,
  
  // Globe/Mundo
  '🌍': Globe,
  '🌎': Globe,
  '🌏': Globe,
  'globe': Globe,
  'world': Globe,
  
  // Ferramentas
  '🛠️': Wrench,
  'tools': Wrench,
  'wrench': Wrench,
  
  // Dicas/Ideias
  '💡': Lightbulb,
  'lightbulb': Lightbulb,
  'tip': Lightbulb,
  'idea': Lightbulb,
  
  // Timer/Metrônomo
  '⏱️': Timer,
  'timer': Timer,
  'metronome': Timer,
  
  // Alvo/Meta
  '🎯': Target,
  'target': Target,
  'goal': Target,
  
  // Prêmio
  '🏆': Award,
  'award': Award,
  'trophy': Award,
  
  // Estrela
  '⭐': Star,
  'star': Star,
  
  // Relógio
  '🕐': Clock,
  'clock': Clock,
  'time': Clock,
  
  // Enviar
  '📨': Send,
  'send': Send,
  
  // Chat/Mensagem
  '💬': MessageCircle,
  'chat': MessageCircle,
  'message': MessageCircle,
  
  // Email
  '📧': Mail,
  'mail': Mail,
  'email': Mail,
  
  // Casa
  '🏠': Home,
  'home': Home,
  
  // Setas
  '⬅️': ArrowLeft,
  'arrow-left': ArrowLeft,
  '➡️': ArrowRight,
  'arrow-right': ArrowRight,
  
  // Menu
  '☰': Menu,
  'menu': Menu,
  
  // Fechar
  '✖️': X,
  'close': X,
  'x': X,
  
  // Cérebro (Poder cerebral)
  '🧠': Brain,
  'brain': Brain,
  
  // Smile (Bem-estar)
  '😌': Smile,
  'smile': Smile,
  
  // Pessoas (Conexão social)
  '🤝': Users,
  'users': Users,
  'people': Users,
  
  // Flash (Energia)
  '⚡': Zap,
  'flash': Zap,
  'energy': Zap,
  
  // Coração (Love)
  '❤️': Heart,
  'heart': Heart,
  
  // Verificado
  '✅': CheckCircle,
  'check': CheckCircle,
  'success': CheckCircle,
  
  // Câmera (Foto)
  '📸': Camera,
  'camera': Camera,
  
  // Play
  '▶️': Play,
  'play': Play,
  
  // Volume (Som)
  '🔊': Volume2,
  'volume': Volume2,
  'sound': Volume2,
  
  // Configurações
  '⚙️': Settings,
  'settings': Settings,
  'config': Settings,
  
  // Alerta
  '⚠️': AlertCircle,
  'alert': AlertCircle,
  'warning': AlertCircle,
  
  // Info
  'ℹ️': Info,
  'info': Info,
  
  // Ajuda
  '❓': HelpCircle,
  'help': HelpCircle,
};

export default function EmojiIcon({ 
  emoji, 
  size = 'md', 
  className = '',
  style = {},
  ...props 
}) {
  // Mapear tamanho para pixels
  const sizeMap = {
    xs: '16px',
    sm: '20px',
    md: '24px',
    lg: '32px',
    xl: '40px',
  };

  const IconComponent = EMOJI_ICON_MAP[emoji?.toLowerCase()];

  if (!IconComponent) {
    console.warn(`Emoji "${emoji}" não mapeado para ícone Lucide React`);
    return null;
  }

  return (
    <IconComponent 
      size={sizeMap[size]} 
      className={`emoji-icon emoji-icon-${size} ${className}`}
      style={style}
      {...props}
    />
  );
}

// Hook para usar ícones com texto
export function IconText({ emoji, text, size = 'md', gap = '8px' }) {
  return (
    <span className="icon-text" style={{ display: 'inline-flex', alignItems: 'center', gap }}>
      <EmojiIcon emoji={emoji} size={size} />
      <span>{text}</span>
    </span>
  );
}

// Componente para botão com ícone
export function IconButton({ emoji, label, onClick, size = 'md', variant = 'primary', ...props }) {
  return (
    <button 
      onClick={onClick}
      className={`icon-button icon-button-${variant}`}
      {...props}
    >
      <EmojiIcon emoji={emoji} size={size} />
      {label && <span>{label}</span>}
    </button>
  );
}

// Exportar mapa para uso externo
export { EMOJI_ICON_MAP };
