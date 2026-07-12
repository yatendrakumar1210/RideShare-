import React from "react";
import { Link } from "react-router-dom";
import { Compass, Home, Car } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar />

        <div className="max-w-md mx-auto px-6 py-20 text-center space-y-6 animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs border border-emerald-100 animate-pulse">
            <Compass className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-black text-slate-800 tracking-tight">404</h1>
            <h3 className="text-xl font-bold text-slate-700">Lost on the road?</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              We couldn't find the page you are looking for. Let's redirect you back to a safe route.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              to="/"
              className="flex-grow flex items-center justify-center gap-1.5 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition"
            >
              <Home className="w-4 h-4" />
              Go to Home Page
            </Link>
            <Link
              to="/rideDetails"
              className="flex-grow flex items-center justify-center gap-1.5 px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition"
            >
              <Car className="w-4 h-4" />
              Search for Rides
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
