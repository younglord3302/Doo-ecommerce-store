import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import axios from '../utils/axios';
import AdminSummary from './AdminSummary';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';
import AdminUsers from './AdminUsers';

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/admin/dashboard');
      setStats(response.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
    { name: 'Summary', path: '/admin', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Orders', path: '/admin/orders', icon: '🛒' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] space-y-8 md:space-y-0 md:space-x-8 pt-6">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <div className="glass rounded-3xl p-6 sticky top-28">
          <h2 className="text-[10px] font-black text-accent-indigo uppercase tracking-[0.2em] mb-8">Management</h2>
          <nav className="space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${isActive
                    ? 'bg-accent-indigo text-white shadow-lg shadow-accent-indigo/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-bold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-12 pt-8 border-t border-white/10">
             <div className="glass p-4 rounded-2xl text-center space-y-2">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Studio Status</p>
                <div className="flex items-center justify-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-white uppercase tracking-tight">Active</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-visible pb-12">
        <Routes>
          <Route index element={<AdminSummary stats={stats} />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
