import React from 'react';
import { motion } from 'framer-motion';
import '../styles/AdsBanner.css';

interface AdsBannerProps {
  className?: string;
}

const AdsBanner: React.FC<AdsBannerProps> = ({ className = '' }) => {
  return (
    <section className={`ads-banner ${className}`}>
      <div className="container">
        <motion.div
          className="banner-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="banner-text">
            <motion.h2
              className="banner-title"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              🚀 Lightning Fast Delivery
            </motion.h2>
            <motion.p
              className="banner-description"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Get your food & groceries delivered in under 30 minutes. Free delivery on orders above ₹199!
            </motion.p>
          </div>
          <motion.div
            className="banner-cta"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Order Now
            </motion.button>
            <span className="cta-offer">Use code: FAST30</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdsBanner;
