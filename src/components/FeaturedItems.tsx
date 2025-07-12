import React from 'react';
import { motion } from 'framer-motion';
import '../styles/FeaturedItems.css';

interface FeaturedItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  discount?: string;
}

interface FeaturedItemsProps {
  className?: string;
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({ className = '' }) => {
  const featuredItems: FeaturedItem[] = [
    {
      id: '1',
      title: 'Pizza',
      icon: '🍕',
      description: 'Hot & Fresh',
      discount: '30% OFF'
    },
    {
      id: '2',
      title: 'Burgers',
      icon: '🍔',
      description: 'Juicy & Delicious',
      discount: '25% OFF'
    },
    {
      id: '3',
      title: 'Biryani',
      icon: '🍛',
      description: 'Authentic Taste',
      discount: '20% OFF'
    },
    {
      id: '4',
      title: 'Chinese',
      icon: '🥡',
      description: 'Spicy & Tasty',
      discount: '15% OFF'
    },
    {
      id: '5',
      title: 'Desserts',
      icon: '🍰',
      description: 'Sweet Treats',
      discount: '10% OFF'
    },
    {
      id: '6',
      title: 'Beverages',
      icon: '🥤',
      description: 'Refreshing Drinks',
      discount: 'Buy 1 Get 1'
    }
  ];

  return (
    <section className={`featured-items ${className}`}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What's on your mind?
        </motion.h2>
        
        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="featured-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="item-icon">
                {item.icon}
              </div>
              <h3 className="item-title">{item.title}</h3>
              <p className="item-description">{item.description}</p>
              {item.discount && (
                <span className="item-discount">{item.discount}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedItems;
