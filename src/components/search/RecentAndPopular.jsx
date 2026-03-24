import React from "react";
import { Clock, TrendingUp, ChevronRight, X, Search as SearchIcon } from "lucide-react";
import { CATEGORIES } from "../../data";

const RecentAndPopular = ({ 
  recentSearches, 
  removeRecent, 
  handleSuggestionClick, 
  setRecentSearches 
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-10">
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Recent Searches
              </h2>
            </div>
            <button
              onClick={() => {
                setRecentSearches([]);
                localStorage.removeItem("recent_searches");
              }}
              className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(term)}
                className="group flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm font-bold text-slate-600 hover:border-brand hover:bg-white hover:text-brand transition-all"
              >
                {term}
                <X
                  size={14}
                  className="text-slate-300 group-hover:text-brand transition-colors"
                  onClick={(e) => removeRecent(e, term)}
                />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Popular Suggestions */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-brand" />
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
            Popular Suggestions
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.slice(0, 6).map((c, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(c.title)}
              className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-brand/30 hover:shadow-md transition-all group text-left"
            >
              <span className="text-sm font-bold text-slate-700 group-hover:text-brand transition-colors">
                {c.title}
              </span>
              <ChevronRight
                size={16}
                className="text-slate-300 group-hover:text-brand transition-colors"
              />
            </button>
          ))}
        </div>
      </section>

      {/* Empty State visual if no recent searches */}
      {recentSearches.length === 0 && (
        <div className="text-center py-10 opacity-50">
          <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon size={24} />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Start typing to search Products & Stores
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentAndPopular;
