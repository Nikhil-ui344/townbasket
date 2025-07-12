import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();

  const vendorStats = [
    { label: 'Total Orders', value: '89', icon: '📦', trend: '+23%' },
    { label: 'Revenue Today', value: '$1,245', icon: '💰', trend: '+18%' },
    { label: 'Menu Items', value: '24', icon: '🍽️', trend: '+2' },
    { label: 'Avg Rating', value: '4.7★', icon: '⭐', trend: '+0.1' },
  ];

  const todayOrders = [
    { id: '#12355', customer: 'John D.', items: 'Margherita Pizza x2', amount: '$25.98', time: '2:30 PM', status: 'Preparing' },
    { id: '#12354', customer: 'Sarah M.', items: 'Caesar Salad, Garlic Bread', amount: '$18.50', time: '2:15 PM', status: 'Ready' },
    { id: '#12353', customer: 'Mike L.', items: 'Pepperoni Pizza', amount: '$14.99', time: '1:45 PM', status: 'Delivered' },
    { id: '#12352', customer: 'Emma W.', items: 'Veggie Pizza, Coke', amount: '$19.75', time: '1:30 PM', status: 'Delivered' },
  ];

  const menuItems = [
    { name: 'Margherita Pizza', price: '$12.99', orders: 45, status: 'Available' },
    { name: 'Pepperoni Pizza', price: '$14.99', orders: 38, status: 'Available' },
    { name: 'Caesar Salad', price: '$8.50', orders: 22, status: 'Available' },
    { name: 'Garlic Bread', price: '$5.99', orders: 15, status: 'Low Stock' },
  ];

  return (
    <div className="dashboard vendor-dashboard">
      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <h1 className="dashboard-title">Vendor Dashboard 🏪</h1>
          <p className="dashboard-subtitle">Welcome {user?.name || 'Vendor'}! Manage your restaurant and orders</p>
        </div>
        <div className="header-actions">
          <motion.button
            className="btn btn-secondary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📋 Menu
          </motion.button>
          <motion.button
            className="btn btn-primary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ➕ Add Item
          </motion.button>
        </div>
      </motion.div>

      {/* Vendor Stats */}
      <motion.div
        className="stats-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {vendorStats.map((stat, index) => (
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
        {/* Today's Orders */}
        <motion.div
          className="dashboard-card vendor-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="card-header">
            <h3 className="card-title">Today's Orders</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <div className="orders-list">
            {todayOrders.map((order, index) => (
              <motion.div
                key={order.id}
                className="vendor-order-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="order-details">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className="order-time">{order.time}</span>
                  </div>
                  <div className="order-info">
                    <span className="customer-name">{order.customer}</span>
                    <span className="order-items">{order.items}</span>
                  </div>
                </div>
                <div className="order-actions">
                  <span className="order-amount">{order.amount}</span>
                  <select 
                    className={`status-select status-${order.status.toLowerCase()}`}
                    defaultValue={order.status}
                  >
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Menu Management */}
        <motion.div
          className="dashboard-card vendor-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="card-header">
            <h3 className="card-title">Menu Items</h3>
            <button className="btn btn-ghost btn-sm">Edit Menu</button>
          </div>
          <div className="menu-list">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                className="menu-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <div className="item-details">
                    <span className="item-price">{item.price}</span>
                    <span className="item-orders">{item.orders} orders today</span>
                  </div>
                </div>
                <div className="item-actions">
                  <span className={`item-status status-${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                  <button className="btn btn-outline btn-sm">Edit</button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Analytics */}
        <motion.div
          className="dashboard-card vendor-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="card-title">Performance Analytics</h3>
          <div className="analytics-grid">
            <div className="analytics-item">
              <span className="analytics-label">Avg Prep Time</span>
              <span className="analytics-value">15 minutes</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Customer Rating</span>
              <span className="analytics-value">4.7/5.0</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Monthly Revenue</span>
              <span className="analytics-value">$12,450</span>
            </div>
            <div className="analytics-item">
              <span className="analytics-label">Top Selling Item</span>
              <span className="analytics-value">Margherita Pizza</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VendorDashboard;
