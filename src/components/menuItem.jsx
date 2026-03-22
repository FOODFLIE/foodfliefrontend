import React from "react";
import { Plus, Loader2 } from "lucide-react";

const MenuItem = ({ name, description, price, image, onAdd, isAdding, is_veg }) => {
  return (
    <div className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl border border-slate-50 bg-white hover:border-brand/20 transition-all group shadow-sm hover:shadow-xl w-full max-w-full overflow-hidden">
      <div className="flex-1 space-y-2 sm:space-y-3 min-w-0 flex flex-col">
        <div className="flex items-start gap-2">
          {is_veg !== undefined && is_veg !== null && (
            <div className={`flex-shrink-0 w-3.5 h-3.5 mt-1 sm:mt-1.5 border ${is_veg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center rounded-sm`}>
              <div className={`w-1.5 h-1.5 ${is_veg ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
            </div>
          )}
          <h4 className="font-black text-slate-800 text-base sm:text-lg tracking-tight group-hover:text-brand transition-colors font-poppins truncate pb-1">
            {name}
          </h4>
        </div>
        <p className="text-[10px] sm:text-xs text-slate-400 font-medium leading-relaxed italic line-clamp-2">
          {description}
        </p>
        
        <div className="flex-1"></div>
        
        <div className="pt-2 flex items-center justify-between gap-2 mt-auto">
          <span className="text-lg sm:text-xl font-black text-slate-800 font-display truncate">
            ₹{price}
          </span>
        </div>
      </div>
      
      {/* Image and Add Button Container */}
      <div className="relative shrink-0 flex flex-col items-center">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-sm bg-slate-50 relative">
          <img
            src={image}
            className="w-full h-full object-cover"
            alt={name}
          />
        </div>
        
        {/* Add Button - Positioned over bottom edge of image */}
        <div className="absolute -bottom-3 w-[85%]">
          <button
            onClick={onAdd}
            disabled={isAdding}
            className="w-full bg-white border border-slate-200 text-brand py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-black uppercase tracking-widest hover:bg-slate-50 hover:border-brand hover:shadow-md transition-all flex items-center justify-center gap-1 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <Loader2 className="animate-spin text-brand" size={14} />
            ) : (
              <span className="text-xl leading-none mr-1">+</span> 
            )}
            {isAdding ? "Adding" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
