/**
 * Notification Context - Manages toast notifications for background errors
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { ToastNotification } from '../components/common/ErrorNotification';
import type { FriendlyError } from './errorMessages';

interface NotificationContextType {
  showNotification: (error: FriendlyError) => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [currentNotification, setCurrentNotification] = useState<FriendlyError | null>(null);

  const showNotification = useCallback((error: FriendlyError) => {
    setCurrentNotification(error);
  }, []);

  const clearNotification = useCallback(() => {
    setCurrentNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification, clearNotification }}>
      {children}
      <ToastNotification 
        error={currentNotification} 
        onDismiss={clearNotification}
        duration={5000}
      />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

