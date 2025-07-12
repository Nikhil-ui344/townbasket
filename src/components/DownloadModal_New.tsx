import React, { useState, useEffect } from 'react';
import '../styles/DownloadModal.css';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if PWA is already installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches || 
          (window.navigator as any).standalone === true) {
        setIsInstalled(true);
      }
    };

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    checkIfInstalled();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallNow = async () => {
    if (deferredPrompt) {
      // Use browser's native install prompt
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        onClose();
      }
    } else {
      // For browsers without install prompt, show simple alert
      const userAgent = navigator.userAgent.toLowerCase();
      if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
        alert('To install on iOS:\n\n1. Tap the Share button (⬆️) at the bottom\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" to install');
      } else {
        alert('To install:\n\n1. Look for "Install" option in your browser menu\n2. Or find "Add to Home Screen" option\n3. Follow the prompts to install');
      }
    }
  };

  const handleAddToHomeScreen = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
      // iOS Safari
      alert('📱 For iPhone/iPad:\n\n1. Tap Share button (⬆️)\n2. Tap "Add to Home Screen"\n3. Tap "Add"');
    } else if (userAgent.includes('android')) {
      // Android browsers
      alert('📱 For Android:\n\n1. Tap browser menu (⋮)\n2. Tap "Add to Home screen"\n3. Tap "Add"');
    } else {
      // Desktop browsers
      alert('💻 For Desktop:\n\n1. Look for install icon in address bar\n2. Or check browser menu for "Install" option\n3. Click to install');
    }
  };

  return (
    <div className="download-modal-overlay" onClick={onClose}>
      <div className="download-modal" onClick={(e) => e.stopPropagation()}>
        <button className="download-modal-close" onClick={onClose}>
          ×
        </button>
        
        <div className="download-modal-content">
          <div className="download-modal-header">
            <div className="download-app-icon">📱</div>
            <h2>Install Town Basket App</h2>
            <p>Get instant access with one-click installation!</p>
          </div>

          {isInstalled ? (
            <div className="pwa-installed">
              <div className="success-icon">✅</div>
              <h3>App Already Installed!</h3>
              <p>Town Basket is already installed on your device. You can find it on your home screen.</p>
            </div>
          ) : (
            <>
              <div className="download-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">⚡</span>
                  <span>Instant loading</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔔</span>
                  <span>Order notifications</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📱</span>
                  <span>Home screen access</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🌐</span>
                  <span>Works everywhere</span>
                </div>
              </div>

              <div className="install-buttons">
                {/* Primary install button */}
                <button className="pwa-install-btn primary" onClick={handleInstallNow}>
                  <div className="install-btn-content">
                    <span className="install-icon">📲</span>
                    <div className="install-text">
                      <span className="install-label">Install Now</span>
                      <span className="install-subtitle">One-click installation</span>
                    </div>
                  </div>
                </button>

                {/* Alternative install button */}
                <button className="pwa-install-btn secondary" onClick={handleAddToHomeScreen}>
                  <div className="install-btn-content">
                    <span className="install-icon">⬇️</span>
                    <div className="install-text">
                      <span className="install-label">Add to Home Screen</span>
                      <span className="install-subtitle">Manual installation</span>
                    </div>
                  </div>
                </button>
              </div>

              <div className="auto-install-info">
                <div className="info-item">
                  <span className="info-icon">💡</span>
                  <span>No app store required - installs directly from this website!</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">🚀</span>
                  <span>Works on iPhone, Android, and Desktop</span>
                </div>
              </div>
            </>
          )}

          <div className="download-modal-footer">
            <p>🎉 Join thousands who installed our app for faster food delivery!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
