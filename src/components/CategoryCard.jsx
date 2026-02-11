import React from "react";

import { Link } from "react-router-dom";

const CategoryCard = ({ id, image, title, active }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="flex flex-col items-center gap-3 cursor-pointer group shrink-0 transition-all relative py-2"
    >
      {/* PRESTIGE PLATE - High Density Scale */}
      <div className="relative w-16 h-16 md:w-24 md:h-24">
        {/* Glow Ring */}
        <div
          className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md ${active ? "opacity-100 bg-prestige-accent/30" : "bg-white/5"}`}
        />

        <div
          className={`relative w-full h-full rounded-full overflow-hidden border-2 transition-all duration-500 ${active ? "border-prestige-accent prestige-glow scale-110" : "border-white/10 group-hover:border-white/30 group-hover:scale-105"}`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prestige-dark/40 to-transparent" />
        </div>
      </div>

      <span
        className={`text-[10px] md:text-[11px] font-black tracking-tight transition-all uppercase text-center max-w-[70px] md:max-w-[100px] leading-tight ${active ? "text-prestige-accent" : "text-white/40 group-hover:text-white"}`}
      >
        {title}
      </span>
    </Link>
  );
};

export default CategoryCard;
