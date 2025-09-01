@@ .. @@
 import React, { useState } from 'react';
 import { Plus, Minus, ShoppingCart } from 'lucide-react';
-
-interface MenuItem {
-  id: number;
-  name: string;
-  description: string;
-  price: number;
-  category: string;
-  image: string;
-  isVeg: boolean;
-}
+import { MenuItem } from '../types';

 interface MenuProps {