import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();

  const orderHistory = [
    {
      id: '#12345',
      date: '2025-07-12',
      restaurant: 'Pizza Palace',
      items: 'Margherita Pizza, Caesar Salad',
      total: 24.99,
      status: 'Delivered'
    },
    {
      id: '#12344',
      date: '2025-07-10',
      restaurant: 'Burger House',
      items: 'Chicken Burger, Fries',
      total: 15.99,
      status: 'Delivered'
    },
    {
      id: '#12343',
      date: '2025-07-08',
      restaurant: 'Sushi Master',
      items: 'California Roll, Miso Soup',
      total: 32.50,
      status: 'Delivered'
    }
  ];

  const favoriteRestaurants = [
    { name: 'Pizza Palace', cuisine: 'Italian', rating: 4.8 },
    { name: 'Burger House', cuisine: 'American', rating: 4.6 },
    { name: 'Sushi Master', cuisine: 'Japanese', rating: 4.9 },
  ];

  return (
    <div className="dashboard">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="dashboard-title">Welcome back, {user?.name}! 👋</h1>
          <p className="dashboard-subtitle">Ready to order something delicious?</p>
        </div>
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🍽️ Order Now
        </motion.button>
      </motion.div>

      <div className="dashboard-grid">
        {/* Quick Stats */}
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="card-title">Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">23</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$456</span>
              <span className="stat-label">Total Spent</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5</span>
              <span className="stat-label">Favorite Places</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
        </motion.div>

        {/* Order History */}
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="card-title">Recent Orders</h3>
          <div className="order-list">
            {orderHistory.map((order, index) => (
              <motion.div
                key={order.id}
                className="order-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="order-info">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-details">
                    <span className="restaurant-name">{order.restaurant}</span>
                    <span className="order-items">{order.items}</span>
                  </div>
                </div>
                <div className="order-summary">
                  <span className="order-total">${order.total}</span>
                  <span className={`order-status status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Favorite Restaurants */}
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="card-title">Favorite Restaurants</h3>
          <div className="favorites-list">
            {favoriteRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                className="favorite-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="restaurant-info">
                  <span className="restaurant-name">{restaurant.name}</span>
                  <span className="restaurant-cuisine">{restaurant.cuisine}</span>
                </div>
                <span className="restaurant-rating">{restaurant.rating}★</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
