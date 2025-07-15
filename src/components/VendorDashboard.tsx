import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/Dashboard.css';

const VendorDashboard: React.FC = () => {
  const { user } = useAuth();
  
  // State for menu management
  const [isEditingMenu, setIsEditingMenu] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  
  // Mock menu data based on vendor's store
  const [menuItems, setMenuItems] = useState(() => {
    // Different menu items based on store
    const menuData: { [key: string]: any[] } = {
      '1': [ // Pizza Palace
        { id: 1, name: 'Margherita Pizza', price: 12.99, orders: 45, status: 'Available', category: 'Pizza', description: 'Fresh tomatoes, mozzarella, basil' },
        { id: 2, name: 'Pepperoni Pizza', price: 14.99, orders: 38, status: 'Available', category: 'Pizza', description: 'Pepperoni, mozzarella, tomato sauce' },
        { id: 3, name: 'Caesar Salad', price: 8.50, orders: 22, status: 'Available', category: 'Salads', description: 'Romaine lettuce, croutons, parmesan' },
        { id: 4, name: 'Garlic Bread', price: 5.99, orders: 15, status: 'Low Stock', category: 'Sides', description: 'Fresh baked bread with garlic butter' },
      ],
      '2': [ // Burger House
        { id: 1, name: 'Classic Burger', price: 11.99, orders: 52, status: 'Available', category: 'Burgers', description: 'Beef patty, lettuce, tomato, onion' },
        { id: 2, name: 'Cheese Burger', price: 13.99, orders: 41, status: 'Available', category: 'Burgers', description: 'Beef patty with cheese, lettuce, tomato' },
        { id: 3, name: 'Chicken Wings', price: 9.99, orders: 28, status: 'Available', category: 'Appetizers', description: 'Buffalo chicken wings with ranch' },
        { id: 4, name: 'French Fries', price: 4.99, orders: 67, status: 'Available', category: 'Sides', description: 'Crispy golden french fries' },
      ],
      '3': [ // Spice Garden
        { id: 1, name: 'Chicken Curry', price: 15.99, orders: 34, status: 'Available', category: 'Main Course', description: 'Spicy chicken curry with rice' },
        { id: 2, name: 'Vegetable Biryani', price: 13.99, orders: 29, status: 'Available', category: 'Rice', description: 'Aromatic basmati rice with vegetables' },
        { id: 3, name: 'Naan Bread', price: 3.99, orders: 42, status: 'Available', category: 'Bread', description: 'Fresh baked naan bread' },
        { id: 4, name: 'Mango Lassi', price: 4.50, orders: 18, status: 'Low Stock', category: 'Beverages', description: 'Sweet mango yogurt drink' },
      ]
    };
    return menuData[user?.storeId || '1'] || menuData['1'];
  });

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    status: 'Available'
  });

  const vendorStats = [
    { label: 'Total Orders', value: '89', icon: '📦', trend: '+23%' },
    { label: 'Revenue Today', value: '$1,245', icon: '💰', trend: '+18%' },
    { label: 'Menu Items', value: menuItems.length.toString(), icon: '🍽️', trend: '+2' },
    { label: 'Avg Rating', value: '4.7★', icon: '⭐', trend: '+0.1' },
  ];

  const todayOrders = [
    { id: '#12355', customer: 'John D.', items: 'Margherita Pizza x2', amount: '$25.98', time: '2:30 PM', status: 'Preparing' },
    { id: '#12354', customer: 'Sarah M.', items: 'Caesar Salad, Garlic Bread', amount: '$18.50', time: '2:15 PM', status: 'Ready' },
    { id: '#12353', customer: 'Mike L.', items: 'Pepperoni Pizza', amount: '$14.99', time: '1:45 PM', status: 'Delivered' },
    { id: '#12352', customer: 'Emma W.', items: 'Veggie Pizza, Coke', amount: '$19.75', time: '1:30 PM', status: 'Delivered' },
  ];

  // Handler functions for menu management
  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item = {
        id: Date.now(),
        name: newItem.name,
        price: parseFloat(newItem.price),
        orders: 0,
        status: newItem.status,
        category: newItem.category,
        description: newItem.description
      };
      setMenuItems([...menuItems, item]);
      setNewItem({ name: '', price: '', category: '', description: '', status: 'Available' });
      setShowAddItem(false);
    }
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      description: item.description,
      status: item.status
    });
  };

  const handleUpdateItem = () => {
    if (editingItem && newItem.name && newItem.price && newItem.category) {
      const updatedItems = menuItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...newItem, price: parseFloat(newItem.price) }
          : item
      );
      setMenuItems(updatedItems);
      setEditingItem(null);
      setNewItem({ name: '', price: '', category: '', description: '', status: 'Available' });
    }
  };

  const handleDeleteItem = (itemId: number) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  const toggleItemStatus = (itemId: number) => {
    setMenuItems(menuItems.map(item => 
      item.id === itemId 
        ? { ...item, status: item.status === 'Available' ? 'Unavailable' : 'Available' }
        : item
    ));
  };

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
          <p className="dashboard-subtitle">Welcome {user?.name || 'Vendor'}! Manage {user?.storeName || 'your restaurant'} and orders</p>
        </div>
        <div className="header-actions">
          <motion.button
            className="btn btn-secondary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditingMenu(!isEditingMenu)}
          >
            📋 {isEditingMenu ? 'View Menu' : 'Edit Menu'}
          </motion.button>
          <motion.button
            className="btn btn-primary btn-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddItem(true)}
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
            <h3 className="card-title">Menu Items ({menuItems.length})</h3>
            <div className="menu-header-actions">
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setShowAddItem(true)}
                disabled={showAddItem || editingItem !== null}
              >
                ➕ Add Item
              </button>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => setIsEditingMenu(!isEditingMenu)}
              >
                {isEditingMenu ? '👁️ View' : '✏️ Edit'}
              </button>
            </div>
          </div>
          
          {/* Add Item Form */}
          <AnimatePresence>
            {(showAddItem || editingItem) && (
              <motion.div
                className="add-item-form"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h4>{editingItem ? 'Edit Item' : 'Add New Item'}</h4>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    className="form-input"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    className="form-input"
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="form-select"
                  >
                    <option value="">Select Category</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burgers">Burgers</option>
                    <option value="Salads">Salads</option>
                    <option value="Sides">Sides</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                  <select
                    value={newItem.status}
                    onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                    className="form-select"
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                    <option value="Low Stock">Low Stock</option>
                  </select>
                </div>
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  className="form-textarea"
                  rows={2}
                />
                <div className="form-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={editingItem ? handleUpdateItem : handleAddItem}
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setShowAddItem(false);
                      setEditingItem(null);
                      setNewItem({ name: '', price: '', category: '', description: '', status: 'Available' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="menu-list">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="menu-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="item-info">
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-description">{item.description}</p>
                  <div className="item-details">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <span className="item-category">{item.category}</span>
                    <span className="item-orders">{item.orders} orders today</span>
                  </div>
                </div>
                <div className="item-actions">
                  <span className={`item-status status-${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                  {isEditingMenu && (
                    <div className="action-buttons">
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => handleEditItem(item)}
                      >
                        ✏️
                      </button>
                      <button 
                        className={`btn btn-sm ${item.status === 'Available' ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => toggleItemStatus(item.id)}
                      >
                        {item.status === 'Available' ? '❌' : '✅'}
                      </button>
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  )}
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
