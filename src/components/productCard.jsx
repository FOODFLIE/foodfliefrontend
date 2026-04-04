import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock, ChevronRight } from "lucide-react";

const ProductCard = ({
  id,
  store_name,
  image,
  cuisines,
  offer,
  is_active = true,
  time,
  price,
  area,
  rating = 4.2,
  name,
  partner,
}) => {
  const displayName = name || store_name;
  const itemPrice = price || 149;
  const displayCuisines = Array.isArray(cuisines) ? cuisines.join(", ") : (cuisines || "Delicious Choice");

  return (
    <div className={`group h-full  flex flex-col bg-white transition-all duration-300 ${!is_active ? "opacity-60 grayscale pointer-events-none" : ""}`}>
      {/* Image Container with specific branding placement */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-slate-100">
        <Link to={is_active ? `/restaurant/${id}` : "#"} className="block w-full h-full">
          <img
            src={image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt={displayName}
          />
          {/* Gradient for Offer Text Readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Offer text at bottom-left */}
          {offer && (
             <div className="absolute bottom-2 left-3 text-white font-black text-base sm:text-lg tracking-tight drop-shadow-md uppercase italic leading-none">
               {offer}
             </div>
          )}
        </Link>
      </div>

      {/* Content Section */}
      <div className="pt-2.5 shadow-sm rounded-b-xl  px-0.5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="font-black text-slate-800 text-[15px] group-hover:text-brand transition-colors line-clamp-2 capitalize leading-tight mb-1">
          {displayName}
        </h3>

        {/* Rating and Time Row */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex items-center justify-center bg-green-600 text-white rounded-full p-0.5">
             <Star size={9} fill="currentColor" strokeWidth={0} />
          </div>
          <span className="text-[13px] font-black text-slate-700 tracking-tight">
            {rating} • {time || "13 mins"}
          </span>
        </div>

        {/* Cuisines */}
        <p className="text-[13px] text-slate-500 font-medium truncate leading-normal">
          {displayCuisines}
        </p>

        {/* Location (Area) */}
        {area && (
           <p className="text-[13px] text-slate-500 font-medium truncate">
             {area}
           </p>
        )}

        {/* Footer Area - Focused Pricing */}
        <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-50 mt-4">
           <div className="flex flex-col">
             <div className="flex items-center gap-1 leading-none">
                <span className="text-[9px] font-bold text-slate-400">From</span>
                <span className="text-sm font-black text-slate-900 tracking-tight">₹{itemPrice}</span>
             </div>
           </div>
           
     
        </div>
      </div>
    </div>
  );
};

export default ProductCard;