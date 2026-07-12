import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
  Filter,
  SlidersHorizontal,
  MapPin,
  Calendar,
  User,
  Star,
  Shield,
  Car as CarIcon,
  CheckCircle,
  X,
  AlertCircle,
  Clock
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import RideCard from "../components/RideCard";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useRideShare } from "../context/RideShareContext";

const RideDetails = () => {
  const { rides, bookRide, currentUser, users } = useRideShare();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search queries from URL
  const queryFrom = searchParams.get("from") || "";
  const queryTo = searchParams.get("to") || "";
  const queryDate = searchParams.get("date") || "";
  const querySeats = Number(searchParams.get("seats")) || 1;

  // Filter States
  const [maxPrice, setMaxPrice] = useState(100);
  const [timeFilter, setTimeFilter] = useState("all"); // all, morning, afternoon, evening
  const [sortBy, setSortBy] = useState("price-asc"); // price-asc, price-desc, time-asc

  // Detailed Modal State
  const [selectedRide, setSelectedRide] = useState(null);
  const [bookingSeats, setBookingSeats] = useState(querySeats);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);

  // Filter & Search Logic
  const filteredRides = rides.filter((ride) => {
    // 1. Destination filter (case insensitive match if query exists)
    if (queryFrom && !ride.from.toLowerCase().includes(queryFrom.toLowerCase())) {
      return false;
    }
    if (queryTo && !ride.to.toLowerCase().includes(queryTo.toLowerCase())) {
      return false;
    }
    
    // 2. Date filter (exact match if query exists)
    if (queryDate && ride.date !== queryDate) {
      return false;
    }

    // 3. Seats filter (must have enough seats)
    if (ride.seatsAvailable < querySeats) {
      return false;
    }

    // 4. Price slider filter
    if (ride.price > maxPrice) {
      return false;
    }

    // 5. Time Filter
    const hour = parseInt(ride.time.split(":")[0]);
    if (timeFilter === "morning" && (hour < 6 || hour >= 12)) return false;
    if (timeFilter === "afternoon" && (hour < 12 || hour >= 18)) return false;
    if (timeFilter === "evening" && (hour < 18 && hour >= 6)) return false; // evening: 18:00 to 05:59

    return true;
  });

  // Sorting Logic
  const sortedRides = [...filteredRides].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "time-asc") return a.time.localeCompare(b.time);
    return 0;
  });

  // Reset booking state when selecting new ride
  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
    setBookingSeats(querySeats > ride.seatsAvailable ? ride.seatsAvailable : querySeats);
    setBookingSuccess(false);
    setBookingError("");
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login");
      return;
    }
    
    setBookingError("");
    setBookingLoading(true);

    try {
      // Simulate slight network delay
      setTimeout(() => {
        try {
          bookRide(selectedRide.id, Number(bookingSeats));
          setBookingSuccess(true);
          setBookingLoading(false);
        } catch (err) {
          setBookingError(err.message || "Booking failed.");
          setBookingLoading(false);
        }
      }, 1000);
    } catch (err) {
      setBookingError("Something went wrong!");
      setBookingLoading(false);
    }
  };

  // Find Driver Bio/Details based on driverId
  const selectedDriver = selectedRide
    ? users.find((u) => u.id === selectedRide.driverId)
    : null;

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar />

        {/* Top Header & Search Panel */}
        <div className="bg-slate-900 text-white pt-8 pb-16 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
              Search Results
            </h1>
            <SearchBar inline={true} />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-12 gap-8 relative z-10 -mt-8">
          
          {/* Left Sidebar Filter Panel */}
          <aside className="md:col-span-4 lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 h-fit">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                Filters
              </h2>
              <button
                onClick={() => {
                  setMaxPrice(100);
                  setTimeFilter("all");
                  setSortBy("price-asc");
                }}
                className="text-xs text-slate-400 font-bold hover:text-emerald-600 transition"
              >
                Reset All
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="time-asc">Departure: Earliest</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Max Cost</span>
                <span className="text-emerald-600 font-black text-sm">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Departure Time Slots */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Departure Time
              </label>
              <div className="flex flex-col gap-2.5">
                {[
                  { id: "all", label: "Any Time" },
                  { id: "morning", label: "Morning (6 AM - 12 PM)" },
                  { id: "afternoon", label: "Afternoon (12 PM - 6 PM)" },
                  { id: "evening", label: "Evening & Night" },
                ].map((slot) => (
                  <label
                    key={slot.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                      timeFilter === slot.id
                        ? "border-emerald-500 bg-emerald-50/50 text-emerald-700 font-semibold"
                        : "border-slate-100 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeFilter"
                      checked={timeFilter === slot.id}
                      onChange={() => setTimeFilter(slot.id)}
                      className="sr-only"
                    />
                    <span className="text-xs">{slot.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Ride List Grid */}
          <main className="md:col-span-8 lg:col-span-9 space-y-6">
            
            {/* Search metadata */}
            <div className="flex justify-between items-center bg-white px-5 py-4 rounded-xl border border-slate-150 text-sm shadow-xs">
              <p className="text-slate-500">
                Found{" "}
                <span className="font-bold text-slate-800">
                  {sortedRides.length}
                </span>{" "}
                {sortedRides.length === 1 ? "ride" : "rides"} matching your travel.
              </p>
              {queryFrom && queryTo && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  <span>{queryFrom}</span>
                  <span>→</span>
                  <span>{queryTo}</span>
                </div>
              )}
            </div>

            {/* Ride List */}
            <div className="grid sm:grid-cols-2 gap-6">
              {sortedRides.length > 0 ? (
                sortedRides.map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onSelect={() => handleSelectRide(ride)}
                  />
                ))
              ) : (
                <div className="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="text-lg font-bold text-slate-800">No rides matching filters</h3>
                    <p className="text-slate-500 text-sm">
                      We couldn't find any upcoming trips matching those parameters. Try widening your price slider, changing departure times, or modifying city searches.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setMaxPrice(100);
                      setTimeFilter("all");
                      setSortBy("price-asc");
                      navigate("/rideDetails");
                    }}
                    className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Clear Search Queries
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Footer />

      {/* Ride Detail Modal */}
      {selectedRide && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in-up">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-100 relative">
            
            {/* Header / Dismiss */}
            <button
              onClick={() => setSelectedRide(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {bookingSuccess ? (
              /* Success Panel */
              <div className="p-8 md:p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-800">Ride Booked Successfully!</h3>
                  <p className="text-slate-500 text-sm max-w-md mx-auto">
                    Your seats have been reserved. You can review your trip details, download receipt details, and view driver instructions inside your bookings tab.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/myBookings"
                    className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition"
                  >
                    Go to My Bookings
                  </Link>
                  <button
                    onClick={() => setSelectedRide(null)}
                    className="px-6 py-3 border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-sm transition cursor-pointer"
                  >
                    Back to Results
                  </button>
                </div>
              </div>
            ) : (
              /* Detail Info Form Panel */
              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Ride Details
                  </span>
                  
                  {/* Route Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-3 flex items-center gap-3">
                    <span>{selectedRide.from}</span>
                    <span className="text-slate-300 font-light">to</span>
                    <span>{selectedRide.to}</span>
                  </h3>
                </div>

                {/* Core Trip Details Card */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm text-slate-600">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Departure Date</p>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      {selectedRide.date}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Departure Time</p>
                    <p className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      {selectedRide.time}
                    </p>
                  </div>
                  <div className="space-y-1 col-span-2 pt-2 border-t border-slate-200/55">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Vehicle Details</p>
                    <p className="font-semibold text-slate-700 flex items-center gap-1.5">
                      <CarIcon className="w-4 h-4 text-emerald-500" />
                      {selectedRide.vehicleInfo || "Not Specified"}
                    </p>
                  </div>
                </div>

                {/* Driver Profile Summary */}
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Your Driver
                  </h4>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-lg border-2 border-white shadow-xs">
                      {selectedRide.driverAvatar}
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{selectedRide.driverName}</span>
                        <div className="flex items-center gap-0.5 text-amber-500 fill-amber-500">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="text-xs font-bold text-slate-600">{selectedRide.driverRating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed italic">
                        "{selectedDriver?.bio || "Hey! I am a verified driver on RideShare, let's share the road."}"
                      </p>
                      
                      {selectedDriver?.phone && (
                        <p className="text-xs font-medium text-slate-400 pt-1">
                          Phone: <span className="text-slate-600 font-semibold">{selectedDriver.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Driver Notes */}
                {selectedRide.description && (
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Description & Ride Rules
                    </h4>
                    <p className="text-sm text-slate-600 bg-slate-50/50 border border-slate-100 p-4 rounded-xl leading-relaxed">
                      {selectedRide.description}
                    </p>
                  </div>
                )}

                {/* Booking Transaction Section */}
                <div className="border-t border-slate-150 pt-6 mt-6">
                  {bookingError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold mb-4 animate-fade-in-up">
                      <AlertCircle className="w-4 h-4" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  {currentUser ? (
                    currentUser.id === selectedRide.driverId ? (
                      /* If logged-in user is the driver */
                      <div className="bg-slate-50 text-slate-500 p-4 text-center rounded-xl font-semibold text-xs border border-slate-200">
                        This is your offered ride. You cannot reserve seats on your own trip.
                      </div>
                    ) : (
                      /* Normal Booking Form */
                      <form onSubmit={handleBookingSubmit} className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 p-4 rounded-2xl border border-slate-150">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-bold text-slate-600">Seats needed:</label>
                          <select
                            value={bookingSeats}
                            onChange={(e) => setBookingSeats(Number(e.target.value))}
                            className="bg-white border border-slate-200 rounded-xl py-1.5 px-3 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 cursor-pointer"
                          >
                            {Array.from(
                              { length: selectedRide.seatsAvailable },
                              (_, i) => i + 1
                            ).map((n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? "Seat" : "Seats"}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="text-center sm:text-right">
                          <p className="text-xs text-slate-400 font-bold">Total price</p>
                          <p className="text-2xl font-black text-slate-800">${selectedRide.price * bookingSeats}</p>
                        </div>

                        <Button
                          type="submit"
                          isLoading={bookingLoading}
                          className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm"
                        >
                          Book Seat Now
                        </Button>
                      </form>
                    )
                  ) : (
                    /* Prompt login if unauthenticated */
                    <div className="text-center p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-3">
                      <p className="text-xs text-slate-600 font-medium">
                        You need to be signed in to book seats.
                      </p>
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                      >
                        Log in to Book
                      </Link>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default RideDetails;
