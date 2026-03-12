import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Search, ShoppingCart, User } from "lucide-react";

/**
 * Mobile bottom navigation bar - only visible on mobile devices
 * Provides quick access to Home, Search, Cart, and Account
 */
const MobileBottomNav = ({
  onSearchClick,
  onLoginClick,
  isAuthenticated,
  cartCount = 0,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      path: "/",
      action: () => navigate("/"),
    },
    {
      id: "search",
      icon: Search,
      label: "Search",
      action: onSearchClick,
    },
    {
      id: "cart",
      icon: ShoppingCart,
      label: "Cart",
      badge: cartCount,
      path: "/cart",
      action: () => navigate("/cart"),
    },
    {
      id: "account",
      icon: User,
      label: isAuthenticated ? "Account" : "Login",
      action: () => (isAuthenticated ? navigate("/profile") : onLoginClick()),
    },
  ];

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg shadow-slate-900/5 sm:hidden pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex-1 flex flex-col items-center justify-center gap-1 h-full relative transition-colors active:scale-95 ${
                active ? "text-brand" : "text-slate-500"
              }`}
              aria-label={item.label}
            >
              {/* Active Indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand rounded-b-full" />
              )}

              {/* Icon with Badge */}
              <div className="relative">
                <Icon size={24} strokeWidth={active ? 2.5 : 2} />
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold ${active ? "font-black" : "font-semibold"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
