import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Seus imports de estilo
import { BrowserRouter } from 'react-router-dom' // Importante verificar esse import

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* AQUI ESTÁ O SEGREDO: Adicione o basename com o nome do repositório */}
    <BrowserRouter basename="/tocando-pra-valer3.0">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)