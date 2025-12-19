import React from 'react'
import './index.css'; 
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' 
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AQUI ESTÁ O SEGREDO: Adicione o basename com o nome do repositório */}
    <ThemeProvider>
      <BrowserRouter basename="/tocando-pra-valer3.0">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)