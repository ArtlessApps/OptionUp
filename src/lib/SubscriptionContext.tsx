/**
 * Subscription Context - Manages user subscription state
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import { useAuth } from './AuthContext';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'unpaid' | 'none';
export type SubscriptionPlan = 'monthly' | 'yearly' | null;

interface SubscriptionData {
  id: string | null;
  status: SubscriptionStatus;
  plan: SubscriptionPlan;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

interface SubscriptionContextType {
  subscription: SubscriptionData;
  isLoading: boolean;
  hasActiveSubscription: boolean;
  canAccessPremiumContent: boolean;
  refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

// Free tier: first 15 lessons (Module 1)
const FREE_LESSON_LIMIT = 15;

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    id: null,
    status: 'none',
    plan: null,
    currentPeriodEnd: null,
    cancelAtPeriodEnd: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadSubscription = async () => {
    if (!user) {
      setSubscription({
        id: null,
        status: 'none',
        plan: null,
        currentPeriodEnd: null,
        cancelAtPeriodEnd: false,
      });
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "no rows returned"
        console.error('Error loading subscription:', error);
      }

      if (data) {
        setSubscription({
          id: data.id,
          status: data.status,
          plan: data.plan,
          currentPeriodEnd: data.current_period_end ? new Date(data.current_period_end) : null,
          cancelAtPeriodEnd: data.cancel_at_period_end,
        });
      } else {
        setSubscription({
          id: null,
          status: 'none',
          plan: null,
          currentPeriodEnd: null,
          cancelAtPeriodEnd: false,
        });
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSubscription();
  }, [user]);

  const hasActiveSubscription = subscription.status === 'active' || subscription.status === 'trialing';
  const canAccessPremiumContent = hasActiveSubscription;

  const value = {
    subscription,
    isLoading,
    hasActiveSubscription,
    canAccessPremiumContent,
    refreshSubscription: loadSubscription,
  };

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}

// Helper function to check if a lesson requires a subscription
export function isLessonLocked(lessonNumber: number, hasActiveSubscription: boolean): boolean {
  if (hasActiveSubscription) return false;
  return lessonNumber > FREE_LESSON_LIMIT;
}

