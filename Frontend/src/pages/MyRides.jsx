import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  Users,
  Phone,
  AlertCircle,
  XCircle,
  PlusCircle,
  Info,
  Car as CarIcon
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useRideShare } from "../context/RideShareContext";

const MyRides = () => {
  const { currentUser, rides, bookings, users, cancelRide } = useRideShare();
  const [cancellingRideId, setCancellingRideId] = useState(null);

  // Filter rides offered by currentUser
  const myOfferedRides = currentUser
    ? rides.filter((r) => r.driverId === currentUser.id)
    : [];

  const handleCancelClick = (rideId) => {
    setCancellingRideId(rideId);
  };

  const confirmCancelRide = (rideId) => {
    cancelRide(rideId);
    setCancellingRideId(null);
  };

  // Helper to get active bookings for a ride
  const getRideBookings = (rideId) => {
    return bookings
      .filter((b) => b.rideId === rideId && b.status !== "cancelled")
      .map((b) => {
        const passenger = users.find((u) => u.id === b.passengerId);
        return {
          id: b.id,
          passengerName: passenger ? passenger.name : "Unknown Passenger",
          passengerPhone: passenger ? passenger.phone : "Not Available",
          passengerAvatar: passenger ? passenger.avatar : "P",
          seatsBooked: b.seatsBooked,
          bookingDate: b.bookingDate,
        };
      });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                My Offered Rides
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage the rides you have published and see your passengers.
              </p>
            </div>
            
            {currentUser && (
              <Link
                to="/publishRide"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition duration-200"
              >
                <PlusCircle className="w-4.5 h-4.5" />
                Offer a New Ride
              </Link>
            )}
          </div>

          {!currentUser ? (
            /* Warning if unauthenticated */
            <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-sm space-y-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-7 h-7" />
              </div>
              <div className="space-y-2 max-w-sm mx-auto">
                <h3 className="text-lg font-bold text-slate-800">Authentication Required</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Log in to your account to view your dashboard of published ride offers.
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <Link
                  to="/login"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition"
                >
                  Log In Now
                </Link>
              </div>
            </div>
          ) : myOfferedRides.length === 0 ? (
            /* Empty state */
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <CarIcon className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold text-slate-800">No trips offered yet</h3>
                <p className="text-slate-500 text-sm">
                  You haven't published any rides. Share gas costs and driving duties by publishing your first commute!
                </p>
              </div>
              <Link
                to="/publishRide"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition mt-2"
              >
                Publish First Trip
              </Link>
            </div>
          ) : (
            /* Grid/List of Offered Rides */
            <div className="space-y-8">
              {myOfferedRides.map((ride) => {
                const activeBookings = getRideBookings(ride.id);
                const isConfirmingCancel = cancellingRideId === ride.id;

                return (
                  <div
                    key={ride.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition duration-200"
                  >
                    
                    {/* Ride Core Details Bar */}
                    <div className="bg-slate-900 text-white p-5 sm:px-6 flex flex-col sm:flex-row justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          Active Trip Offer
                        </span>
                        <h3 className="text-lg font-extrabold flex items-center gap-2 mt-1">
                          <span>{ride.from}</span>
                          <span className="text-slate-400 font-light">to</span>
                          <span>{ride.to}</span>
                        </h3>
                      </div>
                      
                      {/* Price & Seats Summary */}
                      <div className="flex items-center gap-6 sm:text-right">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Pricing</p>
                          <p className="text-lg font-black text-emerald-400">${ride.price}/seat</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Seats Left</p>
                          <p className="text-lg font-black text-white">
                            {ride.seatsAvailable} / {ride.seatsTotal}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Body content */}
                    <div className="p-6 space-y-6">
                      
                      {/* Route Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 border-b border-slate-100 pb-5">
                        <div className="space-y-1">
                          <span className="block text-xs font-semibold text-slate-400 uppercase">Departure Date</span>
                          <p className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            {ride.date}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="block text-xs font-semibold text-slate-400 uppercase">Departure Time</span>
                          <p className="font-bold text-slate-800 flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {ride.time}
                          </p>
                        </div>
                      </div>

                      {/* Passenger list */}
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-slate-400" />
                          Passengers Booked ({activeBookings.length})
                        </h4>

                        {activeBookings.length === 0 ? (
                          <div className="bg-slate-50 border border-dashed border-slate-200 text-slate-500 rounded-xl p-6 text-center text-xs font-semibold">
                            No passengers have reserved seats on this trip yet.
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {activeBookings.map((b) => (
                              <div
                                key={b.id}
                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 border border-slate-150 rounded-xl p-4 gap-3"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                                    {b.passengerAvatar}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-800">{b.passengerName}</p>
                                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                                      <Phone className="w-3 h-3 text-slate-400" />
                                      {b.passengerPhone}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-xs sm:text-right bg-white px-3 py-1 rounded-full border border-slate-200 font-bold text-slate-700">
                                  Reserved: {b.seatsBooked} {b.seatsBooked === 1 ? "seat" : "seats"}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Cancel operations */}
                      <div className="border-t border-slate-100 pt-5 flex justify-end">
                        {isConfirmingCancel ? (
                          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full animate-fade-in-up">
                            <div className="flex items-start gap-2.5">
                              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                              <div className="space-y-0.5">
                                <h5 className="font-bold text-sm">Cancel this trip?</h5>
                                <p className="text-xs leading-relaxed">
                                  This will remove the offer. Booked passengers will be notified and their reservations canceled automatically.
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2.5 self-end sm:self-center">
                              <button
                                onClick={() => setCancellingRideId(null)}
                                className="px-3.5 py-1.5 bg-white border border-red-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                              >
                                Keep Trip
                              </button>
                              <button
                                onClick={() => confirmCancelRide(ride.id)}
                                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition cursor-pointer"
                              >
                                Confirm Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => handleCancelClick(ride.id)}
                            variant="danger"
                            size="sm"
                            className="flex items-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" />
                            Cancel Trip Offer
                          </Button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyRides;
