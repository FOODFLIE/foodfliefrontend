import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  BadgeCheck,
} from "lucide-react";
import AuthModal from "./AuthModal";
import MobileBottomNav from "./navigation/MobileBottomNav";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="responsive-container py-3 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: Branding & Location */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-black text-zepto-purple tracking-tighter italic font-poppins"
            >
              Food Flie
            </Link>

            {/* Location - Visible on all screens, compact on mobile */}
            <div className="flex flex-col cursor-pointer group">
              <div className="flex items-center gap-1 text-slate-800 font-bold">
                <span className="text-[10px] sm:text-xs">
                  <span className="hidden sm:inline">Delivering in </span>
                  <span className="text-zepto-purple animate-pulse">
                    10 Min
                  </span>
                </span>
                <ChevronDown
                  size={14}
                  className="text-zepto-purple group-hover:translate-y-0.5 transition-transform"
                />
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <MapPin size={12} />
                <span className="text-[10px] font-medium truncate max-w-[100px] sm:max-w-[120px]">
                  Jubilee Hills, Hyd...
                </span>
              </div>
            </div>
          </div>

          {/* Center: Wide Search Bar - Hidden on Mobile */}
          <div className="hidden sm:flex flex-1 max-w-2xl items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Search size={18} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search for 'milk', 'bread' or 'chips'"
                className="w-full bg-zepto-grey border border-transparent focus:bg-white focus:border-zepto-purple/20 h-11 pl-12 pr-4 rounded-xl text-sm font-medium transition-all outline-none"
              />
            </div>
            <div className="hidden lg:flex items-center gap-1.5 whitespace-nowrap px-3 py-2 bg-zepto-light rounded-xl border border-zepto-purple/5">
              <BadgeCheck size={16} className="text-zepto-green" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zepto-purple/60">
                Menu Prices Guaranteed
              </span>
            </div>
          </div>

          {/* Right: Actions - Hidden on Mobile (in bottom nav instead) */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/partner"
              className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-zepto-purple transition-colors mr-2"
            >
              Partner with us
            </Link>
            <button
              onClick={() =>
                isAuthenticated
                  ? navigate("/profile")
                  : setIsAuthModalOpen(true)
              }
              className="nav-icon-btn"
            >
              <div className="relative">
                <User
                  size={22}
                  className={`${isAuthenticated ? "text-zepto-purple" : "text-slate-700"}`}
                />
              </div>
              <span
                className={`text-[10px] font-bold ${isAuthenticated ? "text-zepto-purple" : "text-slate-500"}`}
              >
                {isAuthenticated
                  ? user?.name?.split(" ")[0] || "User"
                  : "Login"}
              </span>
            </button>

            <Link
              to="/cart"
              style={{ backgroundColor: '#8B5CF6' }}
              className="text-white px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-lg hover:opacity-90 transition-all"
            >
              <div className="relative">
                <ShoppingCart size={20} strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 bg-green-500 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  0
                </span>
              </div>
              <span className="text-sm font-bold truncate italic">My Cart</span>
            </Link>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </nav>

      {/* Mobile Bottom Navigation - Only on Mobile */}
      <MobileBottomNav
        onSearchClick={() => setIsSearchOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        cartCount={0}
      />

      {/* TODO: Add Search Overlay/Modal for mobile */}
    </>
  );
};

export default Navbar;
