import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdsSlider from './AdsSlider';
import '../styles/Hero.css';

interface HeroProps {
  className?: string;
  videoSrc?: string;
  videoPoster?: string;
  enableVideo?: boolean;
}

const Hero: React.FC<HeroProps> = ({ 
  className = '', 
  videoSrc, 
  videoPoster, 
  enableVideo = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const handleVideoLoad = () => {
    // Video loaded successfully
    console.log('Video loaded');
  };

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '1000+', label: 'Dishes Delivered' },
    { number: '30min', label: 'Average Delivery' },
    { number: '4.9★', label: 'Customer Rating' },
  ];

  return (
    <section className={`hero ${enableVideo ? 'hero-with-video' : ''} ${className}`} id="home">
      {/* Hero Top Section with Video Background */}
      <div className={`hero-top-section ${enableVideo ? 'with-video' : ''}`}>
        {/* Video Background - Only for top section */}
        {enableVideo && videoSrc && (
          <div className="hero-video-container">
            <video
              className="hero-video"
              autoPlay
              muted
              loop
              playsInline
              poster={videoPoster}
              onLoadedData={handleVideoLoad}
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="hero-video-overlay"></div>
          </div>
        )}

        {/* Floating Elements */}
      <motion.div
        className="hero-floating-element floating-pizza"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        🍕
      </motion.div>
      <motion.div
        className="hero-floating-element floating-burger"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        🍔
      </motion.div>
      <motion.div
        className="hero-floating-element floating-delivery"
        animate={{
          y: [-10, 10, -10],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      >
        🚚
      </motion.div>
      <motion.div
        className="hero-floating-element floating-star"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ⭐
      </motion.div>

      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {/* Badge */}
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="hero-badge-icon"></div>
            <span>Now delivering in your area</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Delicious Food
            <br />
            <span className="hero-title-gradient">Delivered Fast</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Experience the finest cuisines from your favorite restaurants, 
            delivered fresh and hot to your doorstep in just 30 minutes.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
          </motion.div>
        </motion.div>
      </div>
      </div>

      {/* Bottom Section - No Video Background */}
      <div className="hero-bottom-section">
        <div className="hero-container">
          {/* Search Bar */}
          <motion.div 
            className="hero-search"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <form onSubmit={handleSearch} className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search for restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <motion.button
                type="submit"
                className="search-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔍
              </motion.button>
            </form>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-item"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              >
                <motion.span
                  className="stat-number"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.6 + index * 0.1 }}
                >
                  {stat.number}
                </motion.span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        
          {/* Ads Slider */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            <AdsSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
