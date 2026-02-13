import React from "react";
import { Plus } from "lucide-react";

const MenuItem = ({ name, description, price, image, onAdd }) => {
  return (
    <div className="flex gap-6 p-6 rounded-3xl border border-slate-50 bg-white hover:border-zepto-purple/20 transition-all group shadow-sm hover:shadow-xl">
      <div className="flex-1 space-y-3">
        <h4 className="font-black text-slate-800 text-lg tracking-tight group-hover:text-zepto-purple transition-colors font-poppins">
          {name}
        </h4>
        <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
          {description}
        </p>
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xl font-black text-slate-800 font-display">
            ₹{price}
          </span>
          <button
            onClick={onAdd}
            className="bg-white border-2 border-zepto-purple text-zepto-purple px-8 py-2 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zepto-purple hover:text-white transition-all flex items-center gap-2 shadow-sm"
          >
            <Plus size={14} strokeWidth={3} /> Add
          </button>
        </div>
      </div>
      <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 shadow-lg rotate-3 group-hover:rotate-0 transition-transform bg-slate-100">
        <img
          src={image}
          className="w-full h-full object-cover p-1 rounded-2xl"
          alt={name}
        />
      </div>
    </div>
  );
};

export default MenuItem;
