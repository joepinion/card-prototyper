import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CardPrototyper from './CardPrototyper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardPrototyper />
  </StrictMode>,
)
