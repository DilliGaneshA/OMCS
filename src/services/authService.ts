import { supabase } from '../lib/supabase';
import { OwnerDetails } from '../types';

export class AuthService {
  static async login(username: string, password: string): Promise<OwnerDetails | null> {
    try {
      const { data, error } = await supabase
        .from('owners')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        throw new Error('Invalid credentials');
      }

      // In a real app, you'd verify the password hash here
      // For now, we'll do a simple comparison
      const isValidPassword = await this.verifyPassword(password, data.password_hash);
      
      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      return {
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        businessName: data.business_name,
        username: data.username,
        passwordHash: data.password_hash
      };
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  static async updateCredentials(ownerId: string, newUsername: string, newPassword: string): Promise<boolean> {
    try {
      const passwordHash = await this.hashPassword(newPassword);
      
      const { error } = await supabase
        .from('owners')
        .update({
          username: newUsername,
          password_hash: passwordHash
        })
        .eq('id', ownerId);

      return !error;
    } catch (error) {
      console.error('Update credentials error:', error);
      return false;
    }
  }

  static async requestPasswordReset(email: string): Promise<boolean> {
    try {
      const resetToken = Math.random().toString(36).substring(2, 15);
      const resetTokenExpiry = new Date(Date.now() + 3600000).toISOString(); // 1 hour

      const { error } = await supabase
        .from('owners')
        .update({
          reset_token: resetToken,
          reset_token_expiry: resetTokenExpiry
        })
        .eq('email', email);

      if (!error) {
        // In a real app, you'd send an email with the reset token
        alert(`Password reset token: ${resetToken} (In production, this would be sent via email)`);
      }

      return !error;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    }
  }

  static async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('owners')
        .select('*')
        .eq('reset_token', token)
        .gt('reset_token_expiry', new Date().toISOString())
        .single();

      if (error || !data) {
        throw new Error('Invalid or expired reset token');
      }

      const passwordHash = await this.hashPassword(newPassword);

      const { error: updateError } = await supabase
        .from('owners')
        .update({
          password_hash: passwordHash,
          reset_token: null,
          reset_token_expiry: null
        })
        .eq('id', data.id);

      return !updateError;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  }

  private static async hashPassword(password: string): Promise<string> {
    // In a real app, use bcrypt or similar
    return btoa(password); // Simple base64 encoding for demo
  }

  private static async verifyPassword(password: string, hash: string): Promise<boolean> {
    // In a real app, use bcrypt.compare
    return btoa(password) === hash; // Simple comparison for demo
  }
}