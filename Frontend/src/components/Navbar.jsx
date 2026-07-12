import React, { useState } from "react";
import { Car, Menu, X, LogOut, User as UserIcon, Calendar, Compass, PlusCircle, Bookmark } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRideShare } from "../context/RideShareContext";

const Navbar = () => {
  const { currentUser, logoutUser } = useRideShare();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-1.5 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? "text-emerald-600 bg-emerald-50/50 font-semibold"
        : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
    }`;

  const mobileNavLinkStyle = ({ isActive }) =>
    `flex items-center gap-2 py-3 px-4 text-base font-semibold rounded-xl transition ${
      isActive
        ? "text-emerald-600 bg-emerald-50/80 font-bold"
        : "text-slate-700 hover:text-emerald-600 hover:bg-slate-50"
    }`;

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 cursor-pointer select-none">
          <div className="bg-emerald-100 p-1.5 rounded-xl">
            <Car className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Ride<span className="text-emerald-600">Share</span>
          </h1>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/rideDetails" className={navLinkStyle}>
            <Compass className="w-4 h-4" />
            Find Ride
          </NavLink>

          <NavLink to="/publishRide" className={navLinkStyle}>
            <PlusCircle className="w-4 h-4" />
            Offer Ride
          </NavLink>

          {currentUser && (
            <>
              <NavLink to="/myRides" className={navLinkStyle}>
                <Calendar className="w-4 h-4" />
                My Rides
              </NavLink>
              <NavLink to="/myBookings" className={navLinkStyle}>
                <Bookmark className="w-4 h-4" />
                My Bookings
              </NavLink>
            </>
          )}
          <NavLink to="/about" className={navLinkStyle}>
            About
          </NavLink>
        </div>

        {/* Right Action Area */}
        <div className="hidden md:flex items-center gap-4">
          {currentUser ? (
            <div className="relative">
              {/* User Avatar & Dropdown Trigger */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:shadow-xs transition duration-200 bg-white cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {currentUser.avatar}
                </div>
                <span className="text-sm font-semibold text-slate-700 max-w-[120px] truncate">
                  {currentUser.name}
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2.5 z-20 animate-fade-in-up">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1.5">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <NavLink
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      My Profile
                    </NavLink>

                    <NavLink
                      to="/myBookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      My Bookings
                    </NavLink>

                    <NavLink
                      to="/myRides"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Calendar className="w-4 h-4 text-slate-400" />
                      My Rides
                    </NavLink>

                    <hr className="border-slate-100 my-1.5" />

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:font-semibold transition cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <NavLink
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-600 transition"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="px-5 py-2.5 text-sm font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition duration-200 cursor-pointer"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-5 space-y-4 animate-fade-in-up">
          <div className="space-y-1.5">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/rideDetails" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
              Find Ride
            </NavLink>
            <NavLink to="/publishRide" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
              Offer Ride
            </NavLink>
            {currentUser && (
              <>
                <NavLink to="/myRides" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
                  My Rides
                </NavLink>
                <NavLink to="/myBookings" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
                  My Bookings
                </NavLink>
                <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
                  My Profile
                </NavLink>
              </>
            )}
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className={mobileNavLinkStyle}>
              About
            </NavLink>
          </div>

          <hr className="border-slate-100" />

          {currentUser ? (
            <div className="space-y-4 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                  {currentUser.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-bold transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 px-4">
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center font-bold border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl transition"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
