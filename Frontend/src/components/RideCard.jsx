import React from "react";
import { Star, MapPin, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Button from "./Button";

const RideCard = ({ ride, onSelect, actionLabel = "View Details" }) => {
  const {
    driverName,
    driverAvatar,
    driverRating,
    from,
    to,
    date,
    time,
    price,
    seatsAvailable,
    vehicleInfo,
  } = ride;

  const formatDate = (dateStr) => {
    const options = { month: "short", day: "numeric", weekday: "short" };
    return new Date(dateStr).toLocaleDateString("en-US", options);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-150 p-5 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      {/* Route & Times */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-4 relative pl-5 before:content-[''] before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:border-l-2 before:border-dashed before:border-slate-200">
          {/* Departure */}
          <div className="relative">
            <div className="absolute left-[-22px] top-1 w-3.5 h-3.5 rounded-full border-2 border-emerald-500 bg-white" />
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-slate-800">{time}</span>
              <span className="text-sm font-semibold text-slate-600">{from}</span>
            </div>
          </div>
          {/* Destination */}
          <div className="relative">
            <div className="absolute left-[-22px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-sky-500 bg-white" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-slate-600">Arrival</span>
              <span className="text-sm font-bold text-slate-800">{to}</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-right">
          <p className="text-xs text-slate-400 font-medium">Per passenger</p>
          <p className="text-2xl font-extrabold text-slate-900">${price}</p>
        </div>
      </div>

      {/* Date & Vehicle & Seats */}
      <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-slate-50 text-xs text-slate-500 mb-4">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{formatDate(date)}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <span
            className={`font-semibold px-2 py-0.5 rounded-full ${
              seatsAvailable <= 1
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            {seatsAvailable} {seatsAvailable === 1 ? "seat" : "seats"} left
          </span>
        </div>
        {vehicleInfo && (
          <div className="col-span-2 flex items-center gap-1.5 mt-1 text-slate-400">
            <span className="truncate">Vehicle: {vehicleInfo}</span>
          </div>
        )}
      </div>

      {/* Driver Info & CTA */}
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm border-2 border-white shadow-xs">
            {driverAvatar}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 leading-tight">
              {driverName}
            </h4>
            <div className="flex items-center gap-1 mt-0.5">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-semibold text-slate-500">
                {driverRating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={onSelect}
          size="sm"
          variant="outline"
          className="group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors"
        >
          {actionLabel}
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default RideCard;
