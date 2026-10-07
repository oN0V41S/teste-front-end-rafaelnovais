import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-700.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/global.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
