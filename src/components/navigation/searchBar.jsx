import React from "react";
import { Search, BadgeCheck } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="hidden sm:flex flex-1 max-w-2xl items-center gap-4">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search for 'milk', 'bread' or 'chips'"
          className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-zepto-purple focus:ring-4 focus:ring-zepto-purple/5 h-11 pl-12 pr-4 rounded-xl text-sm font-medium transition-all outline-none shadow-sm"
        />
      </div>
      <div className="hidden lg:flex items-center gap-1.5 whitespace-nowrap px-3 py-2 bg-zepto-light rounded-xl border border-zepto-purple/5">
        <BadgeCheck size={16} className="text-zepto-green" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-zepto-purple/60">
          Menu Prices Guaranteed
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
