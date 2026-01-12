import { Link } from 'react-router-dom';

export default function Card({ 
  title, 
  description, 
  image, 
  to, 
  badge,
  className = '' 
}) {
  const CardWrapper = to ? Link : 'div';
  const wrapperProps = to ? { to } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className={`block bg-secondary rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:transform hover:-translate-y-2 ${className}`}
    >
      {image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {badge && (
            <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
        )}
      </div>
    </CardWrapper>
  );
}
