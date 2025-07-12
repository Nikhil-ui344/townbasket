import { useAuth } from './context/AuthContext';
import { useView } from './context/ViewContext';
import { LoadingProvider, useLoading } from './contexts/LoadingContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero_New';
import LoadingScreen from './components/LoadingScreen';
import AdsBanner from './components/AdsBanner';
import FeaturedItems from './components/FeaturedItems';
import { FoodCard } from './components/Card';
import ShopsHotels from './components/ShopsHotels';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';
import VendorDashboard from './components/VendorDashboard';
import './styles/globals.css';
import './styles/Layout.css';

function AppContent() {
  const { user } = useAuth();
  const { currentView } = useView();
  const { isLoading, setIsLoading } = useLoading();

  // Handle initial loading completion
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Admin and vendor users are automatically shown their dashboards
  if (user && user.role !== 'customer') {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <LoadingScreen 
              isLoading={isLoading} 
              onComplete={handleLoadingComplete}
              minDuration={1500}
            />
            {!isLoading && (
              <>
                <Navigation />
                <AdminDashboard />
              </>
            )}
          </>
        );
      case 'vendor':
        return (
          <>
            <LoadingScreen 
              isLoading={isLoading} 
              onComplete={handleLoadingComplete}
              minDuration={1500}
            />
            {!isLoading && (
              <>
                <Navigation />
                <VendorDashboard />
              </>
            )}
          </>
        );
      default:
        break;
    }
  }

  // Customer users see dashboard if requested, otherwise homepage
  if (user && user.role === 'customer' && currentView === 'dashboard') {
    return (
      <>
        <LoadingScreen 
          isLoading={isLoading} 
          onComplete={handleLoadingComplete}
          minDuration={1200}
        />
        {!isLoading && (
          <>
            <Navigation />
            <CustomerDashboard />
          </>
        )}
      </>
    );
  }

  // Default landing page for non-authenticated users and customers
  return (
    <>
      <LoadingScreen 
        isLoading={isLoading} 
        onComplete={handleLoadingComplete}
        minDuration={2500}
      />
      {!isLoading && (
        <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
          <Navigation />
          {/* Hero Section with Video Background */}
          <Hero 
            enableVideo={true}
            videoSrc="/videos/hero.mp4"
            videoPoster="/images/hero-poster.jpg"
          /> 
          
          <AdsBanner />
          <FeaturedItems />
          
          {/* Featured Dishes Section */}
          <section style={{ padding: '60px 20px', background: 'var(--white)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h2 style={{ 
                textAlign: 'center', 
                marginBottom: '40px', 
                color: 'var(--black)', 
                fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                fontWeight: '700',
                position: 'relative'
              }}>
                Popular Dishes
              </h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px',
                marginBottom: '60px'
              }}>
                <FoodCard
                  id="1"
                  title="Margherita Pizza"
                  description="Fresh mozzarella, tomato sauce, and basil on a crispy thin crust"
                  price={12.99}
                  originalPrice={15.99}
                  rating={4.8}
                  reviewCount={124}
                  badge="Popular"
                />
                <FoodCard
                  id="2"
                  title="Chicken Burger"
                  description="Grilled chicken breast with lettuce, tomato, and our special sauce"
                  price={9.99}
                  rating={4.6}
                  reviewCount={89}
                  badge="New"
                />
                <FoodCard
                  id="3"
                  title="Chicken Biryani"
                  description="Aromatic basmati rice with tender chicken and traditional spices"
                  price={15.99}
                  rating={4.9}
                  reviewCount={156}
                  badge="Bestseller"
                />
              </div>
            </div>
          </section>
          
          <ShopsHotels />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;
