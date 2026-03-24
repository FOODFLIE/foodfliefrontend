import React from "react";
import { TrendingUp, Clock, ChevronRight } from "lucide-react";

const SuggestionsDropdown = ({ suggestions, handleSuggestionClick }) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white border border-slate-100 mt-2 rounded-2xl shadow-xl z-50 overflow-hidden py-2 animate-fade-in">
      {suggestions.map((item, index) => (
        <button
          key={index}
          onClick={() => handleSuggestionClick(item.title)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
        >
          <div className="text-slate-400 group-hover:text-brand transition-colors">
            {item.type === 'category' ? <TrendingUp size={16} /> : <Clock size={16} />}
          </div>
          <span className="text-sm font-bold text-slate-700 group-hover:text-brand transition-colors">
            {item.title}
          </span>
          <ChevronRight size={14} className="ml-auto text-slate-300 opacity-0 group-hover:opacity-100 transition-all" />
        </button>
      ))}
    </div>
  );
};

export default SuggestionsDropdown;
