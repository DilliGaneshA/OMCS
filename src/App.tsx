@@ .. @@
 import React, { useState } from 'react';
 import Navbar from './components/Navbar';
 import Banner from './components/Banner';
 import Menu from './components/Menu';
 import TodaysSpecial from './components/TodaysSpecial';
 import BulkOrder from './components/BulkOrder';
 import OrderTracking from './components/OrderTracking';
-import CustomerRatings from './components/CustomerRatings';
 import Contact from './components/Contact';
 import OwnerLogin from './components/OwnerLogin';
+import { MenuItem } from './types';

-interface MenuItem {
-  id: number;
-  name: string;
-  description: string;
-  price: number;
-  category: string;
-  image: string;
-  isVeg: boolean;
-}
-
 function App() {
@@ .. @@
       
       <OrderTracking />
       
-      <CustomerRatings />
-      
       <Contact />
       
       <OwnerLogin 
@@ .. @@
                 <li><a href="#home" className="hover:text-orange-400 transition-colors">Home</a></li>
                 <li><a href="#menu" className="hover:text-orange-400 transition-colors">Menu</a></li>
                 <li><a href="#specials" className="hover:text-orange-400 transition-colors">Today's Special</a></li>
                 <li><a href="#bulk-order" className="hover:text-orange-400 transition-colors">Bulk Orders</a></li>
                 <li><a href="#track-order" className="hover:text-orange-400 transition-colors">Track Order</a></li>
               </ul>
             </div>