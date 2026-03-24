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
  is_active, // ✅ add this
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!is_active) return; // ❌ block click
    navigate(`/restaurant/${id || 1}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative min-w-[calc(50%-8px)] sm:min-w-[180px] cursor-pointer group snap-start transition-all duration-300 hover:-translate-y-1"
      style={{ opacity: is_active ? 1 : 0.5 }} // ✅ fade effect
    >
      {/* Image Container */}
      <div className="relative h-36 sm:h-52 w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent"></div>

        {/* Discount */}
        {discount && (
          <div className="absolute bottom-2 left-3 text-white font-black text-sm sm:text-xl italic tracking-tighter shadow-black drop-shadow-md">
            {discount}
          </div>
        )}

        {/* 🔥 Inactive Overlay */}
        {!is_active && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-red-500 font-bold text-sm sm:text-base">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-2 px-0.5">
        <h3 className="text-sm sm:text-lg font-black text-slate-900 tracking-tight truncate group-hover:text-brand transition-colors capitalize mb-1">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex items-center gap-0.5 bg-green-600 text-white px-1 py-0.5 rounded">
            <Star size={9} fill="currentColor" strokeWidth={0} />
            <span className="text-[9px] font-bold">{rating}</span>
          </div>

          <span className="text-[10px] font-bold text-slate-600">•</span>
          <span className="text-[10px] sm:text-xs font-black text-slate-900">
            {time}
          </span>

          {location && (
            <>
              <span className="text-[10px] font-bold text-slate-600">•</span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-600 truncate">
                {location}
              </span>
            </>
          )}
        </div>

        <p className="text-[10px] sm:text-xs font-medium text-slate-500 truncate">
          {cuisine}
        </p>
      </div>
    </div>
  );
};

export default RestaurantChainCard;
