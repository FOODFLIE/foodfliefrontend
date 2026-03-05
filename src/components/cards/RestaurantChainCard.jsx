
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
        className="min-w-[calc(50%-8px)] sm:min-w-[180px] cursor-pointer group snap-start"
    >
      {/* Image Container */}
      <div className="relative h-36 sm:h-52 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-sm">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay for Text Visibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent"></div>
        
        {/* Discount Overlay */}
        {discount && (
             <div className="absolute bottom-2 left-3 text-white font-black text-sm sm:text-xl italic tracking-tighter shadow-black drop-shadow-md">
                {discount}
             </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-2 px-0.5">
        <h3 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight truncate group-hover:text-zepto-purple transition-colors capitalize mb-1">
          {name}
        </h3>
        
        <div className="flex items-center gap-1.5 mb-1">
             <div className="flex items-center gap-0.5 bg-green-600 text-white px-1 py-0.5 rounded">
                  <Star size={9} fill="currentColor" strokeWidth={0} />
                  <span className="text-[9px] font-bold">{rating}</span>
             </div>
             <span className="text-[10px] font-bold text-slate-600">•</span>
             <span className="text-[10px] sm:text-xs font-black text-slate-900">{time}</span>
        </div>
        
        <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">
          {cuisine}
        </p>
      </div>
    </div>
  );
};
export default RestaurantChainCard;

