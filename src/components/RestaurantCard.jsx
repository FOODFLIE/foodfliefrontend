import React from "react";
import { Star, Clock, BadgeCheck, Flame } from "lucide-react";

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
    <div className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-brand-primary/20 transition-all duration-500 hover:shadow-marketing cursor-pointer">
      {/* Visual Hook: Massive Appetising Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60" />

        {/* Urgent Marketing Tag: Offer */}
        {offer && (
          <div className="absolute bottom-4 left-4 bg-brand-primary text-white text-[12px] font-black px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg animate-pulse">
            <Flame size={14} fill="currentColor" />
            {offer}
          </div>
        )}

        {/* TRUST SIGNAL: Same as Menu Price (Overlay) */}
        {sameAsMenuPrice && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
            <BadgeCheck
              size={16}
              className="text-brand-primary"
              strokeWidth={3}
            />
            <span className="text-[10px] font-black text-gray-900 tracking-tight uppercase">
              Menu Price Guaranteed
            </span>
          </div>
        )}
      </div>

      {/* Conversion Data: Critical Info at a Glance */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </div>

        <p className="text-[13px] font-bold text-gray-400 mb-6 line-clamp-1">
          {cuisines.join(", ")}
        </p>

        <div className="flex items-center justify-between border-t border-gray-50 pt-5 mt-auto">
          <div className="flex items-center gap-4">
            {/* SCANNABLE RATING */}
            <div className="data-badge rating-badge">
              <Star size={14} fill="currentColor" strokeWidth={0} />
              {rating}
            </div>
            {/* SCANNABLE TIME */}
            <div className="data-badge time-badge">
              <Clock size={14} className="text-brand-primary" strokeWidth={3} />
              {time}
            </div>
          </div>

          <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-300">
            <span className="font-black text-xs">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
