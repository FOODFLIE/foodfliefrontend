import React from "react";
import { Link } from "react-router-dom";

const CartFooter = ({ count }) => {
  if (count <= 0) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6">
      <div className="bg-zepto-purple rounded-[2rem] px-10 py-6 flex items-center justify-between shadow-[0_40px_80px_rgba(94,23,235,0.4)] text-white border-t border-white/20">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center font-black text-2xl text-zepto-purple shadow-xl">
            {count}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">
              Cart Ready
            </span>
            <span className="text-2xl font-black italic font-display font-poppins">
              Proceed to Checkout
            </span>
          </div>
        </div>
        <Link
          to="/"
          className="bg-white text-zepto-purple px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
        >
          VIEW CART
        </Link>
      </div>
    </div>
  );
};

export default CartFooter;
