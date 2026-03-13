import React from "react";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../../context/cartContext";

const NavActions = ({
  isAuthenticated,
  user,
  onLoginClick,
  onProfileClick,
  onCartClick,
}) => {
  const { cartCount, guestCartCount } = useCart();
  const displayCount = isAuthenticated ? cartCount : guestCartCount;

  return (
    <div className="hidden sm:flex items-center gap-2">
      <a
        href="/partner"
        className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400 hover:text-brand transition-all duration-300 mr-2"
      >
        Partner with us
      </a>

      <button
        onClick={isAuthenticated ? onProfileClick : onLoginClick}
        className="nav-icon-btn"
      >
        <div className="relative">
          <User
            size={22}
            className={`${isAuthenticated ? "text-brand" : "text-slate-700"}`}
          />
        </div>
        <span
          className={`text-[10px] font-semibold ${isAuthenticated ? "text-brand" : "text-slate-500"}`}
        >
          {isAuthenticated ? user?.name?.split(" ")[0] || "User" : "Login"}
        </span>
      </button>

      {/* Cart button — opens login modal if not authenticated */}
      <button
        onClick={isAuthenticated ? onCartClick : onLoginClick}
        className="bg-linear-to-br from-brand to-brand-dark text-white px-5 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl shadow-brand/20 hover:shadow-2xl hover:shadow-brand/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
      >
        <div className="relative">
          <ShoppingCart
            size={20}
            strokeWidth={2.5}
            className="group-hover:scale-110 transition-transform"
          />
          {displayCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-brand-muted text-brand text-[9px] font-semibold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {displayCount > 9 ? "9+" : displayCount}
            </span>
          )}
        </div>
        <span className="text-sm font-bold tracking-tight italic">My Cart</span>
      </button>
    </div>
  );
};

export default NavActions;
