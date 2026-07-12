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
  Compass,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  Info
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useRideShare } from "../context/RideShareContext";

const MyBookings = () => {
  const { currentUser, bookings, rides, users, cancelBooking } = useRideShare();
  const [cancellingBookingId, setCancellingBookingId] = useState(null);

  // Filter bookings made by currentUser
  const myBookings = currentUser
    ? bookings.filter((b) => b.passengerId === currentUser.id)
    : [];

  const handleCancelClick = (bookingId) => {
    setCancellingBookingId(bookingId);
  };

  const confirmCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    setCancellingBookingId(null);
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
                My Booked Rides
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Track your reserved seats, passenger details, and trip statuses.
              </p>
            </div>
            
            <Link
              to="/rideDetails"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition duration-200"
            >
              <Compass className="w-4.5 h-4.5" />
              Find a New Ride
            </Link>
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
                  Log in to your account to view your list of booked carpool seats.
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
          ) : myBookings.length === 0 ? (
            /* Empty state */
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Compass className="w-7 h-7" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-lg font-bold text-slate-800">No bookings found</h3>
                <p className="text-slate-500 text-sm">
                  You haven't reserved seats on any trips. Start exploring destinations and request a ride share today!
                </p>
              </div>
              <Link
                to="/rideDetails"
                className="inline-flex items-center gap-1.5 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition mt-2"
              >
                Search Available Rides
              </Link>
            </div>
          ) : (
            /* Grid/List of Passenger Bookings */
            <div className="space-y-6">
              {myBookings.map((booking) => {
                // Find associated ride
                const ride = rides.find((r) => r.id === booking.rideId);
                const isConfirmingCancel = cancellingBookingId === booking.id;
                
                // Find driver details
                const driver = ride
                  ? users.find((u) => u.id === ride.driverId)
                  : null;

                return (
                  <div
                    key={booking.id}
                    className="bg-white border border-slate-250 rounded-2xl overflow-hidden shadow-xs flex flex-col md:flex-row"
                  >
                    {/* Status indicator sidebar block */}
                    <div
                      className={`w-full md:w-3.5 flex-shrink-0 ${
                        booking.status === "confirmed" && ride
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />

                    {/* Main Content Info */}
                    <div className="p-6 flex-grow grid md:grid-cols-12 gap-6 items-center">
                      
                      {/* Left: Journey Info */}
                      <div className="md:col-span-6 space-y-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                              booking.status === "confirmed" && ride
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-red-50 text-red-600 border border-red-100"
                            }`}
                          >
                            {booking.status === "confirmed" && ride
                              ? "Confirmed Booking"
                              : "Cancelled"}
                          </span>
                          
                          <span className="text-[10px] text-slate-400 font-semibold uppercase">
                            Seats: {booking.seatsBooked}
                          </span>
                        </div>

                        {ride ? (
                          <div>
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-1.5">
                              <span>{ride.from}</span>
                              <span className="text-slate-300 font-light">→</span>
                              <span>{ride.to}</span>
                            </h3>
                            
                            <div className="flex gap-4 text-xs font-semibold text-slate-500 mt-2.5">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {ride.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {ride.time}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <h3 className="text-sm font-bold text-slate-700 flex items-center gap-1 text-red-500">
                              <ShieldAlert className="w-4.5 h-4.5" />
                              Ride details unavailable
                            </h3>
                            <p className="text-xs text-slate-400 leading-normal max-w-sm">
                              This ride has been cancelled by the driver. We apologized for the inconvenience. Your seats have been restored.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Center: Driver details (only if ride exists) */}
                      <div className="md:col-span-3 border-t md:border-t-0 md:border-l md:border-r border-slate-100 pt-4 md:pt-0 md:px-5">
                        {ride && driver ? (
                          <div className="space-y-2">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Driver Contact</p>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                                {driver.avatar}
                              </div>
                              <div>
                                <p className="text-xs font-bold text-slate-800">{driver.name}</p>
                                <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-0.5 mt-0.5">
                                  <Phone className="w-2.5 h-2.5" />
                                  {driver.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-slate-400 italic">No driver contact details.</div>
                        )}
                      </div>

                      {/* Right: Cancellation details & CTAs */}
                      <div className="md:col-span-3 text-right flex flex-col items-stretch justify-center h-full">
                        {ride && booking.status === "confirmed" ? (
                          isConfirmingCancel ? (
                            <div className="space-y-2 text-left bg-red-50/50 p-2.5 border border-red-150 rounded-xl animate-fade-in-up">
                              <p className="text-[10px] leading-relaxed text-red-700 font-semibold">
                                Cancel your reservation? Driver will release these seats.
                              </p>
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => setCancellingBookingId(null)}
                                  className="px-2 py-1 bg-white border border-red-200 text-[10px] rounded font-bold text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                                >
                                  Keep
                                </button>
                                <button
                                  onClick={() => confirmCancelBooking(booking.id)}
                                  className="px-2 py-1 bg-red-600 text-[10px] text-white rounded font-bold hover:bg-red-700 transition cursor-pointer"
                                >
                                  Cancel Seat
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-medium">Total Paid</p>
                                <p className="text-lg font-black text-slate-800">${ride.price * booking.seatsBooked}</p>
                              </div>
                              <Button
                                onClick={() => handleCancelClick(booking.id)}
                                variant="danger"
                                size="sm"
                                className="w-full text-xs py-2 rounded-lg flex items-center justify-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                Cancel Booking
                              </Button>
                            </div>
                          )
                        ) : (
                          <div className="text-slate-400 text-xs font-semibold text-center py-2 bg-slate-50 border border-slate-100 rounded-xl">
                            Booking Closed
                          </div>
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

export default MyBookings;
