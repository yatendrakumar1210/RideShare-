import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { useRideShare } from "../context/RideShareContext";
import Button from "../components/Button";

const Login = () => {
  const { loginUser } = useRideShare();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      loginUser(email, password);
      // Wait a moment for UX
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-12 min-h-[600px] border border-slate-100">
        
        {/* Left Side: Gradient Design & Promo */}
        <div className="md:col-span-5 bg-gradient-to-tr from-emerald-600 to-teal-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-wider uppercase">RideShare</span>
          </div>

          <div className="relative z-10 my-8">
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              Welcome back to your travel community.
            </h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              Log in to search rides, publish trips, and view your active bookings.
            </p>
          </div>

          <div className="relative z-10 text-xs text-emerald-200">
            © 2026 RideShare. Travel smart, save environment.
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="md:col-span-7 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Log In</h1>
            <p className="text-slate-500 text-sm mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 mb-6 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Authentication Failed</h4>
                <p className="text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Tip: Try <span className="font-semibold">john@example.com</span> or <span className="font-semibold">sarah@example.com</span>
              </p>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm outline-none transition duration-200"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Password: <span className="font-semibold">password123</span>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl text-sm"
              isLoading={loading}
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-sm text-slate-600 mt-8 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-bold hover:underline"
            >
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
