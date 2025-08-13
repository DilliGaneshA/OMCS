import React, { useState } from 'react';
import { X, Eye, EyeOff, User, Lock, Phone, Calendar, Package, TrendingUp, Users, IndianRupee, Settings, Star, Edit3, Save, Plus, Trash2 } from 'lucide-react';

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

interface OwnerDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  username: string;
  password: string;
}

interface CustomerReview {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  date: string;
  orderType: string;
  location: string;
  profileImage: string;
  isApproved: boolean;
}

interface OwnerLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerLogin: React.FC<OwnerLoginProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [ownerDetails, setOwnerDetails] = useState<OwnerDetails>({
    name: 'Rajesh Kumar',
    email: 'owner@mahaganapati.com',
    phone: '+91 9787116802',
    address: 'Nachikuppam Road, near HP Petrol Bank, Krishnagiri 635 121',
    businessName: 'Om Sri Mahaganapati Catering Service',
    username: 'admin',
    password: 'admin123'
  });

  const [isEditingOwner, setIsEditingOwner] = useState(false);
  const [tempOwnerDetails, setTempOwnerDetails] = useState<OwnerDetails>(ownerDetails);

  const [customerReviews, setCustomerReviews] = useState<CustomerReview[]>([
    {
      id: '1',
      customerName: 'Rajesh Kumar',
      rating: 5,
      review: 'Absolutely delicious food! The biryani was perfectly spiced and the paneer butter masala was creamy and flavorful. Delivery was on time and the food was still hot. Highly recommended!',
      date: 'Dec 15, 2024',
      orderType: 'Dinner',
      location: 'Koramangala, Bangalore',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      isApproved: true
    },
    {
      id: '2',
      customerName: 'Priya Sharma',
      rating: 5,
      review: 'Om Sri Mahaganapati catered our wedding reception for 300+ guests. The food quality was exceptional and all our guests were impressed. Professional service and great coordination.',
      date: 'Dec 12, 2024',
      orderType: 'Wedding Catering',
      location: 'Whitefield, Bangalore',
      profileImage: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=150',
      isApproved: true
    },
    {
      id: '3',
      customerName: 'Amit Patel',
      rating: 4,
      review: 'Great South Indian breakfast! The dosas were crispy and the sambar had the perfect consistency. Only minor issue was the delivery was 10 minutes late, but the food quality made up for it.',
      date: 'Dec 10, 2024',
      orderType: 'Breakfast',
      location: 'Marathahalli, Bangalore',
      profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150',
      isApproved: false
    }
  ]);

  const [newReview, setNewReview] = useState<Partial<CustomerReview>>({
    customerName: '',
    rating: 5,
    review: '',
    orderType: '',
    location: '',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
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
    if (credentials.username === ownerDetails.username && credentials.password === ownerDetails.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Please check your username and password.');
    }
  };

  const handleOwnerDetailsUpdate = () => {
    setOwnerDetails(tempOwnerDetails);
    setIsEditingOwner(false);
    alert('Owner details updated successfully!');
  };

  const handleAddReview = () => {
    if (!newReview.customerName || !newReview.review || !newReview.orderType || !newReview.location) {
      alert('Please fill in all required fields');
      return;
    }

    const review: CustomerReview = {
      id: Date.now().toString(),
      customerName: newReview.customerName!,
      rating: newReview.rating!,
      review: newReview.review!,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      orderType: newReview.orderType!,
      location: newReview.location!,
      profileImage: newReview.profileImage!,
      isApproved: true
    };

    setCustomerReviews(prev => [review, ...prev]);
    setNewReview({
      customerName: '',
      rating: 5,
      review: '',
      orderType: '',
      location: '',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    alert('Review added successfully!');
  };

  const toggleReviewApproval = (reviewId: string) => {
    setCustomerReviews(prev =>
      prev.map(review =>
        review.id === reviewId
          ? { ...review, isApproved: !review.isApproved }
          : review
      )
    );
  };

  const deleteReview = (reviewId: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setCustomerReviews(prev => prev.filter(review => review.id !== reviewId));
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
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
                <p>Default credentials: admin / admin123</p>
              </div>
            </div>
          </div>
        ) : (
          /* Dashboard */
          <div>
            {/* Navigation Tabs */}
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                  { id: 'orders', label: 'Orders', icon: Package },
                  { id: 'reviews', label: 'Reviews', icon: Star },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map(tab => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-orange-600 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="p-6">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div>
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

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600">New order #ORD001 received from Raj Kumar</span>
                          <span className="text-sm text-gray-400">2 mins ago</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600">Order #ORD002 marked as delivered</span>
                          <span className="text-sm text-gray-400">15 mins ago</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-600">New review received from Priya Sharma</span>
                          <span className="text-sm text-gray-400">1 hour ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
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
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Add New Review */}
                  <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-semibold text-gray-800">Add New Review</h3>
                    </div>
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
                          <input
                            type="text"
                            value={newReview.customerName || ''}
                            onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                            placeholder="Enter customer name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                          <input
                            type="text"
                            value={newReview.location || ''}
                            onChange={(e) => setNewReview(prev => ({ ...prev, location: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                            placeholder="Enter location"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Order Type *</label>
                          <input
                            type="text"
                            value={newReview.orderType || ''}
                            onChange={(e) => setNewReview(prev => ({ ...prev, orderType: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                            placeholder="e.g., Dinner, Wedding Catering"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
                          <select
                            value={newReview.rating || 5}
                            onChange={(e) => setNewReview(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          >
                            <option value={5}>5 Stars</option>
                            <option value={4}>4 Stars</option>
                            <option value={3}>3 Stars</option>
                            <option value={2}>2 Stars</option>
                            <option value={1}>1 Star</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Review *</label>
                        <textarea
                          value={newReview.review || ''}
                          onChange={(e) => setNewReview(prev => ({ ...prev, review: e.target.value }))}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="Enter customer review"
                        />
                      </div>
                      <button
                        onClick={handleAddReview}
                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Review</span>
                      </button>
                    </div>
                  </div>

                  {/* Existing Reviews */}
                  <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-semibold text-gray-800">Customer Reviews</h3>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {customerReviews.map(review => (
                        <div key={review.id} className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={review.profileImage}
                                alt={review.customerName}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-800">{review.customerName}</h4>
                                <p className="text-sm text-gray-500">{review.location}</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  {renderStars(review.rating)}
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                review.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {review.isApproved ? 'Approved' : 'Pending'}
                              </span>
                              <button
                                onClick={() => toggleReviewApproval(review.id)}
                                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                  review.isApproved
                                    ? 'bg-yellow-600 text-white hover:bg-yellow-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                {review.isApproved ? 'Hide' : 'Approve'}
                              </button>
                              <button
                                onClick={() => deleteReview(review.id)}
                                className="text-red-600 hover:text-red-800 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="mb-2">
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                              {review.orderType}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.review}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-800">Owner Details</h3>
                      <button
                        onClick={() => {
                          if (isEditingOwner) {
                            setTempOwnerDetails(ownerDetails);
                          }
                          setIsEditingOwner(!isEditingOwner);
                        }}
                        className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>{isEditingOwner ? 'Cancel' : 'Edit'}</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={isEditingOwner ? tempOwnerDetails.name : ownerDetails.name}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditingOwner}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={isEditingOwner ? tempOwnerDetails.email : ownerDetails.email}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditingOwner}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={isEditingOwner ? tempOwnerDetails.phone : ownerDetails.phone}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditingOwner}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={isEditingOwner ? tempOwnerDetails.businessName : ownerDetails.businessName}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, businessName: e.target.value }))}
                          disabled={!isEditingOwner}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                          value={isEditingOwner ? tempOwnerDetails.address : ownerDetails.address}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, address: e.target.value }))}
                          disabled={!isEditingOwner}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <input
                          type="text"
                          value={isEditingOwner ? tempOwnerDetails.username : ownerDetails.username}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, username: e.target.value }))}
                          disabled={!isEditingOwner}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input
                          type="password"
                          value={isEditingOwner ? tempOwnerDetails.password : ownerDetails.password}
                          onChange={(e) => setTempOwnerDetails(prev => ({ ...prev, password: e.target.value }))}
                          disabled={!isEditingOwner}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 disabled:bg-gray-50"
                        />
                      </div>
                    </div>
                    
                    {isEditingOwner && (
                      <div className="mt-6 flex space-x-4">
                        <button
                          onClick={handleOwnerDetailsUpdate}
                          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                        >
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </button>
                        <button
                          onClick={() => {
                            setTempOwnerDetails(ownerDetails);
                            setIsEditingOwner(false);
                          }}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerLogin;