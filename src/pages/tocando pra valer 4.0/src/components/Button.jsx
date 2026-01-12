import { Link } from 'react-router-dom';

export default function Button({ 
  children, 
  to, 
  href, 
  variant = 'primary', 
  size = 'md',
  className = '',
  onClick,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 transform hover:scale-105';
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-red-600 shadow-lg hover:shadow-accent/50',
    secondary: 'bg-gold text-primary hover:bg-yellow-400 shadow-lg hover:shadow-gold/50',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-primary',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
