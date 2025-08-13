import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Lock, Phone, Calendar, Package, TrendingUp, Users, IndianRupee } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  items: string[];
  total: number;
  status: string;
  orderTime: string;
  phone: string;
  address: string;
  specialRequirements?: string;
}

interface OwnerLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerLogin: React.FC<OwnerLoginProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Demo orders data
  const orders: Order[] = [
    {
      id: 'ORD001',
      customerName: 'Raj Kumar',
      items: ['Chicken Biryani', 'Paneer Butter Masala', 'Naan'],
      total: 450,
      status: 'preparing',
      orderTime: '2024-12-18 14:30',
      phone: '+91 9876543210',
      address: '123 Main Street, Bangalore',
      specialRequirements: 'Less spicy, extra raita'
    },
    {
      id: 'ORD002',
      customerName: 'Priya Sharma',
      items: ['South Indian Thali', 'Filter Coffee'],
      total: 180,
      status: 'out_for_delivery',
      orderTime: '2024-12-18 13:45',
      phone: '+91 9876543211',
      address: '456 Park Avenue, Bangalore'
    },
    {
      id: 'ORD003',
      customerName: 'Amit Patel',
      items: ['Masala Dosa', 'Sambar', 'Coconut Chutney'],
      total: 120,
      status: 'delivered',
      orderTime: '2024-12-18 12:15',
      phone: '+91 9876543212',
      address: '789 Church Street, Bangalore'
    }
  ];

  const dashboardStats = {
    todayOrders: 24,
    todayRevenue: 15640,
    pendingOrders: 8,
    completedOrders: 16
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use: admin / admin123');
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    alert(`Order ${orderId} status updated to: ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLoggedIn ? 'Owner Dashboard' : 'Owner Login'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!isLoggedIn ? (
          /* Login Form */
          <div className="p-8">
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Welcome Back</h3>
                <p className="text-gray-600">Sign in to access your dashboard</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Demo credentials: admin / admin123</p>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard */
          <div className="p-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Today's Orders</p>
                    <p className="text-2xl font-bold text-blue-800">{dashboardStats.todayOrders}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Today's Revenue</p>
                    <p className="text-2xl font-bold text-green-800">₹{dashboardStats.todayRevenue.toLocaleString()}</p>
                  </div>
                  <IndianRupee className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-600 text-sm font-medium">Pending Orders</p>
                    <p className="text-2xl font-bold text-yellow-800">{dashboardStats.pendingOrders}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-yellow-600" />
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Completed</p>
                    <p className="text-2xl font-bold text-purple-800">{dashboardStats.completedOrders}</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl border shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800">Recent Orders</h3>
              </div>
              
              <div className="divide-y divide-gray-200">
                {orders.map(order => (
                  <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-800">#{order.id}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600">{order.customerName}</p>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{order.orderTime}</span>
                        </div>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 mb-2">Items:</p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index}>• {item}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 mb-2">Delivery Address:</p>
                        <p className="text-sm text-gray-600">{order.address}</p>
                        {order.specialRequirements && (
                          <>
                            <p className="font-medium text-gray-800 mt-2 mb-1">Special Requirements:</p>
                            <p className="text-sm text-gray-600">{order.specialRequirements}</p>
                          </>
                        )}
                      </div>

                      <div>
                        <div className="text-right mb-4">
                          <p className="text-2xl font-bold text-green-600">₹{order.total}</p>
                        </div>
                        
                        <div className="space-y-2">
                          {order.status !== 'delivered' && (
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                            >
                              <option value="placed">Placed</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          )}
                          <a
                            href={`tel:${order.phone}`}
                            className="w-full bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Phone className="h-4 w-4" />
                            <span>Call Customer</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerLogin;