
import React from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RestaurantChainCard = ({
  id,
  image,
  name,
  rating,
  time,
  cuisine,
  location,
  discount,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${id || 1}`); // Default to 1 if no ID for demo
  };

  return (
    <div 
        onClick={handleClick}
        className="min-w-[100px] sm:min-w-[180px] cursor-pointer group snap-start"
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 w-full rounded-2xl overflow-hidden shadow-sm">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent"></div>
        
        {/* Discount Overlay */}
        {discount && (
             <div className="absolute bottom-3 left-4 text-white font-black text-xl italic tracking-tighter shadow-black drop-shadow-md">
                {discount}
             </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-3 px-1">
        <div className="flex items-center justify-between mb-1">
             <h3 className="text-lg font-black text-slate-900 tracking-tight truncate pr-2 group-hover:text-zepto-purple transition-colors capitalize">
                {name}
             </h3>
        </div>
        
        <div className="flex items-center gap-2 mb-1.5">
             <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-full">
                  <Star size={10} fill="currentColor" strokeWidth={0} />
                  <span className="text-[10px] font-bold">{rating}</span>
             </div>
             <span className="text-xs font-bold text-slate-600">•</span>
             <span className="text-xs font-bold text-slate-800">{time}</span>
        </div>
        
        <div className="flex flex-col gap-0.5">
             <p className="text-xs font-medium text-slate-500 truncate">
                {cuisine}
             </p>
             <p className="text-xs font-medium text-slate-400 truncate">
                {location}
             </p>
        </div>
      </div>
    </div>
  );
};
export default RestaurantChainCard;

