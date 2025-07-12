import { useAuth } from './context/AuthContext';
import { useView } from './context/ViewContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero_New';
import AdsBanner from './components/AdsBanner';
import FeaturedItems from './components/FeaturedItems';
import { FoodCard } from './components/Card';
import ShopsHotels from './components/ShopsHotels';
import CustomerDashboard from './components/CustomerDashboard';
import AdminDashboard from './components/AdminDashboard';
import VendorDashboard from './components/VendorDashboard';
import './styles/globals.css';
import './styles/Layout.css';

function App() {
  const { user } = useAuth();
  const { currentView } = useView();

  // Admin and vendor users are automatically shown their dashboards
  if (user && user.role !== 'customer') {
    switch (user.role) {
      case 'admin':
        return (
          <>
            <Navigation />
            <AdminDashboard />
          </>
        );
      case 'vendor':
        return (
          <>
            <Navigation />
            <VendorDashboard />
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
        <Navigation />
        <CustomerDashboard />
      </>
    );
  }

  // Default landing page for non-authenticated users and customers
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>
      <Navigation />
      {/* Hero Section - You can enable video background by uncommenting below */}
      {/* Option 1: With Video Background */}
      {/*
      <Hero 
        enableVideo={true}
        videoSrc="/videos/hero-background.mp4"
        videoPoster="/images/hero-poster.jpg"
      />
      */}
      
      {/* Option 2: Default Gradient Background (current) */}
      <Hero 
  enableVideo={true}
  videoSrc="/videos/hero.mp4"
  videoPoster="/images/hero-poster.jpg"
/> 
      
      {/* To switch to video background:
          1. Add your video file to public/videos/hero-background.mp4
          2. Add poster image to public/images/hero-poster.jpg
          3. Uncomment the video version above and comment out the default Hero
      */}
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
  );
}

export default App;
