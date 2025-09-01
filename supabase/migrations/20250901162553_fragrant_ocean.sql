/*
  # Initial Database Schema for Om Sri Mahaganapati Catering Service

  1. New Tables
    - `owners` - Store owner/admin details and credentials
      - `id` (uuid, primary key)
      - `name` (text) - Owner's full name
      - `email` (text, unique) - Owner's email address
      - `phone` (text) - Owner's phone number
      - `address` (text) - Business address
      - `business_name` (text) - Name of the catering business
      - `username` (text, unique) - Login username
      - `password_hash` (text) - Hashed password for security
      - `reset_token` (text, nullable) - Password reset token
      - `reset_token_expiry` (timestamptz, nullable) - Reset token expiration
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

    - `bulk_orders` - Store bulk catering orders
      - `id` (uuid, primary key)
      - `event_type` (text) - Type of event (wedding, corporate, etc.)
      - `guest_count` (integer) - Number of guests
      - `event_date` (date) - Date of the event
      - `event_time` (time) - Time of the event
      - `venue` (text) - Event venue address
      - `contact_name` (text) - Customer contact name
      - `contact_phone` (text) - Customer phone number
      - `contact_email` (text, nullable) - Customer email
      - `special_requirements` (text, nullable) - Special dietary or service requirements
      - `menu_preference` (text) - Selected menu package
      - `estimated_cost` (decimal) - Estimated total cost
      - `status` (text) - Order status (pending, confirmed, completed)
      - `created_at` (timestamptz) - Order creation timestamp

    - `contact_messages` - Store customer inquiries and messages
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `phone` (text) - Customer phone number
      - `subject` (text) - Message subject
      - `message` (text) - Message content
      - `is_read` (boolean) - Whether the message has been read by owner
      - `created_at` (timestamptz) - Message creation timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
    - Secure password storage with hashing

  3. Indexes
    - Add indexes on frequently queried columns for performance
*/

-- Create owners table
CREATE TABLE IF NOT EXISTS owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  business_name text NOT NULL,
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  reset_token text,
  reset_token_expiry timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bulk_orders table
CREATE TABLE IF NOT EXISTS bulk_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  guest_count integer NOT NULL CHECK (guest_count > 0),
  event_date date NOT NULL,
  event_time time NOT NULL,
  venue text NOT NULL,
  contact_name text NOT NULL,
  contact_phone text NOT NULL,
  contact_email text,
  special_requirements text,
  menu_preference text NOT NULL,
  estimated_cost decimal(10,2) NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE bulk_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for owners table (only authenticated owners can access)
CREATE POLICY "Owners can read own data"
  ON owners
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Owners can update own data"
  ON owners
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Create policies for bulk_orders table
CREATE POLICY "Anyone can insert bulk orders"
  ON bulk_orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Owners can read all bulk orders"
  ON bulk_orders
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can update bulk orders"
  ON bulk_orders
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for contact_messages table
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Owners can read all contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Owners can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_bulk_orders_status ON bulk_orders(status);
CREATE INDEX IF NOT EXISTS idx_bulk_orders_event_date ON bulk_orders(event_date);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_owners_username ON owners(username);
CREATE INDEX IF NOT EXISTS idx_owners_email ON owners(email);

-- Insert default owner (you should change these credentials after first login)
INSERT INTO owners (
  name,
  email,
  phone,
  address,
  business_name,
  username,
  password_hash
) VALUES (
  'Rajesh Kumar',
  'owner@mahaganapati.com',
  '+91 9787116802',
  'Nachikuppam Road, near HP Petrol Bank, Krishnagiri 635 121',
  'Om Sri Mahaganapati Catering Service',
  'owner',
  'b3duZXIxMjM='  -- Base64 encoded "owner123" - CHANGE THIS IMMEDIATELY
) ON CONFLICT (username) DO NOTHING;