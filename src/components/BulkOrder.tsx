@@ .. @@
 import React, { useState } from 'react';
 import { Users, Calendar, Phone, Mail, MapPin, Calculator } from 'lucide-react';
+import { OrderService } from '../services/orderService';

@@ .. @@
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
-    alert('Bulk order inquiry submitted! We will contact you within 24 hours.');
+    
+    const orderData = {
+      ...formData,
+      estimatedCost
+    };
+
+    OrderService.submitBulkOrder(orderData).then(success => {
+      if (success) {
+        alert('Bulk order inquiry submitted successfully! We will contact you within 24 hours to confirm details.');
+        setFormData({
+          eventType: '',
+          guestCount: 50,
+          eventDate: '',
+          eventTime: '',
+          venue: '',
+          contactName: '',
+          contactPhone: '',
+          contactEmail: '',
+          specialRequirements: '',
+          menuPreference: ''
+        });
+        setEstimatedCost(0);
+      } else {
+        alert('Failed to submit bulk order. Please try again or contact us directly.');
+      }
+    });
   };