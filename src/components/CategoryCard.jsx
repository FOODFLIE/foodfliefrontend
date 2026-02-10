import React from "react";

const CategoryCard = ({ image, title }) => {
  return (
    <div className="flex flex-col items-center gap-4 cursor-pointer group shrink-0">
      <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 ring-1 ring-gray-100 group-hover:ring-orange-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      <span className="text-[13px] font-black text-gray-900 group-hover:text-brand-primary transition-colors tracking-tight uppercase">
        {title}
      </span>
    </div>
  );
};

export default CategoryCard;
