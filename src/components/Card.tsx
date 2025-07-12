import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Card.css';

// Base Card Component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'dark';
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true 
}) => {
  const cardClass = `card ${variant !== 'default' ? `card-${variant}` : ''} ${className}`;
  
  return (
    <motion.div
      className={cardClass}
      whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

// Food Card Component
interface FoodCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  className?: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  id,
  title,
  description,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  isFavorite = false,
  onFavoriteToggle,
  onAddToCart,
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    onAddToCart?.(id);
    setIsLoading(false);
  };

  const handleFavoriteToggle = () => {
    onFavoriteToggle?.(id);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="rating-star">⭐</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="rating-star">⭐</span>
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="rating-star empty">☆</span>
      );
    }
    
    return stars;
  };

  return (
    <motion.div
      className={`food-card ${className}`}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Image Section */}
      <div className="food-card-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            fontSize: '3rem'
          }}>
            🍽️
          </div>
        )}
        
        {badge && (
          <motion.div 
            className="food-card-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {badge}
          </motion.div>
        )}
        
        <motion.button
          className={`food-card-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteToggle}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </motion.button>
      </div>

      {/* Content Section */}
      <div className="food-card-content">
        <h3 className="food-card-title">{title}</h3>
        <p className="food-card-description">{description}</p>
        
        {/* Rating */}
        <div className="food-card-rating">
          <div className="rating-stars">
            {renderStars(rating)}
          </div>
          <span className="rating-text">
            {rating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Footer */}
        <div className="food-card-footer">
          <div className="food-card-price">
            <span className="price-current">${price.toFixed(2)}</span>
            {originalPrice && originalPrice > price && (
              <span className="price-original">${originalPrice.toFixed(2)}</span>
            )}
          </div>
          
          <motion.button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <>
                <span>⏳</span>
                Adding...
              </>
            ) : (
              <>
                <span>🛒</span>
                Add to Cart
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Service Card Component
interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return (
    <motion.div
      className={`card service-card ${className}`}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <motion.div 
        className="service-card-icon"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
    </motion.div>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  text: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  authorName,
  authorRole,
  authorAvatar,
  className = ''
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <motion.div
      className={`card testimonial-card ${className}`}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="testimonial-text">{text}</p>
      <div className="testimonial-author">
        <div className="author-avatar">
          {authorAvatar ? (
            <img src={authorAvatar} alt={authorName} />
          ) : (
            getInitials(authorName)
          )}
        </div>
        <div className="author-info">
          <div className="author-name">{authorName}</div>
          <div className="author-role">{authorRole}</div>
        </div>
      </div>
    </motion.div>
  );
};

// Loading Card Component
export const LoadingCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`card card-loading ${className}`}>
      <div style={{ height: '200px', background: 'var(--gray-200)', marginBottom: '1rem' }}></div>
      <div style={{ height: '1.5rem', background: 'var(--gray-200)', marginBottom: '0.5rem', borderRadius: '4px' }}></div>
      <div style={{ height: '1rem', background: 'var(--gray-200)', marginBottom: '0.5rem', borderRadius: '4px', width: '80%' }}></div>
      <div style={{ height: '1rem', background: 'var(--gray-200)', borderRadius: '4px', width: '60%' }}></div>
    </div>
  );
};

export default Card;
