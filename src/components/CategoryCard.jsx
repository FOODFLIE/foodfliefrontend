import React from "react";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center gap-5 cursor-pointer group shrink-0">
      <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden border-8 border-white shadow-xl group-hover:shadow-2xl group-hover:border-brand-primary transition-all duration-500 transform group-hover:-translate-y-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>
      <span className="text-[14px] font-black text-gray-900 group-hover:text-brand-primary transition-all uppercase tracking-tight">
        {title}
      </span>
    </div>
  );
};

export default CategoryCard;
