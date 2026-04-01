import React, { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import MenuItem from "../menuItem";

const RestaurantMenuItems = ({
  menuItems,
  selectedCategory,
  loading,
  error,
  addingToCart,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = menuItems
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.resolvedCategoryId === selectedCategory;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));

  // Group items by subcategory
  const groupedItems = filteredItems.reduce((acc, item) => {
    const sub = item.subcategory || "Other";
    if (!acc[sub]) {
      acc[sub] = [];
    }
    acc[sub].push(item);
    return acc;
  }, {});

  const subcategories = Object.keys(groupedItems).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  return (
    <div className="lg:col-span-9 space-y-12 md:space-y-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
        <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          {selectedCategory === "All" ? "Menu Items" : categories.find(c => String(c.id) === String(selectedCategory))?.name || "Menu Items"}
          <span className="text-slate-300 font-bold ml-1">({filteredItems.length})</span>
        </h2>
        <div className="relative w-full sm:w-auto">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish..."
            className="bg-slate-50 px-10 py-2.5 rounded-xl text-xs font-bold outline-none focus:bg-white border border-transparent focus:border-slate-100 transition-all w-full sm:w-64"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-brand animate-spin" />
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
            Fetching menu...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-brand text-white rounded-xl font-bold text-sm"
          >
            Retry
          </button>
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="space-y-12 md:space-y-16">
          {subcategories.map((sub) => (
            <div key={sub} className="space-y-8">
              {/* Only show subcategory title if there are multiple subcategories or if it's not "Other" */}
              {(subcategories.length > 1 || (sub !== "Other" && sub !== "")) && (
                <div className="flex items-center gap-4">
                  <h3 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap bg-slate-50 px-3 py-1 rounded-full">
                    {sub} • {groupedItems[sub].length}
                  </h3>
                  <div className="h-px w-full bg-gradient-to-r from-slate-100 to-transparent"></div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12">
                {groupedItems[sub].map((item) => (
                  <MenuItem
                    key={item.id || item.sku}
                    name={item.name}
                    description={
                      item.description ||
                      "Premium selection with handpicked ingredients and artisanal seasoning."
                    }
                    price={item.price}
                    image={
                      item.image ||
                      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                    }
                    onAdd={() => onAddToCart(item)}
                    isAdding={addingToCart[item.sku]}
                    is_veg={item.is_veg}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      ) : (
        <div className="text-center py-20 text-slate-400 font-bold">
          No items found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default RestaurantMenuItems;
