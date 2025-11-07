/**
 * Error Message Utilities
 * Transforms technical errors into user-friendly messages
 */

export interface FriendlyError {
  title: string;
  message: string;
  action?: string;
  actionLabel?: string;
  severity?: 'error' | 'warning' | 'info';
}

/**
 * Map authentication errors to user-friendly messages
 */
export function getAuthErrorMessage(error: Error | null): FriendlyError {
  if (!error) {
    return {
      title: 'Something went wrong',
      message: 'An unexpected error occurred. Please try again.',
      severity: 'error',
    };
  }

  const message = error.message.toLowerCase();

  // Invalid credentials
  if (message.includes('invalid login credentials') || message.includes('invalid password')) {
    return {
      title: 'Incorrect credentials',
      message: 'The email or password you entered is incorrect. Please check and try again.',
      severity: 'error',
    };
  }

  // Email already exists
  if (message.includes('user already registered') || message.includes('already exists')) {
    return {
      title: 'Account exists',
      message: 'An account with this email already exists. Try signing in instead.',
      action: 'switch-to-signin',
      actionLabel: 'Go to Sign In',
      severity: 'warning',
    };
  }

  // Weak password
  if (message.includes('password') && (message.includes('short') || message.includes('weak') || message.includes('6 characters'))) {
    return {
      title: 'Weak password',
      message: 'Please choose a stronger password with at least 6 characters.',
      severity: 'warning',
    };
  }

  // Email not confirmed
  if (message.includes('email not confirmed') || message.includes('verify your email')) {
    return {
      title: 'Email not verified',
      message: 'Please check your email and click the confirmation link before signing in.',
      severity: 'info',
    };
  }

  // Rate limit
  if (message.includes('too many requests') || message.includes('rate limit')) {
    return {
      title: 'Too many attempts',
      message: 'Please wait a moment before trying again.',
      severity: 'warning',
    };
  }

  // Network errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection') ||
    message.includes('timeout')
  ) {
    return {
      title: 'Connection issue',
      message: "We're having trouble connecting. Please check your internet connection and try again.",
      severity: 'error',
    };
  }

  // Invalid email format
  if (message.includes('invalid email') || message.includes('email format')) {
    return {
      title: 'Invalid email',
      message: 'Please enter a valid email address.',
      severity: 'warning',
    };
  }

  // Default fallback
  return {
    title: 'Unable to sign in',
    message: 'Something went wrong. Please try again or contact support if the problem persists.',
    severity: 'error',
  };
}

/**
 * Map payment/subscription errors to user-friendly messages
 */
export function getPaymentErrorMessage(error: Error | null): FriendlyError {
  if (!error) {
    return {
      title: 'Payment error',
      message: 'Something went wrong. Please try again.',
      severity: 'error',
    };
  }

  const message = error.message.toLowerCase();

  // Authentication required
  if (message.includes('sign in') || message.includes('not authenticated') || message.includes('unauthorized')) {
    return {
      title: 'Sign in required',
      message: 'Please sign in to continue with your upgrade.',
      action: 'sign-in',
      actionLabel: 'Sign In',
      severity: 'info',
    };
  }

  // Network errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection') ||
    message.includes('timeout')
  ) {
    return {
      title: 'Connection issue',
      message: "We couldn't connect to our payment processor. Please check your connection and try again.",
      severity: 'error',
    };
  }

  // Stripe-specific errors
  if (message.includes('stripe') || message.includes('checkout')) {
    return {
      title: 'Payment setup failed',
      message: "We couldn't set up the payment page. Please try again in a moment.",
      severity: 'error',
    };
  }

  // Card errors (if we ever see them)
  if (message.includes('card') || message.includes('payment method')) {
    return {
      title: 'Payment method issue',
      message: 'There was a problem with your payment method. Please try a different card.',
      severity: 'error',
    };
  }

  // Subscription already exists
  if (message.includes('already subscribed') || message.includes('active subscription')) {
    return {
      title: 'Already subscribed',
      message: 'You already have an active subscription. Thank you!',
      severity: 'info',
    };
  }

  // Default fallback
  return {
    title: 'Unable to process payment',
    message: 'Something went wrong on our end. Please try again or contact support at support@optionup.com if the issue persists.',
    severity: 'error',
  };
}

/**
 * Map cloud sync errors to user-friendly messages
 */
export function getSyncErrorMessage(error: Error | null): FriendlyError {
  if (!error) {
    return {
      title: 'Sync issue',
      message: 'Your progress is saved locally but couldn\'t sync to the cloud.',
      severity: 'warning',
    };
  }

  const message = error.message.toLowerCase();

  // Network errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection') ||
    message.includes('timeout')
  ) {
    return {
      title: 'Sync delayed',
      message: 'Your progress is saved locally. We\'ll sync to the cloud when your connection is restored.',
      severity: 'info',
    };
  }

  // Permission errors
  if (message.includes('permission') || message.includes('unauthorized')) {
    return {
      title: 'Sync requires sign in',
      message: 'Please sign in to sync your progress across devices.',
      action: 'sign-in',
      actionLabel: 'Sign In',
      severity: 'info',
    };
  }

  // Default
  return {
    title: 'Sync temporarily unavailable',
    message: 'Your progress is saved locally. We\'ll try syncing again automatically.',
    severity: 'info',
  };
}

/**
 * Map lesson loading errors to user-friendly messages
 */
export function getLessonErrorMessage(error: Error | null): FriendlyError {
  if (!error) {
    return {
      title: 'Couldn\'t load lesson',
      message: 'Please try again.',
      severity: 'error',
    };
  }

  const message = error.message.toLowerCase();

  // Network errors
  if (
    message.includes('network') ||
    message.includes('fetch') ||
    message.includes('connection') ||
    message.includes('timeout')
  ) {
    return {
      title: 'Connection issue',
      message: 'We couldn\'t load this lesson. Please check your connection and try again.',
      action: 'retry',
      actionLabel: 'Try Again',
      severity: 'error',
    };
  }

  // Not found
  if (message.includes('not found') || message.includes('404')) {
    return {
      title: 'Lesson not found',
      message: 'This lesson might have been moved or removed.',
      severity: 'error',
    };
  }

  // Default
  return {
    title: 'Couldn\'t load lesson',
    message: 'Something went wrong. Please try again.',
    action: 'retry',
    actionLabel: 'Try Again',
    severity: 'error',
  };
}

