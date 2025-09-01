export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
}

export interface Order {
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

export interface BulkOrder {
  id: string;
  eventType: string;
  guestCount: number;
  eventDate: string;
  eventTime: string;
  venue: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialRequirements: string;
  menuPreference: string;
  estimatedCost: number;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface OwnerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  businessName: string;
  username: string;
  passwordHash: string;
  resetToken?: string;
  resetTokenExpiry?: string;
}