import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, X } from "lucide-react";

const SearchHeader = ({ 
  searchInput, 
  handleInputChange, 
  onKeyDown, 
  setIsFocused, 
  clearSearch 
}) => {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-slate-100 p-4">
      <div className="responsive-container flex items-center gap-3">
        <Link
          to="/"
          className="p-2 -ml-2 text-slate-400 hover:text-brand transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={2.5} />
        </Link>
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon size={18} strokeWidth={2.5} />
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            onKeyDown={onKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search for 'biryani', 'pizza', 'milk'..."
            className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 h-12 pl-12 pr-10 rounded-xl text-base font-medium transition-all outline-none shadow-sm"
            autoFocus
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
