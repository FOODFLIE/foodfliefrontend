import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ id, title, image }) => {
  return (
    <Link
      to={`/category/${id}`}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-zepto-grey p-1 overflow-hidden group-hover:shadow-md transition-all group-hover:scale-110">
        <div className="w-full h-full rounded-full overflow-hidden bg-white">
          <img
            src={image}
            className="w-full h-full object-cover p-2"
            alt={title}
          />
        </div>
      </div>
      <span className="text-[11px] font-bold text-slate-600 text-center leading-[1.2] group-hover:text-zepto-purple transition-colors">
        {title}
      </span>
    </Link>
  );
};

export default CategoryItem;
