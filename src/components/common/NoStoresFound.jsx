import React from "react";
import { MapPinOff, Search, ArrowRight } from "lucide-react";

/**
 * NoStoresFound Component
 * A premium empty state component shown when no stores or products are found in the current location.
 * 
 * @param {string} title - Optional title to display.
 * @param {string} description - Optional description to display.
 * @param {boolean} compact - Whether to show a more compact version (for sections).
 */
const NoStoresFound = ({ 
  title = "No Stores Nearby", 
  description = "We couldn't find any stores serving your area at the moment. Try searching in a different location.",
  compact = false
}) => {
  const handleOpenLocation = () => {
    // Dispatch custom event to open location modal in Navbar
    window.dispatchEvent(new CustomEvent("open-location-modal"));
  };

  return (
    <div className={`flex flex-col items-center justify-center ${compact ? 'py-6 px-2' : 'py-10 px-4'} text-center animate-fade-in max-w-sm mx-auto`}>
      <div className={`relative ${compact ? 'mb-4' : 'mb-6'}`}>
        {/* Animated Background Rings */}
        <div className={`absolute inset-0 bg-brand/5 rounded-full ${compact ? 'scale-[1.8]' : 'scale-[2.2]'} animate-pulse-soft`}></div>
        <div className={`absolute inset-0 bg-brand/10 rounded-full ${compact ? 'scale-[1.4]' : 'scale-[1.6]'} animate-pulse-soft animation-delay-2000`}></div>
        
        {/* Main Icon Container */}
        <div className={`relative z-10 ${compact ? 'w-14 h-14' : 'w-20 h-20'} bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-50`}>
          <MapPinOff size={compact ? 28 : 40} className="text-brand shrink-0" strokeWidth={1.5} />
          
          {/* Decorative Elements */}
          <div className={`absolute -top-1 -right-1 ${compact ? 'w-4 h-4' : 'w-5 h-5'} bg-brand rounded-full flex items-center justify-center shadow-lg border-2 border-white`}>
            <Search size={compact ? 8 : 10} className="text-white" strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className={`${compact ? 'max-w-xs' : 'max-w-sm'} space-y-1`}>
        <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-slate-800 tracking-tight`}>
          {title}
        </h3>
        <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className={`${compact ? 'mt-6' : 'mt-8'} flex flex-wrap items-center justify-center gap-3`}>
        <button
          onClick={handleOpenLocation}
          className={`${compact ? 'px-4 py-2' : 'px-6 py-2.5'} bg-brand text-white rounded-xl font-black text-[12px] shadow-lg shadow-brand/20 hover:bg-brand-dark hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group`}
        >
          Change Location
          <ArrowRight size={compact ? 14 : 16} className="group-hover:translate-x-1 transition-transform" />
        </button>
        
        {!compact && (
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 bg-brand-grey text-slate-600 rounded-xl font-black text-[13px] hover:bg-slate-200 active:scale-[0.98] transition-all"
          >
            Refresh
          </button>
        )}
      </div>
      
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-brand/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
    </div>
  );
};

export default NoStoresFound;
