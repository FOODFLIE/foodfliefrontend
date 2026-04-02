import React, { useEffect, useState } from "react";
import { Search, Loader2, ChevronDown } from "lucide-react";
import MenuItem from "../menuItem";
import VariantModal from "../modals/variantModal";

const RestaurantMenuItems = ({
  menuItems,
  selectedCategory,
  categories,
  loading,
  error,
  addingToCart,
  quantities,
  onUpdateQuantity,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [selectedItemForVariant, setSelectedItemForVariant] = useState(null);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);


  const handleItemAdd = (item) => {
    if (item.has_variants && item.variants && item.variants.length > 0) {
      setSelectedItemForVariant(item);
      setIsVariantModalOpen(true);
    } else {
      onUpdateQuantity(item, 1);
    }
  };

  const handleVariantConfirm = (item, quantity, variantSku) => {
    onUpdateQuantity(item, quantity, variantSku);
    setIsVariantModalOpen(false);
  };

  const getItemQuantity = (item) => {
    let total = quantities[item.sku] || 0;
    if (item.variants && item.variants.length > 0) {
      item.variants.forEach((v) => {
        total += quantities[v.sku] || 0;
      });
    }
    return total;
  };

  const filteredItems = menuItems
    .filter((item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.resolvedCategoryId === selectedCategory;
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

    // Get highest rating in each subcategory
    const aHighestRating = Math.max(
      ...groupedItems[a].map((item) => item.rating || 0),
    );
    const bHighestRating = Math.max(
      ...groupedItems[b].map((item) => item.rating || 0),
    );

    // Sort by highest rating descending
    return bHighestRating - aHighestRating;
  });
  const handleSubcategory = (sub) => {
    setOpenSubcategory((prev) => (prev === sub ? null : sub));
  };
    useEffect(() => {
    if(subcategories.length > 0 && !openSubcategory) {
      setOpenSubcategory(subcategories[0])
    }
  }, [subcategories])

  return (
    <div className="lg:col-span-9 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-6 gap-4">
        <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          {selectedCategory === "All"
            ? "Menu Items"
            : categories.find((c) => String(c.id) === String(selectedCategory))
                ?.name || "Menu Items"}
          <span className="text-slate-300 font-bold ml-1">
            ({filteredItems.length})
          </span>
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
        <div className="flex flex-col">
          {subcategories.map((sub, index) => (
            <div key={sub} className="bg-white">
              {/* Thick separator between subcategories (except before the first one if it's the only one) */}
              {index > 0 && <div className="h-2 md:h-2.5 bg-slate-100/60 -mx-4 md:-mx-8"></div>}
              
              {/* Only show subcategory title if it matches the criteria */}
              {(subcategories.length > 1 || (sub !== "Other" && sub !== "")) && (
                <div
                  onClick={() => handleSubcategory(sub)}
                  className="flex items-center justify-between py-6 px-1 md:px-2 cursor-pointer border-b border-slate-100 group transition-all"
                >
                  <h3 className="text-sm md:text-base font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                    {sub} ({groupedItems[sub].length})
                  </h3>
                  <div className={`text-slate-400 group-hover:text-slate-800 transition-all duration-300 ${openSubcategory === sub ? 'rotate-180' : ''}`}>
                    <ChevronDown size={22} strokeWidth={2.5} />
                  </div>
                </div>
              )}

              {openSubcategory === sub && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12 pt-4 pb-12 animate-in fade-in slide-in-from-top-1 duration-300 px-1 md:px-2">
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
                      onAdd={() => handleItemAdd(item)}
                      onUpdateQuantity={(change) => {
                        if (item.has_variants && item.variants?.length > 0) {
                          // Find the first variant that is already in the cart to update
                          const activeVariant = item.variants.find(v => (quantities[v.sku] || 0) > 0);
                          if (activeVariant) {
                            onUpdateQuantity(item, change, activeVariant.sku);
                          } else {
                            handleItemAdd(item);
                          }
                        } else {
                          onUpdateQuantity(item, change);
                        }
                      }}
                      quantity={getItemQuantity(item)}
                      isAdding={
                        addingToCart[item.sku] ||
                        item.variants?.some((v) => addingToCart[v.sku])
                      }
                      is_veg={item.is_veg}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-400 font-bold">
          No items found matching your criteria.
        </div>
      )}

      {/* Variant Selection Modal */}
      <VariantModal
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        item={selectedItemForVariant}
        onConfirm={handleVariantConfirm}
        quantities={quantities}
        isAdding={selectedItemForVariant?.variants?.some(
          (v) => addingToCart[v.sku],
        )}
      />
    </div>
  );
};

export default RestaurantMenuItems;
