import React, { useState } from 'react';
import { Search, MapPin, Clock, CheckCircle, Truck, ChefHat, Package } from 'lucide-react';

interface OrderStatus {
  orderId: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  customerName: string;
  items: string[];
  total: number;
  estimatedTime: string;
  address: string;
  phone: string;
}

const OrderTracking: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);

  // Demo orders for testing
  const demoOrders: Record<string, OrderStatus> = {
    'ORD001': {
      orderId: 'ORD001',
      status: 'preparing',
      customerName: 'Raj Kumar',
      items: ['Chicken Biryani', 'Paneer Butter Masala', 'Naan'],
      total: 450,
      estimatedTime: '25 mins',
      address: '123 Main Street, Bangalore',
      phone: '+91 9876543210'
    },
    'ORD002': {
      orderId: 'ORD002',
      status: 'out_for_delivery',
      customerName: 'Priya Sharma',
      items: ['South Indian Thali', 'Filter Coffee'],
      total: 180,
      estimatedTime: '15 mins',
      address: '456 Park Avenue, Bangalore',
      phone: '+91 9876543211'
    },
    'ORD003': {
      orderId: 'ORD003',
      status: 'delivered',
      customerName: 'Amit Patel',
      items: ['Masala Dosa', 'Sambar', 'Coconut Chutney'],
      total: 120,
      estimatedTime: 'Delivered',
      address: '789 Church Street, Bangalore',
      phone: '+91 9876543212'
    }
  };

  const handleTrackOrder = () => {
    setLoading(true);
    
    setTimeout(() => {
      const order = demoOrders[trackingId.toUpperCase()];
      setOrderStatus(order || null);
      setLoading(false);
    }, 1000);
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { id: 'placed', label: 'Order Placed', icon: Package },
      { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { id: 'preparing', label: 'Preparing', icon: ChefHat },
      { id: 'ready', label: 'Ready', icon: CheckCircle },
      { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
      { id: 'delivered', label: 'Delivered', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(step => step.id === currentStatus);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <section id="track-order" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Track Your Order</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with your order status in real-time. Enter your order ID to track your delivery
          </p>
        </div>

        {/* Tracking Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your Order ID (e.g., ORD001)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600 text-lg"
                />
              </div>
              <button
                onClick={handleTrackOrder}
                disabled={loading || !trackingId}
                className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Order Status */}
        {orderStatus && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Order Header */}
              <div className="border-b border-gray-200 pb-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      Order #{orderStatus.orderId}
                    </h3>
                    <p className="text-gray-600">Customer: {orderStatus.customerName}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{orderStatus.address}</span>
                    </div>
                  </div>
                  <div className="text-md:text-right">
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      ₹{orderStatus.total}
                    </div>
                    <div className="flex items-center justify-start md:justify-end text-green-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="font-semibold">ETA: {orderStatus.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Items:</h4>
                <div className="flex flex-wrap gap-2">
                  {orderStatus.items.map((item, index) => (
                    <span
                      key={index}
                      className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Timeline */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-6">Order Status:</h4>
                <div className="relative">
                  <div className="flex justify-between">
                    {getStatusSteps(orderStatus.status).map((step, index) => {
                      const IconComponent = step.icon;
                      return (
                        <div key={step.id} className="flex flex-col items-center flex-1">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                              step.completed
                                ? 'bg-green-600 text-white'
                                : step.active
                                ? 'bg-orange-600 text-white animate-pulse'
                                : 'bg-gray-200 text-gray-500'
                            }`}
                          >
                            <IconComponent className="h-6 w-6" />
                          </div>
                          <span
                            className={`text-sm font-medium text-center ${
                              step.completed || step.active ? 'text-gray-800' : 'text-gray-500'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Progress Line */}
                  <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                    <div
                      className="h-full bg-green-600 transition-all duration-300"
                      style={{
                        width: `${(getStatusSteps(orderStatus.status).filter(step => step.completed).length - 1) * (100 / (getStatusSteps(orderStatus.status).length - 1))}%`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Need help with your order? Contact our support team
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                      href={`tel:${orderStatus.phone}`}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2"
                    >
                      <span>Call Support</span>
                    </a>
                    <button className="border border-orange-600 text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-600 hover:text-white transition-colors">
                      Live Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Order Found */}
        {trackingId && !loading && !orderStatus && trackingId.length > 0 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-gray-400 mb-4">
                <Package className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find an order with ID "{trackingId}". Please check your order ID and try again.
              </p>
              <p className="text-sm text-gray-500">
                Try: ORD001, ORD002, or ORD003 for demo tracking
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderTracking;