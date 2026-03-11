import React, { useState } from "react";
import { Search, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleFocus = () => {
    // Navigate to search page on focus for better mobile/dedicated search experience
    if (window.innerWidth < 640) {
      navigate("/search");
    }
  };

  return (
    <div className="hidden sm:flex flex-1 max-w-2xl items-center gap-4">
      <div className="flex-1 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Search size={18} strokeWidth={2.5} />
        </div>
        <input
          type="text"
          placeholder="Search for 'milk', 'bread' or 'chips'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          onFocus={handleFocus}
          className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 h-11 pl-12 pr-4 rounded-xl text-sm font-medium transition-all outline-none shadow-sm"
        />
      </div>
      <div className="hidden lg:flex items-center gap-1.5 whitespace-nowrap px-3 py-2 bg-brand-muted rounded-xl border border-brand/5">
        <BadgeCheck size={16} className="text-brand" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-brand/60">
          Menu Prices Guaranteed
        </span>
      </div>
    </div>
  );
};

export default SearchBar;
