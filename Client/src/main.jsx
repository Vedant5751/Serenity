import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx' // Ensure this path is correct
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
