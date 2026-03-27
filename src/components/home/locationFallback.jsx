import { MapPin, Navigation } from "lucide-react";

export const LocationFallback = ({ onSelectLocation }) => {
  return (
    <div className="responsive-container py-6 px-4">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        {/* Icon Container */}
        <div className="w-16 h-16 bg-gradient-to-br from-brand-muted to-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center relative overflow-hidden mb-4">
          <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent opacity-50"></div>
          <MapPin className="text-brand relative z-10" size={28} strokeWidth={1.5} />
        </div>

        {/* Text Content */}
        <div className="space-y-1.5 mb-6">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            Set Your Location
          </h3>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            We'll show you the fastest delivery options in your area
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onSelectLocation}
          className="bg-brand text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-brand/20 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
        >
          <Navigation size={16} className="group-hover:rotate-45 transition-transform" />
          Select Location
        </button>

        {/* Help Text */}
        <p className="mt-4 text-[10px] text-slate-400 font-medium">
          13-minute delivery • Menu prices only
        </p>
      </div>
    </div>
  );
};
