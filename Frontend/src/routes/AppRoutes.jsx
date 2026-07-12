import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from '../pages/Home'
import Register from '../pages/Register'
import MyBookings from '../pages/MyBookings'
import MyRides from '../pages/MyRides'
import Profile from '../pages/Profile'
import PublishRides from '../pages/PublishRides'
import RideDetails from '../pages/RideDetails'
import About from '../pages/About'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/myBookings" element={<MyBookings/>}/>
      <Route path="/myRides" element={<MyRides/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/publishRide" element={<PublishRides/>}/>
      <Route path="/rideDetails" element={<RideDetails/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default AppRoutes
