import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FoodCard } from './Card';
import '../styles/StorePage.css';

interface StoreData {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  cuisine: string[];
  address: string;
  phone: string;
  isOpen: boolean;
  menu: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  reviewCount: number;
  badge?: string;
}

interface StorePageProps {
  storeId: string;
  onBack: () => void;
}

const StorePage: React.FC<StorePageProps> = ({ storeId, onBack }) => {
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock store data - in real app, this would come from API
  const mockStoreData: { [key: string]: StoreData } = {
    '1': {
      id: '1',
      name: 'Pizza Palace',
      description: 'Authentic Italian pizzas made with fresh ingredients and traditional recipes.',
      image: '/images/pizza-palace.jpg',
      rating: 4.8,
      deliveryTime: '25-35 min',
      deliveryFee: 2.99,
      minOrder: 15,
      cuisine: ['Italian', 'Pizza', 'Pasta'],
      address: '123 Main Street, Downtown',
      phone: '+1 (555) 123-4567',
      isOpen: true,
      menu: [
        {
          id: '1',
          name: 'Margherita Pizza',
          description: 'Fresh mozzarella, tomato sauce, and basil on a crispy thin crust',
          price: 12.99,
          originalPrice: 15.99,
          image: '/images/margherita.jpg',
          category: 'Pizza',
          isVeg: true,
          rating: 4.8,
          reviewCount: 124,
          badge: 'Popular'
        },
        {
          id: '2',
          name: 'Pepperoni Supreme',
          description: 'Classic pepperoni with extra cheese and Italian herbs',
          price: 16.99,
          image: '/images/pepperoni.jpg',
          category: 'Pizza',
          isVeg: false,
          rating: 4.7,
          reviewCount: 98,
          badge: 'Bestseller'
        },
        {
          id: '3',
          name: 'Caesar Salad',
          description: 'Fresh romaine lettuce with Caesar dressing and croutons',
          price: 8.99,
          image: '/images/caesar-salad.jpg',
          category: 'Salads',
          isVeg: true,
          rating: 4.5,
          reviewCount: 45
        }
      ]
    },
    '2': {
      id: '2',
      name: 'Burger Junction',
      description: 'Gourmet burgers made with premium beef and fresh ingredients.',
      image: '/images/burger-junction.jpg',
      rating: 4.6,
      deliveryTime: '20-30 min',
      deliveryFee: 1.99,
      minOrder: 12,
      cuisine: ['American', 'Burgers', 'Fast Food'],
      address: '456 Oak Avenue, Midtown',
      phone: '+1 (555) 987-6543',
      isOpen: true,
      menu: [
        {
          id: '4',
          name: 'Classic Cheeseburger',
          description: 'Beef patty with cheese, lettuce, tomato, and special sauce',
          price: 9.99,
          image: '/images/cheeseburger.jpg',
          category: 'Burgers',
          isVeg: false,
          rating: 4.6,
          reviewCount: 89,
          badge: 'Popular'
        },
        {
          id: '5',
          name: 'Chicken Deluxe',
          description: 'Grilled chicken breast with avocado and bacon',
          price: 12.99,
          image: '/images/chicken-deluxe.jpg',
          category: 'Burgers',
          isVeg: false,
          rating: 4.7,
          reviewCount: 67
        }
      ]
    },
    '3': {
      id: '3',
      name: 'Spice Garden',
      description: 'Authentic Indian cuisine with traditional spices and flavors.',
      image: '/images/spice-garden.jpg',
      rating: 4.9,
      deliveryTime: '30-40 min',
      deliveryFee: 3.99,
      minOrder: 20,
      cuisine: ['Indian', 'Curry', 'Vegetarian'],
      address: '789 Curry Lane, Little India',
      phone: '+1 (555) 456-7890',
      isOpen: true,
      menu: [
        {
          id: '6',
          name: 'Chicken Biryani',
          description: 'Aromatic basmati rice with tender chicken and traditional spices',
          price: 15.99,
          image: '/images/chicken-biryani.jpg',
          category: 'Main Course',
          isVeg: false,
          rating: 4.9,
          reviewCount: 156,
          badge: 'Bestseller'
        },
        {
          id: '7',
          name: 'Paneer Tikka',
          description: 'Grilled cottage cheese with bell peppers and onions',
          price: 13.99,
          image: '/images/paneer-tikka.jpg',
          category: 'Appetizers',
          isVeg: true,
          rating: 4.8,
          reviewCount: 92
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      const store = mockStoreData[storeId];
      setStoreData(store || null);
      setIsLoading(false);
    }, 800);
  }, [storeId]);

  if (isLoading) {
    return (
      <div className="store-loading">
        <div className="loading-spinner"></div>
        <p>Loading store...</p>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="store-not-found">
        <h2>Store not found</h2>
        <button onClick={onBack} className="btn btn-primary">Go Back</button>
      </div>
    );
  }

  const categories = ['all', ...Array.from(new Set(storeData.menu.map(item => item.category)))];
  const filteredMenu = selectedCategory === 'all' 
    ? storeData.menu 
    : storeData.menu.filter(item => item.category === selectedCategory);

  return (
    <div className="store-page">
      {/* Header */}
      <div className="store-header">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        
        <div className="store-hero">
          <div className="store-hero-content">
            <div className="store-info">
              <motion.h1 
                className="store-name"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {storeData.name}
              </motion.h1>
              
              <motion.p 
                className="store-description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {storeData.description}
              </motion.p>
              
              <motion.div 
                className="store-details"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="detail-item">
                  <span className="detail-icon">⭐</span>
                  <span>{storeData.rating}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">⏱️</span>
                  <span>{storeData.deliveryTime}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">🚚</span>
                  <span>${storeData.deliveryFee} delivery</span>
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💰</span>
                  <span>${storeData.minOrder} min order</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="cuisine-tags"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {storeData.cuisine.map((cuisine, index) => (
                  <span key={index} className="cuisine-tag">{cuisine}</span>
                ))}
              </motion.div>
            </div>
            
            <div className="store-status">
              <span className={`status-badge ${storeData.isOpen ? 'open' : 'closed'}`}>
                {storeData.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="store-content">
        <div className="container">
          {/* Category Filter */}
          <motion.div 
            className="category-filter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </motion.div>

          {/* Menu Items */}
          <motion.div 
            className="menu-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {filteredMenu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              >
                <FoodCard
                  id={item.id}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  originalPrice={item.originalPrice}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  badge={item.badge}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Store Contact Info */}
          <motion.div 
            className="store-contact"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3>Contact Information</h3>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>{storeData.address}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>{storeData.phone}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
