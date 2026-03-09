import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

const NavActions = ({
  isAuthenticated,
  user,
  onLoginClick,
  onProfileClick,
  cartCount = 0,
}) => {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <Link
        to="/partner"
        className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400 hover:text-zepto-purple transition-all duration-300 mr-2"
      >
        Partner with us
      </Link>
      <button
        onClick={isAuthenticated ? onProfileClick : onLoginClick}
        className="nav-icon-btn"
      >
        <div className="relative">
          <User
            size={22}
            className={`${isAuthenticated ? "text-zepto-purple" : "text-slate-700"}`}
          />
        </div>
        <span
          className={`text-[10px] font-semibold ${isAuthenticated ? "text-zepto-purple" : "text-slate-500"}`}
        >
          {isAuthenticated ? user?.name?.split(" ")[0] || "User" : "Login"}
        </span>
      </button>

      <Link
        to="/cart"
        className="bg-gradient-to-br from-[#8B5CF6] to-[#5e17eb] text-white px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl shadow-zepto-purple/20 hover:shadow-2xl hover:shadow-zepto-purple/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
      >
        <div className="relative">
          <ShoppingCart
            size={20}
            strokeWidth={2.5}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="absolute -top-1.5 -right-1.5 bg-[#25c861] text-[9px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            {cartCount}
          </span>
        </div>
        <span className="text-sm font-bold tracking-tight italic">My Cart</span>
      </Link>
    </div>
  );
};

export default NavActions;
