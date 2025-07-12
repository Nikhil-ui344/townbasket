import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useView } from '../context/ViewContext';
import LoginModal from './LoginModal';
import DownloadModal from './DownloadModal';
import '../styles/Navigation.css';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const { user, logout } = useAuth();
  const { setCurrentView } = useView();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(user ? 'home' : 'home');
  const [cartCount] = useState(3);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = user ? [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
    { id: 'orders', label: 'Orders', href: '#orders' },
    { id: 'support', label: 'Support', href: '#support' },
    { id: 'download', label: 'Download App', href: '#download' },
  ] : [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'support', label: 'Support', href: '#support' },
    { id: 'download', label: 'Download App', href: '#download' },
  ];

  const handleNavClick = (id: string) => {
    setActiveLink(id);
    setIsMobileMenuOpen(false);
    
    if (id === 'dashboard' && user) {
      setCurrentView('dashboard');
    } else if (id === 'download') {
      // Open download modal
      setIsDownloadModalOpen(true);
    } else if (id === 'home') {
      setCurrentView('home');
    } else {
      setCurrentView('home');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${className}`}>
        <div className="navbar-container">
          {/* Logo */}
          <a href="#home" className="navbar-logo" onClick={() => setCurrentView('home')}>
            <div className="logo-icon"></div>
            <span>Town Basket</span>
          </a>

          {/* Desktop Navigation */}
          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={item.href}
                  className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <button className="cart-button" onClick={() => console.log('Cart clicked')}>
              <span className="cart-icon">🛒</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            {user ? (
              <div className="user-menu">
                <div className="user-avatar">
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">Hi, {user.name.split(' ')[0]}</span>
                </div>
                <button className="btn btn-outline" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-actions">
                <button className="btn btn-outline" onClick={() => setIsLoginModalOpen(true)}>
                  Login
                </button>
                <button className="btn btn-primary" onClick={() => console.log('Order clicked')}>
                  Order Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Actions - Always visible */}
          <div className="mobile-navbar-actions">
            {user ? (
              <div className="mobile-user-menu">
                <div className="mobile-avatar-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <button className="btn btn-outline btn-xs" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="btn btn-outline btn-xs" onClick={() => setIsLoginModalOpen(true)}>
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map((item) => (
                <li key={item.id} className="mobile-nav-item">
                  <a
                    href={item.href}
                    className={`mobile-nav-link ${activeLink === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      {/* Download Modal */}
      <DownloadModal 
        isOpen={isDownloadModalOpen} 
        onClose={() => setIsDownloadModalOpen(false)} 
      />
    </>
  );
};

export default Navigation;
