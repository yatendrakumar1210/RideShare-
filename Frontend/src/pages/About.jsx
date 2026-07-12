import React from "react";
import { Leaf, ShieldCheck, Heart, Map, Sparkles, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar />

        {/* Hero Header */}
        <section className="bg-slate-900 text-white py-16 px-6 relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10 animate-fade-in-up">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
              About <span className="text-emerald-500">RideShare</span>
            </h1>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              We are on a mission to build a safe, community-driven, and highly sustainable carpooling network. Sharing seats to build a cleaner tomorrow.
            </p>
          </div>
        </section>

        {/* Core Vision & Mission */}
        <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight">
              Our Vision for Modern Urban Carpooling
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded in 2026, RideShare was born out of a simple observation: millions of cars commute daily with three to four empty passenger seats. Meanwhile, train fares soar, highways remain gridlocked, and carbon emissions peak.
            </p>
            
            <p className="text-slate-600 text-sm leading-relaxed">
              By connecting verified drivers with passengers heading along identical travel routes, we make travel cheaper, foster community relationships, and drastically lower emissions. We believe that shared transportation is key to solving urban traffic and climate challenges.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-100 rounded-lg text-emerald-700">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>100% Identity Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-emerald-100 rounded-lg text-emerald-700">
                  <Leaf className="w-4 h-4" />
                </div>
                <span>Zero Carbon Waste</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-white p-6 border border-slate-200 rounded-3xl shadow-xs space-y-6">
            <h3 className="text-lg font-black text-slate-850">Our Core Beliefs</h3>
            
            <div className="space-y-4">
              {[
                {
                  icon: <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />,
                  title: "Community Trust",
                  desc: "We verify driver identity, review ratings, and vet plates so travelers commute with peace of mind.",
                },
                {
                  icon: <Sparkles className="w-4 h-4 text-amber-500" />,
                  title: "Fair Cost-sharing",
                  desc: "Rides are priced only to offset fuel costs and tolls. No commercial high-fare pricing.",
                },
                {
                  icon: <Map className="w-4 h-4 text-sky-500" />,
                  title: "Eco-Conscious Commutes",
                  desc: "Carpooling eliminates individual vehicles from the road, combating traffic gridlock and CO2.",
                },
              ].map((belief, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 flex-shrink-0">{belief.icon}</div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">{belief.title}</h4>
                    <p className="text-slate-500 text-xs mt-0.5 leading-normal">{belief.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Info Details */}
        <section className="bg-slate-900 text-white py-16 px-6">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-8 text-center sm:text-left">
            <div className="space-y-2.5">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Write to Us</h4>
              <p className="text-xs text-slate-400">support@rideshare.com</p>
            </div>

            <div className="space-y-2.5 border-t sm:border-t-0 sm:border-l sm:border-r border-slate-800 pt-6 sm:pt-0 sm:px-8">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Call Support</h4>
              <p className="text-xs text-slate-400">+1 (555) 019-2800</p>
            </div>

            <div className="space-y-2.5 border-t sm:border-t-0 pt-6 sm:pt-0">
              <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto sm:mx-0">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm">Main Headquarter</h4>
              <p className="text-xs text-slate-400">22 Baker Street, San Francisco, CA</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
