/*
  # Initial Schema Setup for Rewards Platform

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - username (text)
      - coins_balance (integer)
      - last_daily_claim (timestamp)
      - created_at (timestamp)
    
    - products
      - id (uuid)
      - name (text)
      - description (text)
      - coin_price (integer)
      - image_url (text)
      - stock (integer)
      - created_at (timestamp)
    
    - giveaways
      - id (uuid)
      - title (text)
      - description (text)
      - coin_cost (integer)
      - end_date (timestamp)
      - winner_id (uuid, references profiles)
      - created_at (timestamp)
    
    - giveaway_entries
      - id (uuid)
      - giveaway_id (uuid, references giveaways)
      - user_id (uuid, references profiles)
      - created_at (timestamp)
    
    - referrals
      - id (uuid)
      - referrer_id (uuid, references profiles)
      - referred_id (uuid, references profiles)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  username text UNIQUE NOT NULL,
  coins_balance integer DEFAULT 0,
  last_daily_claim timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  coin_price integer NOT NULL,
  image_url text,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create giveaways table
CREATE TABLE giveaways (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  coin_cost integer NOT NULL,
  end_date timestamptz NOT NULL,
  winner_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now()
);

-- Create giveaway entries table
CREATE TABLE giveaway_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  giveaway_id uuid REFERENCES giveaways(id) NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(giveaway_id, user_id)
);

-- Create referrals table
CREATE TABLE referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES profiles(id) NOT NULL,
  referred_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(referred_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE giveaways ENABLE ROW LEVEL SECURITY;
ALTER TABLE giveaway_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO authenticated
  USING (true);

-- Giveaways policies
CREATE POLICY "Anyone can view giveaways"
  ON giveaways FOR SELECT
  TO authenticated
  USING (true);

-- Giveaway entries policies
CREATE POLICY "Users can view their own entries"
  ON giveaway_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own entries"
  ON giveaway_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view their referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = referrer_id);

CREATE POLICY "Users can create referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = referrer_id);
