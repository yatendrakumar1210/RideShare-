import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { RideShareProvider } from './context/RideShareContext'

const App = () => {
  return (
    <RideShareProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RideShareProvider>
  );
}

export default App
