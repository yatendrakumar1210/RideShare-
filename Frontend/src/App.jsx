import React from 'react'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>

  );
}

export default App
