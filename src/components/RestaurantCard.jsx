import React from "react";
import { Star, Clock, BadgeCheck } from "lucide-react";

const RestaurantCard = ({
  image,
  name,
  cuisines,
  rating,
  time,
  offer,
  sameAsMenuPrice,
}) => {
  return (
    <div className="group precision-card rounded-lg sm:rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full">
      {/* Visual Component - Compact */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />

        {/* Compact Offer */}
        {offer && (
          <div className="absolute bottom-1.5 left-1.5 bg-brand-primary text-white text-[6px] sm:text-[8px] font-black px-1 py-0.5 sm:px-2 sm:py-1 rounded shadow-lg backdrop-blur-sm bg-opacity-90">
            {offer}
          </div>
        )}

        {/* Price Transparency */}
        {sameAsMenuPrice && (
          <div className="absolute top-1.5 right-1.5 bg-white/95 px-1 py-0.5 sm:px-2 sm:py-1 rounded-full flex items-center gap-0.5 sm:gap-1 shadow-sm border border-gray-100">
            <BadgeCheck
              size={7}
              className="text-brand-primary"
              strokeWidth={3}
            />
            <span className="text-[5px] sm:text-[7px] font-black text-black tracking-widest uppercase">
              Direct
            </span>
          </div>
        )}
      </div>

      {/* Info Cluster - Dense */}
      <div className="p-1.5 sm:p-3 md:p-4 flex flex-col flex-1">
        <h3 className="text-[11px] sm:text-[13px] md:text-[15px] font-black text-black group-hover:text-brand-primary transition-colors line-clamp-1 tracking-tight leading-tight mb-0.5">
          {name}
        </h3>
        <p className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 mb-1.5 sm:mb-3 truncate tracking-wide">
          {cuisines.slice(0, 1).join(", ")}
        </p>

        <div className="flex items-center justify-between mt-auto pt-1 sm:pt-2 border-t border-gray-50">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star
                size={8}
                fill="#FF4500"
                className="text-brand-primary"
                strokeWidth={0}
              />
              <span className="text-[9px] sm:text-[11px] font-black">
                {rating}
              </span>
            </div>
            <div className="text-gray-300 text-[7px] sm:text-[9px] font-black">
              •
            </div>
            <div className="text-gray-400 font-black text-[7px] sm:text-[9px] uppercase tracking-tighter">
              {time.replace(" MINS", "m")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
