import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { LessonProvider } from './lib/LessonContext'
import { AuthProvider } from './lib/AuthContext'
import { SubscriptionProvider } from './lib/SubscriptionContext'
import { NotificationProvider } from './lib/notificationContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SubscriptionProvider>
          <NotificationProvider>
            <LessonProvider>
              <App />
            </LessonProvider>
          </NotificationProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
