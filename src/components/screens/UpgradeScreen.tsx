/**
 * Upgrade Screen - Premium subscription purchase
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../lib/AuthContext';
import { getPaymentErrorMessage, type FriendlyError } from '../../lib/errorMessages';
import { ErrorNotification } from '../common/ErrorNotification';

interface UpgradeScreenProps {
  onClose: () => void;
}

type Plan = 'monthly' | 'yearly';

export function UpgradeScreen({ onClose }: UpgradeScreenProps) {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<FriendlyError | null>(null);

  const handleUpgrade = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!user) {
        setError(getPaymentErrorMessage(new Error('not authenticated')));
        setIsLoading(false);
        return;
      }

      // Call backend API to create checkout session
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/create-checkout-session`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          plan: selectedPlan,
          userId: user.id,
          email: user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { sessionId, url } = await response.json();

      // Redirect to Stripe Checkout
      if (url) {
        // Direct redirect (simpler)
        window.location.href = url;
      } else if (sessionId) {
        // Use Stripe.js to redirect (alternative)
        window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
      }
      
    } catch (err) {
      console.error('Checkout error:', err);
      setError(getPaymentErrorMessage(err instanceof Error ? err : null));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Upgrade to Premium</h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Hero */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Master Options Trading
            </h2>
            <p className="text-gray-600">
              Get unlimited access to all 76+ lessons and advanced strategies
            </p>
          </div>

          {/* Plan Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                selectedPlan === 'monthly'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {selectedPlan === 'monthly' && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="text-sm font-semibold text-gray-600 mb-2">Monthly</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                $9.99
                <span className="text-lg text-gray-500">/mo</span>
              </div>
              <div className="text-sm text-gray-500">Billed monthly</div>
            </button>

            {/* Yearly Plan */}
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                selectedPlan === 'yearly'
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="absolute -top-3 right-4">
                <span className="px-3 py-1 bg-gradient-to-r from-warning to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                  SAVE 33%
                </span>
              </div>
              {selectedPlan === 'yearly' && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="text-sm font-semibold text-gray-600 mb-2">Yearly</div>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                $79.99
                <span className="text-lg text-gray-500">/yr</span>
              </div>
              <div className="text-sm text-gray-500">$6.67/mo • Save $40</div>
            </button>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">What's included:</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">All 76+ Lessons</div>
                  <div className="text-sm text-gray-600">
                    Complete curriculum from basics to advanced strategies
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">The Greeks Mastery</div>
                  <div className="text-sm text-gray-600">
                    Delta, gamma, theta, vega explained with real examples
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">Advanced Strategies</div>
                  <div className="text-sm text-gray-600">
                    Iron condors, butterflies, calendars, and more
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">Real Trade Case Studies</div>
                  <div className="text-sm text-gray-600">
                    Learn from actual winning and losing trades
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">Portfolio Management</div>
                  <div className="text-sm text-gray-600">
                    Risk management, position sizing, and tax strategies
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-green-600 text-xl flex-shrink-0">✓</span>
                <div>
                  <div className="font-semibold text-gray-900">Progress Syncing</div>
                  <div className="text-sm text-gray-600">
                    Your progress saved across all devices
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <ErrorNotification 
              error={error} 
              onDismiss={() => setError(null)}
            />
          )}

          {/* CTA Button */}
          <button
            onClick={handleUpgrade}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            {isLoading ? 'Processing...' : `Subscribe - ${selectedPlan === 'monthly' ? '$9.99/mo' : '$79.99/yr'}`}
          </button>

          {/* Fine Print */}
          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              Cancel anytime. No refunds for partial months or years.
            </p>
            <p className="text-xs text-gray-600">
              Need help? Contact us at <a href="mailto:support@optionup.com" className="text-primary-600 hover:text-primary-700 font-semibold">support@optionup.com</a>
            </p>
          </div>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure Payment
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Cancel Anytime
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

