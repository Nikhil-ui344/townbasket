import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'vendor';
  avatar?: string;
  storeId?: string; // For vendors to associate with specific stores
  storeName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'John Customer',
    email: 'customer@demo.com',
    role: 'customer',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: 'admin',
  },
  {
    id: '3',
    name: 'Mario Rossi',
    email: 'vendor1@demo.com',
    role: 'vendor',
    storeId: '1',
    storeName: 'Pizza Palace',
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'vendor2@demo.com',
    role: 'vendor',
    storeId: '2',
    storeName: 'Burger House',
  },
  {
    id: '5',
    name: 'Raj Patel',
    email: 'vendor3@demo.com',
    role: 'vendor',
    storeId: '3',
    storeName: 'Spice Garden',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('townbasket_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find demo user
    const foundUser = DEMO_USERS.find(u => u.email === email);
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('townbasket_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('townbasket_user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
