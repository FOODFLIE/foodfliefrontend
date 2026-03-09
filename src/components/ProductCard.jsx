import React from "react";
import { Link } from "react-router-dom";
import { Zap, BadgeCheck } from "lucide-react";

const ProductCard = ({
  id,
  store_name,
  image,
  cuisines,
  offer,
  sameAsMenuPrice,
  time,
  price,
  area,
  compact = false,
}) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className={`bg-white border border-slate-100 rounded-2xl ${compact ? "p-3" : "p-4"} hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden`}
    >
      {offer && (
        <div
          className={`absolute top-0 left-0 bg-zepto-purple text-white ${compact ? "px-2 py-1 text-[8px]" : "px-2.5 py-1.5 text-[9px]"} font-semibold z-10 flex items-center gap-1 shadow-md uppercase tracking-tighter rounded-br-xl`}
        >
          <Zap size={compact ? 8 : 10} fill="currentColor" /> {offer}
        </div>
      )}

      {sameAsMenuPrice && (
        <div
          className={`absolute top-2 right-2 bg-zepto-green text-white ${compact ? "px-1.5 py-0.5 text-[7px]" : "px-2 py-0.5 text-[8px]"} font-semibold z-20 flex items-center gap-1 shadow-sm uppercase tracking-tighter border border-white/20 rounded-full`}
        >
          <BadgeCheck size={compact ? 8 : 10} /> Menu Price
        </div>
      )}

      <div
        className={`w-full aspect-square rounded-xl overflow-hidden ${compact ? "mb-2" : "mb-4"} relative bg-slate-50`}
      >
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
          }
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={store_name}
        />
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-100 shadow-sm flex items-center gap-1">
          <Zap
            size={compact ? 10 : 12}
            className="text-zepto-purple animate-pulse"
            fill="currentColor"
          />
          <span
            className={`${compact ? "text-[8px]" : "text-[10px]"} font-semibold text-slate-800 group-hover:text-zepto-purple transition-colors italic`}
          >
            {time || "10 MINS"}
          </span>
        </div>
      </div>

      <div className={`${compact ? "space-y-0.5" : "space-y-1"}`}>
        <h4
          className={`font-semibold text-slate-800 ${compact ? "text-xs" : "text-sm"} truncate font-poppins tracking-tight capitalize`}
        >
          {store_name}
        </h4>
        <p
          className={`${compact ? "text-[10px]" : "text-[11px]"} text-slate-400 font-medium truncate italic`}
        >
          {area ? `${area} • ` : ""}
          {cuisines?.join
            ? cuisines.join(", ")
            : typeof cuisines === "string"
              ? cuisines
              : "Restaurant"}
        </p>

        <div
          className={`${compact ? "pt-2 mt-2" : "pt-3 mt-3"} border-t border-slate-50 flex items-center justify-between`}
        >
          <button
            className={`bg-white border-2 border-zepto-purple text-zepto-purple ${compact ? "px-3 py-1 text-[8px]" : "px-4 py-1.5 text-[10px]"} rounded-xl font-semibold uppercase tracking-widest hover:bg-zepto-purple hover:text-white transition-all shadow-sm`}
          >
            {price ? "Add" : "View"}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
