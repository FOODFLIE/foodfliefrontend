import React from "react";
import { ChevronRight, Zap } from "lucide-react";
import ProductCard from "./ProductCard";

const RestaurantSection = ({
  title,
  restaurants,
  icon: Icon = Zap,
  compact = false,
}) => {
  return (
    <section className={compact ? "mb-8" : "mb-12"}>
      <div
        className={`flex items-center justify-between ${compact ? "mb-4" : "mb-8"} px-1`}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <div
              className={`${compact ? "bg-zepto-purple/10 text-zepto-purple p-1.5" : "bg-zepto-purple text-white p-2"} rounded-lg`}
            >
              <Icon size={compact ? 16 : 18} fill="currentColor" />
            </div>
          )}
          <h3
            className={`${compact ? "text-lg" : "text-xl"} font-black text-slate-800 tracking-tight font-poppins`}
          >
            {title}
          </h3>
        </div>
        <button className="text-zepto-purple text-xs font-bold flex items-center gap-1 hover:underline">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 ${compact ? "gap-3" : "gap-6"}`}
      >
        {restaurants.map((res) => (
          <ProductCard key={res.id} {...res} compact={compact} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantSection;
