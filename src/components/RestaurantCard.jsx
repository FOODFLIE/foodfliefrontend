import React from "react";
import { Link } from "react-router-dom";
import { Star, Clock } from "lucide-react";

const RestaurantCard = ({ id, name, image, rating, time, cuisines, offer }) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className="precision-card rounded-3xl overflow-hidden group click-micro flex flex-col h-full hover:shadow-2xl transition-all duration-500"
    >
      {/* Visual Density Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 blur-[0.5px] group-hover:blur-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-prestige-dark/90 via-prestige-dark/20 to-transparent" />

        {/* Elite Badge */}
        {offer && (
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[9px] font-black px-3 py-1 rounded-full shadow-xl uppercase tracking-widest prestige-glow">
            {offer}
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-prestige-dark/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/5">
            <Star
              size={10}
              className="fill-prestige-accent text-prestige-accent"
            />
            <span className="text-[11px] font-black text-white">{rating}</span>
          </div>
          <div className="flex items-center gap-1.5 text-prestige-silver/80">
            <Clock size={10} className="text-prestige-accent" />
            <span className="text-[10px] font-black tracking-tight uppercase">
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Signature Metadata */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-[15px] font-black text-white tracking-tight leading-none truncate uppercase">
            {name}
          </h3>
          <p className="text-[10px] font-bold text-prestige-silver/40 truncate tracking-wide flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-prestige-accent/30" />
            {cuisines.join(" • ")}
          </p>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100">
            <div className="w-1.5 h-1.5 rounded-full bg-prestige-accent prestige-glow animate-pulse" />
            <span className="text-[8px] font-black text-prestige-silver uppercase tracking-[0.2em]">
              Signature Service
            </span>
          </div>
          <button className="text-[10px] font-black text-prestige-accent uppercase tracking-widest group-hover:translate-x-1 transition-transform">
            EXPLORE
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
