import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ShopsHotels.css';

interface Shop {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  category: string;
  discount?: string;
  type: 'restaurant' | 'grocery' | 'pharmacy' | 'store';
}

interface ShopsHotelsProps {
  className?: string;
}

const ShopsHotels: React.FC<ShopsHotelsProps> = ({ className = '' }) => {
  const restaurants: Shop[] = [
    {
      id: '1',
      name: 'Pizza Palace',
      image: '🍕',
      rating: 4.5,
      deliveryTime: '25-30 min',
      category: 'Italian, Fast Food',
      discount: '50% OFF',
      type: 'restaurant'
    },
    {
      id: '2',
      name: 'Burger House',
      image: '🍔',
      rating: 4.3,
      deliveryTime: '20-25 min',
      category: 'American, Burgers',
      discount: '30% OFF',
      type: 'restaurant'
    },
    {
      id: '3',
      name: 'Spice Garden',
      image: '🍛',
      rating: 4.7,
      deliveryTime: '35-40 min',
      category: 'Indian, Biryani',
      discount: '40% OFF',
      type: 'restaurant'
    },
    {
      id: '4',
      name: 'Fresh Mart',
      image: '🛒',
      rating: 4.2,
      deliveryTime: '15-20 min',
      category: 'Groceries, Fresh',
      discount: '20% OFF',
      type: 'grocery'
    }
  ];

  const groceryStores: Shop[] = [
    {
      id: '5',
      name: 'Super Market',
      image: '🏪',
      rating: 4.4,
      deliveryTime: '10-15 min',
      category: 'Groceries, Daily Needs',
      discount: '25% OFF',
      type: 'grocery'
    },
    {
      id: '6',
      name: 'Organic Store',
      image: '🥬',
      rating: 4.6,
      deliveryTime: '20-25 min',
      category: 'Organic, Health',
      discount: '15% OFF',
      type: 'grocery'
    },
    {
      id: '7',
      name: 'MedPlus Pharmacy',
      image: '💊',
      rating: 4.8,
      deliveryTime: '12-18 min',
      category: 'Medicine, Health',
      discount: '10% OFF',
      type: 'pharmacy'
    },
    {
      id: '8',
      name: 'Electronics Hub',
      image: '📱',
      rating: 4.1,
      deliveryTime: '45-60 min',
      category: 'Electronics, Gadgets',
      discount: 'Up to 70% OFF',
      type: 'store'
    }
  ];

  const renderShopCard = (shop: Shop, index: number) => (
    <motion.div
      key={shop.id}
      className="shop-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="shop-image">
        <span className="shop-icon">{shop.image}</span>
        {shop.discount && (
          <span className="shop-discount">{shop.discount}</span>
        )}
      </div>
      <div className="shop-info">
        <h3 className="shop-name">{shop.name}</h3>
        <p className="shop-category">{shop.category}</p>
        <div className="shop-meta">
          <div className="shop-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{shop.rating}</span>
          </div>
          <div className="delivery-time">
            <span className="time-icon">🕒</span>
            <span>{shop.deliveryTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className={`shops-hotels ${className}`}>
      <div className="container">
        {/* Restaurants Section */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Top Restaurants</h2>
          <p className="section-subtitle">Delicious food from your favorite restaurants</p>
        </motion.div>
        
        <div className="shops-grid">
          {restaurants.map((restaurant, index) => renderShopCard(restaurant, index))}
        </div>

        {/* Grocery & More Section */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Grocery & More</h2>
          <p className="section-subtitle">Everything you need, delivered in minutes</p>
        </motion.div>
        
        <div className="shops-grid">
          {groceryStores.map((store, index) => renderShopCard(store, index))}
        </div>
      </div>
    </section>
  );
};

export default ShopsHotels;
