import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const systemStats = [
    { label: 'Total Users', value: '12,543', icon: '👥', trend: '+12%' },
    { label: 'Active Orders', value: '256', icon: '📦', trend: '+8%' },
    { label: 'Revenue Today', value: '$8,945', icon: '💰', trend: '+15%' },
    { label: 'Restaurants', value: '89', icon: '🏪', trend: '+3%' },
  ];

  const recentOrders = [
    { id: '#12350', customer: 'John Doe', restaurant: 'Pizza Palace', amount: '$24.99', status: 'Processing' },
    { id: '#12349', customer: 'Jane Smith', restaurant: 'Burger House', amount: '$15.99', status: 'Delivered' },
    { id: '#12348', customer: 'Mike Johnson', restaurant: 'Sushi Master', amount: '$32.50', status: 'Preparing' },
    { id: '#12347', customer: 'Sarah Wilson', restaurant: 'Taco Bell', amount: '$18.75', status: 'On Route' },
  ];

  const topRestaurants = [
    { name: 'Pizza Palace', orders: 145, revenue: '$3,245', rating: 4.8 },
    { name: 'Burger House', orders: 132, revenue: '$2,890', rating: 4.6 },
    { name: 'Sushi Master', orders: 98, revenue: '$4,120', rating: 4.9 },
  ];

  return (
    <div className="dashboard admin-dashboard">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="dashboard-title">Admin Dashboard 👨‍💼</h1>
          <p className="dashboard-subtitle">Welcome {user?.name || 'Admin'}! System overview and management</p>
        </div>
        <div className="header-actions">
          <motion.button
            className="btn btn-secondary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📊 Reports
          </motion.button>
          <motion.button
            className="btn btn-primary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚙️ Settings
          </motion.button>
        </div>
      </motion.div>

      {/* System Stats */}
      <motion.div
        className="stats-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-trend positive">{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="dashboard-grid">
        {/* Recent Orders Management */}
        <motion.div
          className="dashboard-card admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card-header">
            <h3 className="card-title">Order Management</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="admin-table">
            <div className="table-header">
              <span>Order ID</span>
              <span>Customer</span>
              <span>Restaurant</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {recentOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <span className="order-id">{order.id}</span>
                <span className="customer-name">{order.customer}</span>
                <span className="restaurant-name">{order.restaurant}</span>
                <span className="order-amount">{order.amount}</span>
                <span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top Restaurants */}
        <motion.div
          className="dashboard-card admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card-header">
            <h3 className="card-title">Top Performing Restaurants</h3>
            <button className="btn btn-ghost btn-sm">Manage</button>
          </div>
          <div className="restaurants-list">
            {topRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                className="restaurant-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="restaurant-info">
                  <h4 className="restaurant-name">{restaurant.name}</h4>
                  <div className="restaurant-metrics">
                    <span className="metric">
                      📦 {restaurant.orders} orders
                    </span>
                    <span className="metric">
                      💰 {restaurant.revenue}
                    </span>
                    <span className="metric">
                      ⭐ {restaurant.rating}
                    </span>
                  </div>
                </div>
                <button className="btn btn-outline btn-sm">Manage</button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* System Analytics */}
        <motion.div
          className="dashboard-card admin-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="card-title">System Analytics</h3>
          <div className="analytics-grid">
            <div className="analytics-item">
              <span className="analytics-label">Peak Hours</span>
              <span className="analytics-value">12 PM - 2 PM</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Avg Delivery Time</span>
              <span className="analytics-value">28 minutes</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Customer Satisfaction</span>
              <span className="analytics-value">94%</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Active Drivers</span>
              <span className="analytics-value">45</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
