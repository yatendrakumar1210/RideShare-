import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Car,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  PlusCircle
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useRideShare } from "../context/RideShareContext";

const PublishRides = () => {
  const { currentUser, publishRide } = useRideShare();

  // Form Fields
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [seatsTotal, setSeatsTotal] = useState("4");
  const [vehicleInfo, setVehicleInfo] = useState(
    currentUser?.vehicle
      ? `${currentUser.vehicle.make} ${currentUser.vehicle.model} (${currentUser.vehicle.color})`
      : ""
  );
  const [description, setDescription] = useState("");

  // UI States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!from.trim() || !to.trim() || !date || !time || !price) {
      setError("Please fill out all required fields.");
      return;
    }

    if (from.toLowerCase().trim() === to.toLowerCase().trim()) {
      setError("Departure and arrival destinations cannot be the same.");
      return;
    }

    if (Number(price) <= 0) {
      setError("Please specify a valid positive pricing per seat.");
      return;
    }

    setLoading(true);

    try {
      // Simulate submission delay
      setTimeout(() => {
        try {
          publishRide({
            from: from.trim(),
            to: to.trim(),
            date,
            time,
            price: Number(price),
            seatsTotal: Number(seatsTotal),
            vehicleInfo: vehicleInfo.trim(),
            description: description.trim(),
          });
          setLoading(false);
          setSuccess(true);
        } catch (err) {
          setError(err.message || "Failed to publish ride.");
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      setError("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar />

        <div className="max-w-3xl mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
              <PlusCircle className="w-8 h-8 text-emerald-600" />
              Offer a Ride
            </h1>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Share your empty car seats with travelers heading your way and offset your fuel expenses.
            </p>
          </div>

          {!currentUser ? (
            /* Unauthenticated state warning */
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm space-y-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-lg font-bold text-slate-800">Authentication Required</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  You must be logged in to publish a ride offer. Log in to your existing account or sign up to get started.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition"
                >
                  Log In Account
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          ) : success ? (
            /* Success Response State */
            <div className="bg-white border border-slate-150 rounded-3xl p-8 text-center shadow-md space-y-6 animate-fade-in-up">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-2xl font-black text-slate-800">Trip Published!</h3>
                <p className="text-slate-500 text-sm">
                  Your ride from <span className="font-bold text-slate-700">{from}</span> to{" "}
                  <span className="font-bold text-slate-700">{to}</span> is now active. Passengers searching this route can view and book your trip.
                </p>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/myRides"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition"
                >
                  Go to My Rides
                </Link>
                <button
                  onClick={() => {
                    setFrom("");
                    setTo("");
                    setDate("");
                    setTime("");
                    setPrice("");
                    setSeatsTotal("4");
                    setDescription("");
                    setSuccess(false);
                  }}
                  className="px-6 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Publish Another Ride
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6 animate-fade-in-up">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Route Destinations */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* From */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Leaving From
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                      </div>
                      <input
                        type="text"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        placeholder="e.g. New York"
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* To */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Arriving At
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4 text-sky-500" />
                      </div>
                      <input
                        type="text"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        placeholder="e.g. Boston"
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Departure Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4 text-amber-500" />
                      </div>
                      <input
                        type="date"
                        value={date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 cursor-pointer"
                        required
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Departure Time
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Clock className="w-4 h-4 text-emerald-500" />
                      </div>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 cursor-pointer"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Seats & Price */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Price per seat ($)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 25"
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200"
                        required
                      />
                    </div>
                  </div>

                  {/* Seats dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Available Passenger Seats
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Users className="w-4 h-4 text-slate-400" />
                      </div>
                      <select
                        value={seatsTotal}
                        onChange={(e) => setSeatsTotal(e.target.value)}
                        className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? "seat" : "seats"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Vehicle Details */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Vehicle Info (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Car className="w-4 h-4 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={vehicleInfo}
                      onChange={(e) => setVehicleInfo(e.target.value)}
                      placeholder="e.g. White Tesla Model 3"
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Help passengers identify your vehicle at pickup points.
                  </p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Trip Rules & Notes (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="e.g. Non-smoking ride. Space for one large suitcase per traveler. Friendly chat welcomed!"
                      rows="3"
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200 resize-y"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-4 mt-2 rounded-xl text-sm"
                  isLoading={loading}
                >
                  Publish Trip Offer
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PublishRides;
