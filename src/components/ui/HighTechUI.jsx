import React from 'react';
import { Zap, ChevronRight } from 'lucide-react';

// ============================================
// 🃏 GLASS CARD - Card com efeito glassmorphism
// ============================================
export const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  glowColor = 'cyan',
  ...props 
}) => {
  const glowColors = {
    cyan: 'rgba(0, 245, 255, 0.3)',
    purple: 'rgba(191, 0, 255, 0.3)',
    green: 'rgba(0, 255, 136, 0.3)',
    orange: 'rgba(255, 107, 0, 0.3)',
  };

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden ${hover ? 'transition-all duration-300 hover:translate-y-[-4px]' : ''} ${className}`}
      style={{
        background: 'rgba(15, 15, 25, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: glow 
          ? `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px ${glowColors[glowColor]}`
          : '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// ============================================
// 🔘 NEON BUTTON - Botão com borda neon
// ============================================
export const NeonButton = ({ 
  children, 
  color = 'cyan', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const colors = {
    cyan: { border: '#00f5ff', shadow: 'rgba(0, 245, 255, 0.5)', hover: '#00f5ff' },
    purple: { border: '#bf00ff', shadow: 'rgba(191, 0, 255, 0.5)', hover: '#bf00ff' },
    green: { border: '#00ff88', shadow: 'rgba(0, 255, 136, 0.5)', hover: '#00ff88' },
    orange: { border: '#ff6b00', shadow: 'rgba(255, 107, 0, 0.5)', hover: '#ff6b00' },
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const colorConfig = colors[color];

  return (
    <button
      className={`
        relative font-semibold uppercase tracking-wider rounded-full
        bg-transparent cursor-pointer overflow-hidden
        transition-all duration-300 hover:scale-105 active:scale-95
        ${sizes[size]} ${className}
      `}
      style={{
        border: `2px solid ${colorConfig.border}`,
        color: colorConfig.border,
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = `0 0 20px ${colorConfig.shadow}`;
        e.target.style.background = `${colorConfig.hover}20`;
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = 'none';
        e.target.style.background = 'transparent';
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

// ============================================
// 🎨 GRADIENT BUTTON - Botão com gradiente
// ============================================
export const GradientButton = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  ...props 
}) => {
  const variants = {
    primary: 'linear-gradient(135deg, #00f5ff, #bf00ff)',
    warm: 'linear-gradient(135deg, #ff6b00, #ff006e)',
    cool: 'linear-gradient(135deg, #0066ff, #00f5ff)',
    success: 'linear-gradient(135deg, #00ff88, #00f5ff)',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4 text-base',
  };

  return (
    <button
      className={`
        relative font-bold rounded-full text-white
        transition-all duration-300 hover:translate-y-[-2px] hover:scale-[1.02]
        active:scale-95 flex items-center gap-2 justify-center
        ${sizes[size]} ${className}
      `}
      style={{
        background: variants[variant],
        boxShadow: '0 4px 20px rgba(0, 245, 255, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.target.style.boxShadow = '0 8px 30px rgba(0, 245, 255, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.target.style.boxShadow = '0 4px 20px rgba(0, 245, 255, 0.3)';
      }}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

// ============================================
// 🏷️ TECH BADGE - Badge estilo tech
// ============================================
export const TechBadge = ({ 
  children, 
  variant = 'default',
  icon: Icon,
  pulse = false,
  className = '',
}) => {
  const variants = {
    default: { bg: 'rgba(0, 245, 255, 0.1)', border: '#00f5ff', color: '#00f5ff' },
    success: { bg: 'rgba(0, 255, 136, 0.1)', border: '#00ff88', color: '#00ff88' },
    warning: { bg: 'rgba(255, 208, 0, 0.1)', border: '#ffd000', color: '#ffd000' },
    danger: { bg: 'rgba(255, 68, 68, 0.1)', border: '#ff4444', color: '#ff4444' },
    purple: { bg: 'rgba(191, 0, 255, 0.1)', border: '#bf00ff', color: '#bf00ff' },
  };

  const config = variants[variant];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        text-xs font-semibold uppercase tracking-wider
        ${pulse ? 'animate-pulse' : ''} ${className}
      `}
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        color: config.color,
      }}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};

