import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, PiggyBank, Leaf, UserCheck, CheckCircle2, ChevronRight, Star } from "lucide-react";
import SearchBar from "../components/SearchBar";
import { useRideShare } from "../context/RideShareContext";
import RideCard from "../components/RideCard";
import img1 from "../assets/img1.jpg";

const ContentPage = () => {
  const { rides } = useRideShare();
  
  // Show first 3 rides as "Featured Rides"
  const featuredRides = rides.slice(0, 3);

  return (
    <div className="w-full">
      
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-20 pb-28 px-6 overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10">
          {/* Hero Text */}
          <div className="md:col-span-7 space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              Verified & Safe Ridesharing
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              Share your Ride, <br />
              <span className="text-emerald-500">Save Money</span> with RideShare
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Connect with verified drivers and passengers traveling in the same direction. Split gas costs, avoid heavy traffic, and lower your carbon emissions.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/rideDetails"
                className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 transition rounded-xl font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-900/30"
              >
                Find a Ride
                <ChevronRight className="w-4 h-4" />
              </Link>
              
              <Link
                to="/publishRide"
                className="px-7 py-3.5 border-2 border-slate-700 hover:border-slate-500 hover:bg-slate-800/40 active:scale-98 transition rounded-xl font-bold"
              >
                Offer a Ride
              </Link>
            </div>
          </div>

          {/* Hero Image / Card */}
          <div className="md:col-span-5 hidden md:block animate-float">
            <div className="relative p-2 bg-slate-800/80 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
              <img
                src={img1}
                alt="Carpool travel community"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-slate-700/40 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Savings</p>
                  <p className="text-xl font-black text-emerald-400">Up to 60% per trip</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-extrabold">4.9 / 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Search Bar */}
      <section className="px-6 relative z-20">
        <SearchBar />
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-slate-100">
        {[
          { label: "Active Members", value: "24,000+" },
          { label: "Co2 Saved (tons)", value: "8,500+" },
          { label: "Shared Kilometers", value: "1.2M+" },
          { label: "Money Saved ($)", value: "$640K+" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Why Carpool with RideShare?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            We provide a safe, convenient, and affordable carpooling network. Here is why you should travel with us:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <PiggyBank className="w-6 h-6 text-emerald-600" />,
              title: "Save on Travel Costs",
              description: "Gas, highway tolls, and vehicle maintenance costs are split evenly among all passengers, making travel extremely cheap.",
              bgColor: "bg-emerald-50 text-emerald-700",
            },
            {
              icon: <ShieldCheck className="w-6 h-6 text-sky-600" />,
              title: "Verified Safe Driver Network",
              description: "Drivers must verify their phone, email, vehicle documents, and license plate. Read real traveler feedback before booking.",
              bgColor: "bg-sky-50 text-sky-700",
            },
            {
              icon: <Leaf className="w-6 h-6 text-amber-600" />,
              title: "Eco-Friendly Footprint",
              description: "Filling empty car seats removes other single-occupant vehicles from roads, reducing traffic gridlock and Co2 pollution.",
              bgColor: "bg-amber-50 text-amber-700",
            },
          ].map((feat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl border border-slate-150 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-300 space-y-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${feat.bgColor}`}>
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{feat.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Rides Section */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
                Featured Upcoming Rides
              </h2>
              <p className="text-slate-500 text-sm">
                Grab a seat on one of these popular weekend journeys before they fill up!
              </p>
            </div>
            <Link
              to="/rideDetails"
              className="inline-flex items-center gap-1 text-sm font-bold text-emerald-600 hover:text-emerald-700 transition"
            >
              Browse all rides
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRides.length > 0 ? (
              featuredRides.map((ride) => (
                <RideCard
                  key={ride.id}
                  ride={ride}
                  onSelect={() => window.location.href = `/rideDetails?from=${encodeURIComponent(ride.from)}&to=${encodeURIComponent(ride.to)}`}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500 py-8">
                No upcoming rides offered. Check back later or publish your own!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="text-slate-500 text-sm">
            Carpooling is as simple as 1, 2, 3. Find out how you can start today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line for design on large screens */}
          <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-0.5 border-t border-dashed border-slate-200 z-0" />
          
          {[
            {
              step: "01",
              title: "Find Your Ideal Ride",
              description: "Enter your starting point, drop-off location, and dates. Compare driver ratings, price per seat, and car comforts.",
            },
            {
              step: "02",
              title: "Book Seat & Connect",
              description: "Select the number of seats you need, click book, and receive instant booking confirmations. Message drivers directly.",
            },
            {
              step: "03",
              title: "Travel & Share gas",
              description: "Meet your driver at the designated pickup spot, enjoy a safe shared commute, and settle costs easily.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center relative z-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-900 border-4 border-white text-emerald-400 font-extrabold text-xl flex items-center justify-center mx-auto shadow-md">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Ready to offer a ride yourself?</h2>
          <p className="text-emerald-100 max-w-lg mx-auto text-sm leading-relaxed">
            Turn your empty car seats into extra savings. Share driving duties, keep your wallet full, and help save the planet.
          </p>
          <div className="pt-2">
            <Link
              to="/publishRide"
              className="inline-flex items-center gap-1.5 px-8 py-4 bg-slate-900 hover:bg-slate-800 active:scale-98 transition rounded-xl font-bold shadow-xl"
            >
              <UserCheck className="w-4 h-4" />
              Publish a Trip Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContentPage;
