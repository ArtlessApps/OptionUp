/**
 * Error Notification Component
 * Reusable error display with consistent styling and optional actions
 */

import { motion, AnimatePresence } from 'framer-motion';
import type { FriendlyError } from '../../lib/errorMessages';

interface ErrorNotificationProps {
  error: FriendlyError | null;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorNotification({ error, onAction, onDismiss, className = '' }: ErrorNotificationProps) {
  if (!error) return null;

  const icons = {
    error: '⚠️',
    warning: '⚠️',
    info: 'ℹ️',
  };

  const bgColors = {
    error: 'bg-red-50 border-red-200',
    warning: 'bg-yellow-50 border-yellow-200',
    info: 'bg-blue-50 border-blue-200',
  };

  const textColors = {
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800',
  };

  const buttonColors = {
    error: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    info: 'bg-blue-600 hover:bg-blue-700 text-white',
  };

  const severity = error.severity || 'error';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`p-4 rounded-xl border-2 ${bgColors[severity]} ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{icons[severity]}</span>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold ${textColors[severity]} mb-1`}>
            {error.title}
          </h3>
          <p className={`text-sm ${textColors[severity]}`}>
            {error.message}
          </p>
          
          {error.action && error.actionLabel && onAction && (
            <button
              onClick={onAction}
              className={`mt-3 px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${buttonColors[severity]}`}
            >
              {error.actionLabel}
            </button>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors ${textColors[severity]}`}
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Toast Notification - For non-intrusive background errors
 */
interface ToastNotificationProps {
  error: FriendlyError | null;
  onDismiss: () => void;
  duration?: number; // Auto-dismiss after duration (ms)
}

export function ToastNotification({ error, onDismiss, duration = 5000 }: ToastNotificationProps) {
  // Auto-dismiss after duration
  React.useEffect(() => {
    if (error && duration > 0) {
      const timer = setTimeout(onDismiss, duration);
      return () => clearTimeout(timer);
    }
  }, [error, duration, onDismiss]);

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 max-w-md shadow-2xl"
        >
          <ErrorNotification error={error} onDismiss={onDismiss} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Import React for useEffect
import React from 'react';

