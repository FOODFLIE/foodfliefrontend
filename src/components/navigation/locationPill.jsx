import React from "react";
import { MapPin, ChevronDown } from "lucide-react";

const LocationPill = ({ address, loading, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {loading && (
        <div className="absolute inset-0 bg-zepto-purple/5 animate-pulse"></div>
      )}

      <div className="relative flex items-center justify-center">
        <div
          className={`p-1.5 rounded-lg transition-colors ${loading ? "bg-zepto-purple text-white shadow-lg shadow-zepto-purple/20" : "bg-zepto-purple/5 text-zepto-purple group-hover:bg-zepto-purple group-hover:text-white"}`}
        >
          <MapPin
            size={14}
            fill="currentColor"
            className={loading ? "animate-bounce" : ""}
          />
        </div>
      </div>

      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 group-hover:text-zepto-purple/60 transition-colors">
            Delivering to
          </span>
          <ChevronDown
            size={10}
            className={`text-slate-300 group-hover:text-zepto-purple transition-all duration-500 ${loading ? "animate-radar rotate-180" : "group-hover:translate-y-0.5"}`}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[11px] sm:text-xs font-black text-slate-800 truncate max-w-[100px] sm:max-w-[140px] tracking-tight group-hover:text-zepto-purple transition-colors capitalize">
            {address}
          </span>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-zepto-purple text-white px-2 py-0.5 rounded-lg shadow-sm shadow-zepto-purple/10">
        <span className="text-[9px] font-black italic tracking-tighter">
          10 MIN
        </span>
      </div>
    </div>
  );
};

export default LocationPill;
