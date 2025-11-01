import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LessonProvider } from './lib/LessonContext'
import { AuthProvider } from './lib/AuthContext'
import { SubscriptionProvider } from './lib/SubscriptionContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <SubscriptionProvider>
        <LessonProvider>
          <App />
        </LessonProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </StrictMode>,
)
