import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Menu from './components/Menu';
import TodaysSpecial from './components/TodaysSpecial';
import BulkOrder from './components/BulkOrder';
import OrderTracking from './components/OrderTracking';
import CustomerRatings from './components/CustomerRatings';
import Contact from './components/Contact';
import OwnerLogin from './components/OwnerLogin';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
}

function App() {
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [cartItems, setCartItems] = useState<Record<number, number>>({});

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCartItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + quantity
    }));
  };

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onOwnerLogin={() => setShowOwnerLogin(true)}
        cartItems={getTotalCartItems()}
      />
      
      <Banner />
      
      <Menu onAddToCart={handleAddToCart} />
      
      <TodaysSpecial />
      
      <BulkOrder />
      
      <OrderTracking />
      
      <CustomerRatings />
      
      <Contact />
      
      <OwnerLogin 
        isOpen={showOwnerLogin}
        onClose={() => setShowOwnerLogin(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">Om Sri Mahaganapati Catering Service</h3>
              <p className="text-gray-300 mb-4">
                Serving authentic and delicious food for all your special occasions. 
                From traditional recipes to modern presentations, we make every meal memorable.
              </p>
              <p className="text-gray-400 text-sm">
                © 2024 Om Sri Mahaganapati Catering Service. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-orange-400 transition-colors">Menu</a></li>
                <li><a href="#specials" className="hover:text-orange-400 transition-colors">Today's Special</a></li>
                <li><a href="#bulk-order" className="hover:text-orange-400 transition-colors">Bulk Orders</a></li>
                <li><a href="#track-order" className="hover:text-orange-400 transition-colors">Track Order</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Nachikuppam Road, near HP Petrol Bank</li>
                <li>Krishnagiri 635 121</li>
                <li>+91 9787116802</li>
                <li>smgcateringservice@gmail.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;