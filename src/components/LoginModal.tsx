import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedDemo, setSelectedDemo] = useState('');
  const { login, isLoading } = useAuth();

  const demoAccounts = [
    { email: 'customer@demo.com', role: 'Customer', icon: '👤' },
    { email: 'admin@demo.com', role: 'Admin', icon: '👨‍💼' },
    { email: 'vendor@demo.com', role: 'Vendor', icon: '🏪' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    if (success) {
      onClose();
      setEmail('');
      setPassword('');
      setError('');
    } else {
      setError('Invalid credentials. Use demo accounts or password: demo123');
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    setSelectedDemo(demoEmail);
  };

  const handleClose = () => {
    onClose();
    setEmail('');
    setPassword('');
    setError('');
    setSelectedDemo('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="login-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="login-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="login-header">
              <h2 className="login-title">Welcome Back!</h2>
              <p className="login-subtitle">Sign in to your Town Basket account</p>
              <motion.button
                className="login-close"
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            <div className="login-content">
              {/* Demo Accounts */}
              <div className="demo-accounts">
                <p className="demo-title">Try Demo Accounts:</p>
                <div className="demo-grid">
                  {demoAccounts.map((demo) => (
                    <motion.button
                      key={demo.email}
                      className={`demo-account ${selectedDemo === demo.email ? 'selected' : ''}`}
                      onClick={() => handleDemoLogin(demo.email)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="demo-icon">{demo.icon}</span>
                      <span className="demo-role">{demo.role}</span>
                      <span className="demo-email">{demo.email}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="login-divider">
                <span>or sign in manually</span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <motion.div
                    className="login-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="login-submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </form>

              <div className="login-footer">
                <p className="login-help">
                  Demo password: <strong>demo123</strong>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
