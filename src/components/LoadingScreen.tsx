import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/LoadingScreen.css';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
  showProgress?: boolean;
  minDuration?: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isLoading, 
  onComplete, 
  showProgress = true,
  minDuration = 2000 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: number;

    // Smooth progress animation
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          // More realistic loading progression
          const increment = prev < 50 ? Math.random() * 8 + 2 : Math.random() * 4 + 1;
          return Math.min(prev + increment, 100);
        });
      }, 150);
    }

    // Complete loading after minimum duration
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        onComplete?.();
      }, 300);
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [isLoading, showProgress, minDuration, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Subtle Background Pattern */}
          <div className="loading-background">
            <div className="gradient-mesh"></div>
          </div>

          {/* Main Content */}
          <div className="loading-content">
            {/* Logo */}
            <motion.div
              className="loading-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <div className="logo-container">
                <motion.div
                  className="logo-icon"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  🏪
                </motion.div>
                <h1 className="logo-text">Town Basket</h1>
                <p className="logo-subtitle">Premium Food Delivery</p>
              </div>
            </motion.div>

            {/* Modern Loading Animation */}
            <motion.div
              className="loading-animation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Elegant Spinner */}
              <div className="spinner-container">
                <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="spinner-inner"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              {/* Progress Bar */}
              {showProgress && (
                <motion.div
                  className="progress-container"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  <div className="progress-track">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                  <motion.span
                    className="progress-text"
                    key={Math.floor(progress / 5)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Math.floor(progress)}%
                  </motion.span>
                </motion.div>
              )}

              {/* Loading Status */}
              <motion.div
                className="loading-status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="status-dots">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="status-dot"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
                <p className="status-text">Preparing your experience</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
