import { supabase } from '../lib/supabase';
import { BulkOrder, ContactMessage } from '../types';

export class OrderService {
  static async submitBulkOrder(orderData: Omit<BulkOrder, 'id' | 'status' | 'createdAt'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('bulk_orders')
        .insert({
          event_type: orderData.eventType,
          guest_count: orderData.guestCount,
          event_date: orderData.eventDate,
          event_time: orderData.eventTime,
          venue: orderData.venue,
          contact_name: orderData.contactName,
          contact_phone: orderData.contactPhone,
          contact_email: orderData.contactEmail,
          special_requirements: orderData.specialRequirements,
          menu_preference: orderData.menuPreference,
          estimated_cost: orderData.estimatedCost,
          status: 'pending'
        });

      return !error;
    } catch (error) {
      console.error('Submit bulk order error:', error);
      return false;
    }
  }

  static async submitContactMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: messageData.name,
          email: messageData.email,
          phone: messageData.phone,
          subject: messageData.subject,
          message: messageData.message,
          is_read: false
        });

      return !error;
    } catch (error) {
      console.error('Submit contact message error:', error);
      return false;
    }
  }

  static async getBulkOrders(): Promise<BulkOrder[]> {
    try {
      const { data, error } = await supabase
        .from('bulk_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(item => ({
        id: item.id,
        eventType: item.event_type,
        guestCount: item.guest_count,
        eventDate: item.event_date,
        eventTime: item.event_time,
        venue: item.venue,
        contactName: item.contact_name,
        contactPhone: item.contact_phone,
        contactEmail: item.contact_email,
        specialRequirements: item.special_requirements,
        menuPreference: item.menu_preference,
        estimatedCost: item.estimated_cost,
        status: item.status,
        createdAt: item.created_at
      }));
    } catch (error) {
      console.error('Get bulk orders error:', error);
      return [];
    }
  }

  static async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
        subject: item.subject,
        message: item.message,
        createdAt: item.created_at,
        isRead: item.is_read
      }));
    } catch (error) {
      console.error('Get contact messages error:', error);
      return [];
    }
  }

  static async markMessageAsRead(messageId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', messageId);

      return !error;
    } catch (error) {
      console.error('Mark message as read error:', error);
      return false;
    }
  }
}