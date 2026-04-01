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
  is_active,
  time,
  price,
  area,
  compact = false,
}) => {
  return (
    <div
      className={`relative ${
        !is_active ? "opacity-60 pointer-events-none" : ""
      }`}
    >
      {/* Link wrapper */}
      <Link
        to={is_active ? `/restaurant/${id}` : "#"} // ❌ block navigation
        className={`bg-white border border-slate-100 rounded-2xl ${
          compact ? "p-3" : "p-4"
        } hover:shadow-xl transition-all group cursor-pointer overflow-hidden`}
      >
        {/* Offer */}
        {offer && (
          <div
            className={`absolute top-0 left-0 bg-brand text-white ${
              compact ? "px-2 py-1 text-[8px]" : "px-2.5 py-1.5 text-[9px]"
            } font-semibold z-10 flex items-center gap-1 rounded-br-xl`}
          >
            <Zap size={compact ? 8 : 10} fill="currentColor" /> {offer}
          </div>
        )}

        {/* Menu Price */}
        {sameAsMenuPrice && (
          <div
            className={`absolute top-2 right-2 bg-brand-dark text-white ${
              compact ? "px-1.5 py-0.5 text-[7px]" : "px-2 py-0.5 text-[8px]"
            } font-semibold z-20 flex items-center gap-1 rounded-full`}
          >
            <BadgeCheck size={compact ? 8 : 10} /> Menu Price
          </div>
        )}

        {/* Image */}
        <div
          className={`w-full aspect-square rounded-xl overflow-hidden ${
            compact ? "mb-2" : "mb-4"
          } relative bg-slate-50`}
        >
          <img
            src={
              image ||
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400"
            }
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            alt={store_name}
          />

          {/* Time */}
          <div className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 rounded-lg flex items-center gap-1">
            <Zap
              size={compact ? 10 : 12}
              className="text-brand"
              fill="currentColor"
            />
            <span className="text-[10px] font-semibold">
              {time || "10 MINS"}
            </span>
          </div>

          {/* 🔥 Unavailable Overlay */}
          {!is_active && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <span className="text-red-500 font-bold text-sm">
                Store is currently closed
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h4 className="font-semibold text-sm truncate capitalize">
            {store_name}
          </h4>

          <p className="text-xs text-slate-400 truncate">
            {area ? `${area} • ` : ""}
            {cuisines?.join
              ? cuisines.join(", ")
              : cuisines || "Restaurant"}
          </p>

          <div className="pt-3 mt-3 border-t flex justify-between">
            <button className="border-2 border-brand text-brand px-4 py-1 rounded-xl text-xs font-semibold">
              {price ? "Add" : "View"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;