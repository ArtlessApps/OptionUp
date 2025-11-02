/**
 * Supabase Client Configuration
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if credentials are configured (not placeholder values)
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your_') && 
  !supabaseAnonKey.includes('your_') &&
  supabaseUrl.startsWith('http');

if (!isConfigured) {
  console.warn('Supabase credentials not configured. Auth features will be disabled.');
  console.warn('To enable auth, set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
}

// Use placeholder URL if not configured (prevents errors but auth won't work)
const url = isConfigured ? supabaseUrl : 'https://placeholder.supabase.co';
const key = isConfigured ? supabaseAnonKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

export const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: isConfigured,
    persistSession: isConfigured,
    detectSessionInUrl: isConfigured,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          total_xp: number;
          completed_lessons: string[];
          lesson_progress: Record<string, any>;
          current_streak: number;
          last_activity_date: string | null;
          badges: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          total_xp?: number;
          completed_lessons?: string[];
          lesson_progress?: Record<string, any>;
          current_streak?: number;
          last_activity_date?: string | null;
          badges?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          total_xp?: number;
          completed_lessons?: string[];
          lesson_progress?: Record<string, any>;
          current_streak?: number;
          last_activity_date?: string | null;
          badges?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid';
          plan: 'monthly' | 'yearly';
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid';
          plan?: 'monthly' | 'yearly';
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid';
          plan?: 'monthly' | 'yearly';
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

