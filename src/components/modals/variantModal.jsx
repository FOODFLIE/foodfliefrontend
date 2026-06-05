import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

const VariantModal = ({ isOpen, onClose, item, onConfirm, isAdding }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isOpen && item && item.variants && item.variants.length > 0) {
      // Pre-select the first available variant
      const firstAvailable =
        item.variants.find((v) => v.is_available) || item.variants[0];
      setSelectedVariant(firstAvailable);
      setQuantity(1);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = selectedVariant
    ? (parseFloat(selectedVariant.price) * quantity).toFixed(2)
    : (parseFloat(item.price) * quantity).toFixed(2);

  const handleAdd = () => {
    if (selectedVariant) {
      onConfirm(item, quantity, selectedVariant.sku);
    }
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white w-full sm:max-w-md rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[90vh]">
        {/* Close Button - Floating */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 bg-slate-800/80 hover:bg-slate-900 text-white p-2 rounded-full transition-all shadow-lg"
        >
          <X size={20} />
        </button>

        {/* Content Area (Scrollable) */}
        <div className="overflow-y-auto pb-32">
          {/* Header Info */}
          <div className="p-6 pb-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm bg-slate-50 shrink-0">
              <img
                src={
                  item.image ||
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                }
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 leading-tight">
                {item.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {item.is_veg !== undefined && (
                  <div
                    className={`w-3.5 h-3.5 border ${item.is_veg ? "border-green-500" : "border-red-500"} flex items-center justify-center rounded-sm`}
                  >
                    <div
                      className={`w-1.5 h-1.5 ${item.is_veg ? "bg-green-500" : "bg-red-500"} rounded-full`}
                    ></div>
                  </div>
                )}
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Customize your meal
                </span>
              </div>
            </div>
          </div>

          {/* Bunny Helper Area */}
          <div className="px-6 py-2">
            <div className="bg-[#EEF1FF] rounded-[24px] p-4 flex items-center gap-4 border border-indigo-50 relative overflow-hidden group">
              <div className="w-12 h-12 shrink-0 animate-bounce">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2663/2663067.png"
                  alt="Bunny"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-[#5D5FEF] text-[11px] font-black leading-relaxed">
                  Hi, we've preselected some popular choices to help you place
                  the order faster!
                </p>
              </div>
              {/* Decorative circle */}
              <div className="absolute -right-4 -top-4 w-12 h-12 bg-white/20 rounded-full blur-xl" />
            </div>
          </div>

          {/* Quantity Section Title */}
          <div className="px-6 pt-6 pb-2">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center justify-between">
              Quantity
              <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-2 py-0.5 rounded-full lowercase">
                select any 1
              </span>
            </h3>
          </div>

          {/* Variants List */}
          <div className="px-5 space-y-2">
            {item.variants?.map((v) => (
              <label
                key={v.id}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                  selectedVariant?.id === v.id
                    ? "border-brand bg-brand/5 shadow-sm"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name="variant"
                  className="hidden"
                  checked={selectedVariant?.id === v.id}
                  onChange={() => setSelectedVariant(v)}
                />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                      selectedVariant?.id === v.id
                        ? "border-brand bg-brand"
                        : "border-slate-300 group-hover:border-slate-400"
                    }`}
                  >
                    {selectedVariant?.id === v.id && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                    )}
                  </div>
                  <span
                    className={`font-black text-sm transition-colors ${
                      selectedVariant?.id === v.id
                        ? "text-brand"
                        : "text-slate-700"
                    }`}
                  >
                    {v.name}
                  </span>
                </div>

                <span
                  className={`font-display text-sm font-black ${
                    selectedVariant?.id === v.id
                      ? "text-brand"
                      : "text-slate-500"
                  }`}
                >
                  ₹{v.price}
                </span>
              </label>
            ))}
          </div>

          {/* Add-on Placeholder (Optional, just to match the visual) */}
          <div className="px-6 pt-8 pb-2">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center justify-between">
              Add - On
              <button className="text-[10px] text-brand font-black bg-brand/10 px-3 py-1 rounded-full uppercase">
                Select All
              </button>
            </h3>
          </div>
          <div className="px-6 pb-4">
            <p className="text-[10px] text-slate-400 font-bold">
              Recommended pairings for your {item.name}
            </p>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-100 shadow-inner">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-brand transition-colors rounded-xl hover:bg-white"
            >
              <Minus size={18} />
            </button>
            <span className="w-8 text-center font-display font-black text-slate-800 text-lg">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-brand transition-colors rounded-xl hover:bg-white"
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`flex-1 h-12 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-brand/20 ${
              isAdding
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-brand text-white hover:bg-brand-dark"
            }`}
          >
            {isAdding ? (
              "Adding..."
            ) : (
              <>
                <ShoppingBag size={18} />
                Add Item | ₹{totalPrice}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantModal;
