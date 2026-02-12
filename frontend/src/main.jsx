import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ComunaProvider } from './context/ComunaContext'
import { UnidadeProvider } from './context/UnidadeContext'
import { StockProvider } from './context/StockContext'
import './assets/style.global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComunaProvider>
      <UnidadeProvider>
        <StockProvider>
          <App />
        </StockProvider>
      </UnidadeProvider>
    </ComunaProvider>
  </StrictMode>,
)
