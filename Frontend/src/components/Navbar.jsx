import React from "react";
import { Car } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinkStyle = ({ isActive }) =>
    `transition hover:text-green-600 ${
      isActive ? "text-green-600 font-semibold" : "text-gray-700"
    }`;

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer">
          <Car className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-800">
            Ride<span className="text-green-600">Share</span>
          </h1>
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/rideDetails" className={navLinkStyle}>
            Find Ride
          </NavLink>

          <NavLink to="/publishRide" className={navLinkStyle}>
            Offer Ride
          </NavLink>

          <NavLink to="/myRides" className={navLinkStyle}>
            My Rides
          </NavLink>

          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/login"
            className="px-5 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 transition"
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
