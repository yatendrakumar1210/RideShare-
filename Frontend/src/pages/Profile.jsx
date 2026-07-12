import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Car as CarIcon,
  Save,
  CheckCircle,
  AlertCircle,
  FileText,
  KeyRound,
  Wrench
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useRideShare } from "../context/RideShareContext";

const Profile = () => {
  const { currentUser, updateProfile } = useRideShare();

  // User Profile Form States
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [password, setPassword] = useState(currentUser?.password || "");

  // Vehicle Form States (if driver or general)
  const [vehicleMake, setVehicleMake] = useState(currentUser?.vehicle?.make || "");
  const [vehicleModel, setVehicleModel] = useState(currentUser?.vehicle?.model || "");
  const [vehicleYear, setVehicleYear] = useState(currentUser?.vehicle?.year || "");
  const [vehicleColor, setVehicleColor] = useState(currentUser?.vehicle?.color || "");
  const [vehiclePlate, setVehiclePlate] = useState(currentUser?.vehicle?.plate || "");

  // Tab State
  const [activeTab, setActiveTab] = useState("info"); // info, vehicle

  // UI Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setError("Name, email, phone, and password are required fields.");
      setLoading(false);
      return;
    }

    try {
      setTimeout(() => {
        updateProfile({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          bio: bio.trim(),
          password: password.trim(),
        });
        setLoading(false);
        setSuccessMsg("Profile details updated successfully!");
      }, 800);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
      setLoading(false);
    }
  };

  const handleVehicleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      setTimeout(() => {
        // If all vehicle inputs are empty, we can set vehicle to null, otherwise save
        if (!vehicleMake.trim() && !vehicleModel.trim() && !vehiclePlate.trim()) {
          updateProfile({ vehicle: null });
        } else {
          updateProfile({
            vehicle: {
              make: vehicleMake.trim(),
              model: vehicleModel.trim(),
              year: vehicleYear.trim(),
              color: vehicleColor.trim(),
              plate: vehiclePlate.trim(),
            },
          });
        }
        setLoading(false);
        setSuccessMsg("Vehicle details updated successfully!");
      }, 800);
    } catch (err) {
      setError(err.message || "Failed to update vehicle details.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      <div>
        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">
              My Profile Settings
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Customize your profile cards, driving status, and vehicle configurations.
            </p>
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
                  Log in to your account to update your personal details and vehicle config.
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
          ) : (
            /* Main Config Grid */
            <div className="grid md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Avatar Card & Tab Links */}
              <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold text-2xl border-4 border-slate-50 shadow-sm mx-auto">
                    {currentUser.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 truncate">{currentUser.name}</h3>
                    <p className="text-xs text-slate-400 font-semibold truncate capitalize mt-0.5">
                      Verified Member • {currentUser.role}
                    </p>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Tabs navigation */}
                <div className="flex flex-col gap-1 text-sm font-semibold">
                  <button
                    onClick={() => {
                      setActiveTab("info");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left cursor-pointer transition ${
                      activeTab === "info"
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <User className="w-4.5 h-4.5" />
                    Profile Information
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("vehicle");
                      setError("");
                      setSuccessMsg("");
                    }}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left cursor-pointer transition ${
                      activeTab === "vehicle"
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <CarIcon className="w-4.5 h-4.5" />
                    Vehicle Configuration
                  </button>
                </div>
              </div>

              {/* Right Column: Active Configuration Form */}
              <div className="md:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
                
                {/* Alerts */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6 animate-fade-in-up">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
                {successMsg && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl flex items-center gap-2 text-xs font-semibold mb-6 animate-fade-in-up">
                    <CheckCircle className="w-4 h-4" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* Profile Form */}
                {activeTab === "info" && (
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div className="border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-black text-slate-800">Personal Details</h3>
                      <p className="text-slate-500 text-xs mt-1">Manage details visible to other riders.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
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
                            className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
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
                            className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                            required
                          />
                        </div>
                      </div>
                    </div>

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
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Password Details
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <KeyRound className="w-4 h-4" />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Update password details"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200"
                          required
                        />
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Biography / About Me
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Tell potential passengers or drivers about yourself..."
                          rows="3"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 pl-11 pr-4 text-sm outline-none transition duration-200 resize-y"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5"
                      isLoading={loading}
                    >
                      <Save className="w-4 h-4" />
                      Save Profile Details
                    </Button>
                  </form>
                )}

                {/* Vehicle Form */}
                {activeTab === "vehicle" && (
                  <form onSubmit={handleVehicleSubmit} className="space-y-6">
                    <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-black text-slate-800">Vehicle Configurations</h3>
                        <p className="text-slate-500 text-xs mt-1">Details visible on your published ride listings.</p>
                      </div>
                      <span className="p-1 bg-emerald-50 text-emerald-600 rounded-lg">
                        <Wrench className="w-5 h-5" />
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Make */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Vehicle Make
                        </label>
                        <input
                          type="text"
                          value={vehicleMake}
                          onChange={(e) => setVehicleMake(e.target.value)}
                          placeholder="e.g. Toyota"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 px-4 text-sm outline-none transition duration-200"
                        />
                      </div>

                      {/* Model */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Vehicle Model
                        </label>
                        <input
                          type="text"
                          value={vehicleModel}
                          onChange={(e) => setVehicleModel(e.target.value)}
                          placeholder="e.g. Camry Hybrid"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 px-4 text-sm outline-none transition duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-5">
                      {/* Year */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Model Year
                        </label>
                        <input
                          type="text"
                          value={vehicleYear}
                          onChange={(e) => setVehicleYear(e.target.value)}
                          placeholder="e.g. 2022"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 px-4 text-sm outline-none transition duration-200"
                        />
                      </div>

                      {/* Color */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          Vehicle Color
                        </label>
                        <input
                          type="text"
                          value={vehicleColor}
                          onChange={(e) => setVehicleColor(e.target.value)}
                          placeholder="e.g. Black"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 px-4 text-sm outline-none transition duration-200"
                        />
                      </div>

                      {/* Plate */}
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          License Plate
                        </label>
                        <input
                          type="text"
                          value={vehiclePlate}
                          onChange={(e) => setVehiclePlate(e.target.value)}
                          placeholder="e.g. MA-982-XYZ"
                          className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-500 focus:bg-white rounded-xl py-2.5 px-4 text-sm outline-none transition duration-200"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5"
                      isLoading={loading}
                    >
                      <Save className="w-4 h-4" />
                      Save Vehicle Details
                    </Button>
                  </form>
                )}

              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
