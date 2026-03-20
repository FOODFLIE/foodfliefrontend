import React from "react";
import { Zap } from "lucide-react";

const RestaurantCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <>
      {/* Categories Horizontal Scroll (Mobile/Tablet Only) */}
      <div className="lg:hidden flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 border-b border-slate-50">
        {categories.map((cat) => (
          <button
            key={cat.id || cat.name}
            onClick={() => onSelectCategory(cat.id || cat.name)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === (cat.id || cat.name)
                ? "bg-brand text-white"
                : "bg-brand-grey/50 text-slate-500 hover:bg-brand-grey"
            }`}
          >
            {cat.name}
            {cat.delivery_type === "fast" && (
              <span
                className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[8px] font-black uppercase ${
                  selectedCategory === (cat.id || cat.name)
                    ? "bg-white/20 text-white"
                    : "bg-brand text-white"
                }`}
              >
                <Zap size={8} fill="currentColor" /> {cat.delivery_time || 13}m
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Categories Sidebar (Desktop only) */}
      <aside className="lg:col-span-3 hidden lg:block sticky top-28 h-fit">
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-[0.2em] mb-6 pl-2 border-l-4 border-brand">
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li
              key={cat.id || cat.name}
              onClick={() => onSelectCategory(cat.id || cat.name)}
              className={`group flex items-center justify-between p-4 rounded-2xl font-bold text-sm cursor-pointer transition-all ${
                selectedCategory === (cat.id || cat.name)
                  ? "bg-brand-muted text-brand shadow-sm"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="capitalize">{cat.name}</span>
              {cat.delivery_type === "fast" && (
                <span
                  className={`flex items-center gap-0.5 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                    selectedCategory === (cat.id || cat.name)
                      ? "bg-brand text-white"
                      : "bg-brand/10 text-brand"
                  }`}
                >
                  <Zap size={10} fill="currentColor" /> {cat.delivery_time || 13}m
                </span>
              )}
            </li>
          ))}
        </ul>
      </aside>
    </  >
  );
};

export default RestaurantCategories;