// ============================================
// 📊 TECH DISPLAY - Display estilo LED
// ============================================
export const TechDisplay = ({ 
  value, 
  label,
  unit = '',
  size = 'md',
  color = 'cyan',
  className = '',
}) => {
  const colors = {
    cyan: '#00f5ff',
    green: '#00ff88',
    orange: '#ff6b00',
    purple: '#bf00ff',
  };

  const sizes = {
    sm: { value: 'text-2xl', label: 'text-xs' },
    md: { value: 'text-4xl', label: 'text-sm' },
    lg: { value: 'text-6xl', label: 'text-base' },
  };

  return (
    <div 
      className={`text-center p-4 rounded-xl ${className}`}
      style={{
        background: 'rgba(0, 10, 20, 0.8)',
        border: `1px solid ${colors[color]}40`,
        boxShadow: `inset 0 0 30px ${colors[color]}10`,
      }}
    >
      <div 
        className={`font-mono font-bold ${sizes[size].value}`}
        style={{ 
          color: colors[color],
          textShadow: `0 0 20px ${colors[color]}`,
        }}
      >
        {value}<span className="text-lg opacity-70">{unit}</span>
      </div>
      {label && (
        <div 
          className={`${sizes[size].label} uppercase tracking-wider mt-1`}
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          {label}
        </div>
      )}
    </div>
  );
};

// ============================================
// 🔲 TECH SECTION - Seção com título estilizado
// ============================================
export const TechSection = ({ 
  title, 
  subtitle,
  icon: Icon,
  children,
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {Icon && (
            <div 
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{
                background: 'rgba(0, 245, 255, 0.1)',
                border: '1px solid rgba(0, 245, 255, 0.3)',
              }}
            >
              <Icon size={28} style={{ color: '#00f5ff' }} />
            </div>
          )}
          <h2 
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{
              background: 'linear-gradient(135deg, #ffffff, #00f5ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }} className="text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

// ============================================
// 🎯 FEATURE CARD - Card de funcionalidade
// ============================================
export const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description,
  href,
  className = '',
}) => {
  const Wrapper = href ? 'a' : 'div';
  
  return (
    <Wrapper
      href={href}
      className={`
        block p-6 rounded-2xl transition-all duration-300
        hover:translate-y-[-4px] group cursor-pointer
        ${className}
      `}
      style={{
        background: 'rgba(15, 15, 25, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 245, 255, 0.3)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(191, 0, 255, 0.2))',
          border: '1px solid rgba(0, 245, 255, 0.3)',
        }}
      >
        {Icon && <Icon size={24} style={{ color: '#00f5ff' }} />}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
        {title}
        {href && <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#00f5ff' }} />}
      </h3>
      <p style={{ color: 'rgba(255, 255, 255, 0.6)' }} className="text-sm leading-relaxed">
        {description}
      </p>
    </Wrapper>
  );
};

// ============================================
// 🌊 WAVE LOADER - Loading animado
// ============================================
export const WaveLoader = ({ size = 'md', color = 'cyan' }) => {
  const colors = {
    cyan: '#00f5ff',
    purple: '#bf00ff',
    green: '#00ff88',
  };

  const sizes = {
    sm: { bar: 'w-1 h-4', gap: 'gap-0.5' },
    md: { bar: 'w-1.5 h-8', gap: 'gap-1' },
    lg: { bar: 'w-2 h-12', gap: 'gap-1.5' },
  };

  return (
    <div className={`flex items-center justify-center ${sizes[size].gap}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`${sizes[size].bar} rounded-full`}
          style={{
            background: `linear-gradient(to top, ${colors[color]}, transparent)`,
            animation: 'wave-animation 0.6s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

// ============================================
// ⚡ PULSE DOT - Indicador de status
// ============================================
export const PulseDot = ({ status = 'active', size = 'md' }) => {
  const statuses = {
    active: '#00ff88',
    warning: '#ffd000',
    error: '#ff4444',
    inactive: 'rgba(255, 255, 255, 0.3)',
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <span className="relative inline-flex">
      <span
        className={`${sizes[size]} rounded-full`}
        style={{ background: statuses[status] }}
      />
      {status === 'active' && (
        <span
          className={`absolute ${sizes[size]} rounded-full animate-ping`}
          style={{ background: statuses[status], opacity: 0.4 }}
        />
      )}
    </span>
  );
};

export default {
  GlassCard,
  NeonButton,
  GradientButton,
  TechBadge,
  TechDisplay,
  TechSection,
  FeatureCard,
  WaveLoader,
  PulseDot,
};
