import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Car, Lock, Mail, User, Phone, AlertCircle, ArrowRight } from "lucide-react";
import { useRideShare } from "../context/RideShareContext";
import Button from "../components/Button";

const Register = () => {
  const { registerUser } = useRideShare();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("both"); // passenger, driver, both
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      registerUser({
        name,
        email,
        phone,
        password,
        role,
      });
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 800);
    } catch (err) {
      setError(err.message || "Failed to register!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-12 min-h-[600px] border border-slate-100">
        
        {/* Left Side: Gradient Design & Promo */}
        <div className="md:col-span-5 bg-gradient-to-br from-emerald-600 to-teal-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
          
          <div className="relative z-10 flex items-center gap-2">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-xs">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-wider uppercase">RideShare</span>
          </div>

          <div className="relative z-10 my-8">
            <h2 className="text-3xl font-extrabold leading-tight mb-4">
              Join the green travel revolution.
            </h2>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              Create an account to save fuel costs, meet amazing people, and minimize traffic congestion.
            </p>
          </div>

          <div className="relative z-10 text-xs text-emerald-200">
            © 2026 RideShare. Travel smart, save environment.
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="md:col-span-7 p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h1>
            <p className="text-slate-500 text-sm mt-2">
              Sign up today and start sharing your rides.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3 mb-5 animate-fade-in-up">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Registration Failed</h4>
                <p className="text-xs mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
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
                  placeholder="john@example.com"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Role Select */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                I want to join as a
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["passenger", "driver", "both"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border text-center capitalize cursor-pointer transition ${
                      role === r
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {r === "both" ? "Passenger & Driver" : r}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 mt-4 rounded-xl text-sm"
              isLoading={loading}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-sm text-slate-600 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-bold hover:underline"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
