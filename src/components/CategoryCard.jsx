import React from "react";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0 click-micro">
      {/* MICRO PLATE - High Density Scale */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-white shadow-compact group-hover:border-brand-primary transition-all duration-300">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/2 group-hover:bg-transparent transition-colors" />
      </div>

      <span className="text-[8px] sm:text-[9px] md:text-[11px] font-black text-gray-900 group-hover:text-brand-primary transition-all uppercase tracking-tighter text-center max-w-[60px] sm:max-w-[72px] md:max-w-[112px] leading-tight">
        {title}
      </span>
    </div>
  );
};

export default CategoryCard;
