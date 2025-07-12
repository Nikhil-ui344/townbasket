import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/AdsSlider.css';

interface Ad {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  backgroundColor: string;
}

const AdsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const ads: Ad[] = [
    {
      id: '1',
      title: '🍕 Food Delivery',
      subtitle: 'Order Now & Get 30% Off',
      description: 'Delicious food from your favorite restaurants delivered to your doorstep in 30 minutes',
      image: '🍕',
      buttonText: 'Order Food',
      backgroundColor: 'linear-gradient(135deg, #E23744 0%, #FF5A66 100%)'
    },
    {
      id: '2',
      title: '🛒 Grocery Delivery',
      subtitle: 'Fresh Groceries in 15 mins',
      description: 'Get fresh vegetables, fruits, and daily essentials delivered super fast',
      image: '🛒',
      buttonText: 'Shop Groceries',
      backgroundColor: 'linear-gradient(135deg, #00BA51 0%, #06D856 100%)'
    },
    {
      id: '3',
      title: '🏪 Partner Stores',
      subtitle: 'Thousands of Restaurants',
      description: 'Discover amazing restaurants and shops near you with exclusive deals',
      image: '🏪',
      buttonText: 'Explore Stores',
      backgroundColor: 'linear-gradient(135deg, #FFB300 0%, #FFC933 100%)'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ads.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [ads.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ads.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
  };

  return (
    <div className="ads-slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="slide"
          style={{ background: ads[currentSlide].backgroundColor }}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="slide-content">
            <div className="slide-text">
              <motion.div
                className="slide-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {ads[currentSlide].image}
              </motion.div>
              <motion.h2
                className="slide-title"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {ads[currentSlide].title}
              </motion.h2>
              <motion.h3
                className="slide-subtitle"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {ads[currentSlide].subtitle}
              </motion.h3>
              <motion.p
                className="slide-description"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {ads[currentSlide].description}
              </motion.p>
              <motion.button
                className="slide-button"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ads[currentSlide].buttonText}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button className="nav-button prev" onClick={prevSlide}>
        ‹
      </button>
      <button className="nav-button next" onClick={nextSlide}>
        ›
      </button>

      {/* Slide Indicators */}
      <div className="slide-indicators">
        {ads.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdsSlider;
