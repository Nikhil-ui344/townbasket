import React, { useState, useEffect } from 'react';
import '../styles/DownloadModal.css';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

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
      setIsInstallable(true);
      // Auto-show install banner after a short delay
      setTimeout(() => setShowInstallBanner(true), 2000);
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallBanner(false);
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

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsInstallable(false);
        onClose();
      }
    }
  };

  const handleAutoInstall = () => {
    // For browsers that support it, try to trigger install directly
    if (deferredPrompt) {
      handleInstallPWA();
    } else {
      // For other browsers, show simple instructions
      alert('To install: Look for "Install" or "Add to Home Screen" option in your browser menu');
    }
  };

  const addToHomeScreen = () => {
    // For iOS Safari and other browsers without install prompt
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
      // iOS Safari specific instructions
      alert('To install on iOS:\n1. Tap the Share button (⬆️)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add"');
    } else {
      // General instructions for other browsers
      handleAutoInstall();
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
            <p>Get the best food delivery experience directly on your device!</p>
          </div>

          {isInstalled ? (
            <div className="pwa-installed">
              <div className="success-icon">✅</div>
              <h3>App Already Installed!</h3>
              <p>Town Basket is already installed on your device. You can find it on your home screen or app launcher.</p>
            </div>
          ) : (
            <>
              <div className="download-benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">🚀</span>
                  <span>Works offline</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔔</span>
                  <span>Push notifications</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">�</span>
                  <span>Faster loading</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">�</span>
                  <span>Native app feel</span>
                </div>
              </div>

              {isInstallable && deferredPrompt ? (
                <div className="pwa-install-section">
                  <button className="pwa-install-btn primary" onClick={handleInstallPWA}>
                    <div className="install-btn-content">
                      <span className="install-icon">�</span>
                      <div className="install-text">
                        <span className="install-label">Install Now</span>
                        <span className="install-subtitle">Add to your device</span>
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="manual-install-section">
                  <h3>
                    <span className="browser-icon">{deviceInstructions.icon}</span>
                    Install on {deviceInstructions.browser}
                  </h3>
                  <div className="install-steps">
                    {deviceInstructions.steps.map((step, index) => (
                      <div key={index} className="install-step">
                        <span className="step-number">{index + 1}</span>
                        <span className="step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="download-modal-footer">
            <p>💡 Works on all devices with modern browsers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
