import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff, User, Lock, Phone, Calendar, Package, TrendingUp, Users, IndianRupee, Settings, Edit3, Save, Plus, Trash2, Mail, MessageSquare, AlertCircle } from 'lucide-react';
import { AuthService } from '../services/authService';
import { OrderService } from '../services/orderService';
import { BulkOrder, ContactMessage, OwnerDetails } from '../types';

interface OwnerLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const OwnerLogin: React.FC<OwnerLoginProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const [ownerDetails, setOwnerDetails] = useState<OwnerDetails | null>(null);
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [newCredentials, setNewCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [bulkOrders, setBulkOrders] = useState<BulkOrder[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  const dashboardStats = {
    todayOrders: 24,
    todayRevenue: 15640,
    pendingBulkOrders: bulkOrders.filter(order => order.status === 'pending').length,
    unreadMessages: contactMessages.filter(msg => !msg.isRead).length
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadBulkOrders();
      loadContactMessages();
    }
  }, [isLoggedIn]);

  const loadBulkOrders = async () => {
    const orders = await OrderService.getBulkOrders();
    setBulkOrders(orders);
  };

  const loadContactMessages = async () => {
    const messages = await OrderService.getContactMessages();
    setContactMessages(messages);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const owner = await AuthService.login(credentials.username, credentials.password);
      if (owner) {
        setOwnerDetails(owner);
        setIsLoggedIn(true);
        setCredentials({ username: '', password: '' });
      } else {
        alert('Invalid credentials. Please check your username and password.');
      }
    } catch (error) {
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCredentials = async () => {
    if (!ownerDetails) return;

    if (newCredentials.password !== newCredentials.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newCredentials.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    const success = await AuthService.updateCredentials(
      ownerDetails.id,
      newCredentials.username,
      newCredentials.password
    );

    if (success) {
      setOwnerDetails(prev => prev ? { ...prev, username: newCredentials.username } : null);
      setIsEditingCredentials(false);
      setNewCredentials({ username: '', password: '', confirmPassword: '' });
      alert('Credentials updated successfully!');
    } else {
      alert('Failed to update credentials. Please try again.');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      alert('Please enter your email address');
      return;
    }

    const success = await AuthService.requestPasswordReset(forgotPasswordEmail);
    if (success) {
      alert('Password reset instructions have been sent to your email.');
    } else {
      alert('Failed to send reset instructions. Please check your email address.');
    }
  };

  const handleResetPassword = async () => {
    if (!resetToken || !newPassword || !confirmNewPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    const success = await AuthService.resetPassword(resetToken, newPassword);
    if (success) {
      alert('Password reset successfully! You can now login with your new password.');
      setShowForgotPassword(false);
      setResetToken('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      alert('Failed to reset password. Please check your reset token.');
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    const success = await OrderService.markMessageAsRead(messageId);
    if (success) {
      setContactMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
              {!showForgotPassword ? (
                <>
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
                      disabled={loading}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowForgotPassword(true)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </>
              ) : (
                /* Forgot Password Form */
                <div>
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Reset Password</h3>
                    <p className="text-gray-600">Enter your email to receive reset instructions</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <button
                      onClick={handleForgotPassword}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                      Send Reset Instructions
                    </button>

                    <div className="border-t pt-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">Have a Reset Token?</h4>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={resetToken}
                          onChange={(e) => setResetToken(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="Enter reset token"
                        />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="Enter new password"
                        />
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                          placeholder="Confirm new password"
                        />
                        <button
                          onClick={handleResetPassword}
                          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                        >
                          Reset Password
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowForgotPassword(false)}
                      className="w-full text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Back to Login
                    </button>
                  </div>
                </div>
              )}
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
                  { id: 'bulk-orders', label: 'Bulk Orders', icon: Package },
                  { id: 'messages', label: 'Messages', icon: MessageSquare },
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
                      {tab.id === 'messages' && dashboardStats.unreadMessages > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {dashboardStats.unreadMessages}
                        </span>
                      )}
                      {tab.id === 'bulk-orders' && dashboardStats.pendingBulkOrders > 0 && (
                        <span className="bg-yellow-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {dashboardStats.pendingBulkOrders}
                        </span>
                      )}
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
                          <p className="text-yellow-600 text-sm font-medium">Pending Bulk Orders</p>
                          <p className="text-2xl font-bold text-yellow-800">{dashboardStats.pendingBulkOrders}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-yellow-600" />
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-600 text-sm font-medium">Unread Messages</p>
                          <p className="text-2xl font-bold text-purple-800">{dashboardStats.unreadMessages}</p>
                        </div>
                        <Mail className="h-8 w-8 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Welcome Message */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Welcome back, {ownerDetails?.name}!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Manage your catering business efficiently with our comprehensive dashboard
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => setActiveTab('bulk-orders')}
                        className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                      >
                        View Bulk Orders
                      </button>
                      <button
                        onClick={() => setActiveTab('messages')}
                        className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                      >
                        Check Messages
                      </button>
                      <button
                        onClick={() => setActiveTab('settings')}
                        className="bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors shadow-md"
                      >
                        Update Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Bulk Orders Tab */}
              {activeTab === 'bulk-orders' && (
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Bulk Orders</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {bulkOrders.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p>No bulk orders yet</p>
                      </div>
                    ) : (
                      bulkOrders.map(order => (
                        <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div>
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-gray-800">{order.eventType}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-gray-600 mb-1">{order.contactName}</p>
                              <div className="flex items-center text-gray-500 text-sm">
                                <Phone className="h-3 w-3 mr-1" />
                                <span>{order.contactPhone}</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{order.eventDate} at {order.eventTime}</span>
                              </div>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{order.guestCount} guests</span>
                              </div>
                            </div>

                            <div>
                              <p className="font-medium text-gray-800 mb-2">Event Details:</p>
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Venue:</strong> {order.venue}
                              </p>
                              <p className="text-sm text-gray-600 mb-2">
                                <strong>Menu:</strong> {order.menuPreference}
                              </p>
                              {order.contactEmail && (
                                <p className="text-sm text-gray-600 mb-2">
                                  <strong>Email:</strong> {order.contactEmail}
                                </p>
                              )}
                              {order.specialRequirements && (
                                <p className="text-sm text-gray-600">
                                  <strong>Special Requirements:</strong> {order.specialRequirements}
                                </p>
                              )}
                            </div>

                            <div>
                              <div className="text-right mb-4">
                                <p className="text-2xl font-bold text-green-600">₹{order.estimatedCost.toLocaleString()}</p>
                                <p className="text-sm text-gray-500">Estimated Cost</p>
                              </div>
                              
                              <div className="space-y-2">
                                <a
                                  href={`tel:${order.contactPhone}`}
                                  className="w-full bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-1"
                                >
                                  <Phone className="h-4 w-4" />
                                  <span>Call Customer</span>
                                </a>
                                {order.contactEmail && (
                                  <a
                                    href={`mailto:${order.contactEmail}`}
                                    className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                                  >
                                    <Mail className="h-4 w-4" />
                                    <span>Send Email</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div className="bg-white rounded-xl border shadow-sm">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-semibold text-gray-800">Contact Messages</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {contactMessages.length === 0 ? (
                      <div className="p-8 text-center text-gray-500">
                        <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                        <p>No messages yet</p>
                      </div>
                    ) : (
                      contactMessages.map(message => (
                        <div key={message.id} className={`p-6 hover:bg-gray-50 transition-colors ${!message.isRead ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-gray-800">{message.name}</h4>
                                {!message.isRead && (
                                  <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>Subject:</strong> {message.subject}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                <span>{message.email}</span>
                                <span>{message.phone}</span>
                                <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-gray-700">{message.message}</p>
                            </div>
                            <div className="flex flex-col space-y-2 ml-4">
                              {!message.isRead && (
                                <button
                                  onClick={() => markMessageAsRead(message.id)}
                                  className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
                                >
                                  Mark as Read
                                </button>
                              )}
                              <a
                                href={`tel:${message.phone}`}
                                className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-green-700 transition-colors text-center"
                              >
                                Call
                              </a>
                              <a
                                href={`mailto:${message.email}`}
                                className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-orange-700 transition-colors text-center"
                              >
                                Reply
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Owner Details */}
                  <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                      <h3 className="text-xl font-semibold text-gray-800">Business Information</h3>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={ownerDetails?.name || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={ownerDetails?.email || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                          <input
                            type="tel"
                            value={ownerDetails?.phone || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                          <input
                            type="text"
                            value={ownerDetails?.businessName || ''}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <textarea
                            value={ownerDetails?.address || ''}
                            disabled
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Login Credentials */}
                  <div className="bg-white rounded-xl border shadow-sm">
                    <div className="p-6 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-800">Login Credentials</h3>
                        <button
                          onClick={() => {
                            if (isEditingCredentials) {
                              setNewCredentials({ username: '', password: '', confirmPassword: '' });
                            } else {
                              setNewCredentials({ username: ownerDetails?.username || '', password: '', confirmPassword: '' });
                            }
                            setIsEditingCredentials(!isEditingCredentials);
                          }}
                          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                          <span>{isEditingCredentials ? 'Cancel' : 'Change Credentials'}</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      {!isEditingCredentials ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                            <input
                              type="text"
                              value={ownerDetails?.username || ''}
                              disabled
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                              type="password"
                              value="••••••••"
                              disabled
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Username</label>
                            <input
                              type="text"
                              value={newCredentials.username}
                              onChange={(e) => setNewCredentials(prev => ({ ...prev, username: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                              placeholder="Enter new username"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                            <input
                              type="password"
                              value={newCredentials.password}
                              onChange={(e) => setNewCredentials(prev => ({ ...prev, password: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                              placeholder="Enter new password (min 6 characters)"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                            <input
                              type="password"
                              value={newCredentials.confirmPassword}
                              onChange={(e) => setNewCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <div className="flex space-x-4">
                            <button
                              onClick={handleUpdateCredentials}
                              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                            >
                              <Save className="h-4 w-4" />
                              <span>Update Credentials</span>
                            </button>
                            <button
                              onClick={() => {
                                setIsEditingCredentials(false);
                                setNewCredentials({ username: '', password: '', confirmPassword: '' });
                              }}
                              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
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