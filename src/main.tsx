import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext'
import { ViewProvider } from './context/ViewContext'
import './styles/globals.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ViewProvider>
        <App />
      </ViewProvider>
    </AuthProvider>
  </StrictMode>,
)
