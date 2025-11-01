import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LessonProvider } from './lib/LessonContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LessonProvider>
      <App />
    </LessonProvider>
  </StrictMode>,
)
