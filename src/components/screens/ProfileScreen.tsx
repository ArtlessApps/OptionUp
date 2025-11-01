/**
 * Profile Screen - User profile with subscription management
 */

import { motion } from 'framer-motion';
import { useAuth } from '../../lib/AuthContext';
import { useSubscription } from '../../lib/SubscriptionContext';
import { useLessons } from '../../lib/LessonContext';

interface ProfileScreenProps {
  onClose: () => void;
  onUpgrade?: () => void;
}

export function ProfileScreen({ onClose, onUpgrade }: ProfileScreenProps) {
  const { user, signOut } = useAuth();
  const { subscription, hasActiveSubscription } = useSubscription();
  const { totalXP, currentStreak, completedLessons, totalLessons, completionPercentage } = useLessons();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getSubscriptionBadge = () => {
    if (hasActiveSubscription) {
      return (
        <span className="px-3 py-1 bg-gradient-to-r from-warning to-yellow-500 text-white text-xs font-bold rounded-full">
          ⭐ PREMIUM
        </span>
      );
    }
    return (
      <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
        FREE
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
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
          {/* User Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.email?.[0].toUpperCase() || '?'}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{user?.email}</h2>
                <div className="mt-1">{getSubscriptionBadge()}</div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-warning/10 rounded-xl">
                <div className="text-3xl font-bold text-warning">{totalXP}</div>
                <div className="text-sm text-gray-600 mt-1">Total XP</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <div className="text-3xl font-bold text-red-600">{currentStreak}</div>
                <div className="text-sm text-gray-600 mt-1">Day Streak 🔥</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600">{completedLessons}</div>
                <div className="text-sm text-gray-600 mt-1">Lessons Done</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">{completionPercentage}%</div>
                <div className="text-sm text-gray-600 mt-1">Complete</div>
              </div>
            </div>
          </div>

          {/* Subscription Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Subscription</h3>
            
            {hasActiveSubscription ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Plan</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {subscription.plan === 'monthly' ? '$9.99/month' : '$79.99/year'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Renews on</span>
                  <span className="font-semibold text-gray-900">
                    {formatDate(subscription.currentPeriodEnd)}
                  </span>
                </div>
                {subscription.cancelAtPeriodEnd && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Your subscription will end on {formatDate(subscription.currentPeriodEnd)}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => window.open('https://billing.stripe.com/p/login/test_placeholder', '_blank')}
                  className="w-full mt-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Manage Subscription
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600">
                  You're on the free plan. Upgrade to access all {totalLessons} lessons and advanced features!
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Access all 76+ lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Advanced strategies & Greeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Real trade case studies</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span>Portfolio management lessons</span>
                  </div>
                </div>
                {onUpgrade && (
                  <button
                    onClick={onUpgrade}
                    className="w-full mt-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105"
                  >
                    Upgrade Now
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <button
              onClick={handleSignOut}
              className="w-full py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

