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
    <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 card-hover group flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

        {offer && (
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
            <div className="bg-white/95 backdrop-blur-sm text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-tight shadow-sm">
              {offer}
            </div>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-extrabold text-gray-900 leading-tight group-hover:text-brand-primary transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-green-600 text-white text-[11px] font-black px-1.5 py-0.5 rounded-md self-start shrink-0">
            <Star size={10} fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-500 font-bold text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <Clock size={12} strokeWidth={3} className="text-gray-400" />
            <span>{time}</span>
          </div>
          <span>•</span>
          <span className="truncate">{cuisines[0]}</span>
        </div>

        <div className="mt-auto pt-5">
          {sameAsMenuPrice && (
            <div className="badge-glow flex items-center justify-center gap-2 py-2 rounded-2xl transition-all duration-300">
              <BadgeCheck size={16} className="fill-brand-primary text-white" />
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-tighter">
                Same as Menu Price
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
