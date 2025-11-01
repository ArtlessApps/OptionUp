/**
 * Paywall Screen - Shown when user tries to access locked content
 */

import { motion } from 'framer-motion';

interface PaywallScreenProps {
  onUpgrade: () => void;
  onBack: () => void;
  lessonTitle?: string;
}

export function PaywallScreen({ onUpgrade, onBack, lessonTitle }: PaywallScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Lock Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-warning to-yellow-500 rounded-full flex items-center justify-center text-white text-4xl">
              🔒
            </div>
          </motion.div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Premium Content
          </h2>
          {lessonTitle && (
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">{lessonTitle}</span> is part of our premium curriculum
            </p>
          )}
          <p className="text-gray-600 mb-6">
            Upgrade to OptionUp Premium to access all 76+ lessons, advanced strategies, and expert insights.
          </p>

          {/* Quick Benefits */}
          <div className="bg-primary-50 rounded-2xl p-4 mb-6 text-left">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <span>All 76+ lessons unlocked</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <span>Advanced strategies & The Greeks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <span>Real trade case studies</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="text-green-600 font-bold">✓</span>
                <span>Portfolio management lessons</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                $9.99<span className="text-lg text-gray-500">/month</span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                or save 33% with yearly plan ($79.99/year)
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={onUpgrade}
              className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-2xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg"
            >
              Upgrade to Premium
            </button>
            <button
              onClick={onBack}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Back to Free Lessons
            </button>
          </div>

          {/* Trust Signal */}
          <p className="text-xs text-gray-500 mt-4">
            Cancel anytime • Secure payment
          </p>
        </div>
      </motion.div>
    </div>
  );
}

