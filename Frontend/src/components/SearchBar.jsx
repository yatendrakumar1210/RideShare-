import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import Button from "./Button";

const SearchBar = ({ inline = false }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [from, setFrom] = useState(searchParams.get("from") || "");
  const [to, setTo] = useState(searchParams.get("to") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [seats, setSeats] = useState(searchParams.get("seats") || "1");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (from.trim()) query.set("from", from.trim());
    if (to.trim()) query.set("to", to.trim());
    if (date) query.set("date", date);
    query.set("seats", seats);

    navigate(`/rideDetails?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full max-w-5xl bg-white rounded-2xl md:rounded-full border border-slate-100 p-4 md:py-2.5 md:px-6 shadow-xl flex flex-col md:flex-row items-center gap-4 ${
        inline ? "" : "transform -translate-y-1/2 mx-auto relative z-10"
      }`}
    >
      {/* From */}
      <div className="flex items-center gap-3 w-full md:w-1/4 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
        <MapPin className="text-emerald-500 w-5 h-5 flex-shrink-0" />
        <div className="flex-grow">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Leaving from
          </label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="e.g. New York"
            className="w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-800 focus:ring-0 focus:outline-none placeholder-slate-400 mt-0.5"
            required
          />
        </div>
      </div>

      {/* To */}
      <div className="flex items-center gap-3 w-full md:w-1/4 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
        <MapPin className="text-sky-500 w-5 h-5 flex-shrink-0" />
        <div className="flex-grow">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Going to
          </label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="e.g. Boston"
            className="w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-800 focus:ring-0 focus:outline-none placeholder-slate-400 mt-0.5"
            required
          />
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-3 w-full md:w-1/5 border-b md:border-b-0 md:border-r border-slate-100 pb-3 md:pb-0 md:pr-4">
        <Calendar className="text-amber-500 w-5 h-5 flex-shrink-0" />
        <div className="flex-grow">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Departure date
          </label>
          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-800 focus:ring-0 focus:outline-none placeholder-slate-400 mt-0.5 cursor-pointer"
            required
          />
        </div>
      </div>

      {/* Seats */}
      <div className="flex items-center gap-3 w-full md:w-1/6 pb-2 md:pb-0">
        <Users className="text-violet-500 w-5 h-5 flex-shrink-0" />
        <div className="flex-grow">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Passengers
          </label>
          <select
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full bg-transparent border-0 p-0 text-sm font-medium text-slate-800 focus:ring-0 focus:outline-none mt-0.5 cursor-pointer"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "passenger" : "passengers"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto">
        <Button
          type="submit"
          className="w-full md:w-auto md:px-6 py-3 rounded-xl md:rounded-full"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
