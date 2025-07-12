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
  const [loadingText, setLoadingText] = useState('Loading');

  const loadingMessages = [
    'Preparing your experience...',
    'Fetching fresh ingredients...',
    'Connecting to restaurants...',
    'Almost ready to serve...',
    'Welcome to Town Basket!'
  ];

  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: number;
    let textInterval: number;
    let messageIndex = 0;

    // Progress animation
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.random() * 15 + 5;
        });
      }, 200);
    }

    // Text animation
    textInterval = setInterval(() => {
      setLoadingText(loadingMessages[messageIndex]);
      messageIndex = (messageIndex + 1) % loadingMessages.length;
    }, 500);

    // Complete loading after minimum duration
    const completeTimer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
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
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated Background */}
          <div className="loading-background">
            <motion.div
              className="gradient-orb orb-1"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.6, 0.8, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="gradient-orb orb-2"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="gradient-orb orb-3"
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Main Content */}
          <div className="loading-content">
            {/* Logo Animation */}
            <motion.div
              className="loading-logo"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 1,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
              }}
            >
              <motion.div
                className="logo-icon"
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🏪
              </motion.div>
              <motion.h1
                className="logo-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Town Basket
              </motion.h1>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              className="loading-animation"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {/* Pulsing Dots */}
              <div className="loading-dots">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="loading-dot"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  />
                ))}
              </div>

              {/* Spinning Ring */}
              <motion.div
                className="loading-ring"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Progress Bar */}
            {showProgress && (
              <motion.div
                className="progress-container"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "300px" }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
                <motion.div
                  className="progress-text"
                  key={Math.floor(progress / 10)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.floor(progress)}%
                </motion.div>
              </motion.div>
            )}

            {/* Loading Text */}
            <motion.div
              className="loading-text-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={loadingText}
                  className="loading-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  {loadingText}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Floating Food Icons */}
            <div className="floating-icons">
              {['🍕', '🍔', '🌮', '🍜', '🍰', '🥗'].map((icon, index) => (
                <motion.div
                  key={index}
                  className={`floating-icon icon-${index}`}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    rotate: [-5, 5, -5],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
