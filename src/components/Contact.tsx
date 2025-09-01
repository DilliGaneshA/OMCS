@@ .. @@
 import React, { useState } from 'react';
-import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter } from 'lucide-react';
+import { MapPin, Phone, Mail, Clock, Send, Facebook, MessageCircle } from 'lucide-react';
+import { OrderService } from '../services/orderService';

 const Contact: React.FC = () => {
@@ .. @@
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
-    alert('Message sent! We will get back to you within 24 hours.');
-    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
+    
+    OrderService.submitContactMessage(formData).then(success => {
+      if (success) {
+        alert('Message sent successfully! We will get back to you within 24 hours.');
+        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
+      } else {
+        alert('Failed to send message. Please try again or call us directly.');
+      }
+    });
   };

@@ .. @@
   const socialLinks = [
-    { icon: Facebook, href: '#', color: 'hover:text-blue-600' },
-    { icon: Instagram, href: '#', color: 'hover:text-pink-600' },
-    { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
+    { icon: Facebook, href: 'https://facebook.com/mahaganapati', color: 'hover:text-blue-600', label: 'Facebook' },
+    { icon: MessageCircle, href: 'https://wa.me/919787116802', color: 'hover:text-green-600', label: 'WhatsApp' },
   ];

@@ .. @@
                 {socialLinks.map((social, index) => {
                   const IconComponent = social.icon;
                   return (
                     <a
                       key={index}
                       href={social.href}
+                      target="_blank"
+                      rel="noopener noreferrer"
+                      title={social.label}
                       className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                     >
                       <IconComponent className="h-6 w-6" />