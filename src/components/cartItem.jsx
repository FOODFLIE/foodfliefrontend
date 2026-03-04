import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="p-6 md:p-8 hover:bg-slate-50/60 transition-colors group relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
        <div className="flex-1 w-full">
          <div className="flex items-start gap-3 mb-2">
            <div className="flex-shrink-0 w-4 h-4 mt-1 border border-green-500 flex items-center justify-center rounded-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <h3 className="text-xl md:text-[1.35rem] leading-tight font-black text-slate-800 group-hover:text-zepto-purple transition-colors">
                {item.product_name}
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                Ref: {item.sku}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <p className="text-xl font-black text-slate-900 tracking-tight">
              ₹{parseFloat(item.price).toFixed(2)}
            </p>
            <button
              onClick={() => onRemove(item.id)}
              className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-md transition-all opacity-0 group-hover:opacity-100 -ml-2"
            >
              <Trash2 size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-5">
          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm hover:shadow hover:border-slate-300 transition-all">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-10 h-10 flex items-center justify-center bg-slate-50/80 rounded-[0.85rem] hover:bg-slate-100 hover:text-rose-500 transition-all active:scale-95"
            >
              {item.quantity === 1 ? (
                <Trash2 size={18} strokeWidth={2.5} className="text-slate-400" />
              ) : (
                <Minus size={18} strokeWidth={2.5} className="text-slate-600" />
              )}
            </button>
            <span className="w-12 text-center font-black text-slate-800 text-lg">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-10 h-10 flex items-center justify-center bg-slate-50/80 rounded-[0.85rem] hover:bg-slate-100 hover:text-zepto-green transition-all active:scale-95"
            >
              <Plus size={18} strokeWidth={2.5} className="text-slate-600" />
            </button>
          </div>

          <div className="text-right flex flex-col items-end">
            <p className="text-lg font-black text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              ₹{parseFloat(item.total_price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
