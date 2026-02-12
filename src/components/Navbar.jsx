import React from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  MapPin,
  ChevronDown,
  BadgeCheck,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="responsive-container py-3 flex items-center justify-between gap-8">
        {/* Left: Branding & Location */}
        <div className="flex items-center gap-6 shrink-0">
          <Link
            to="/"
            className="text-2xl font-black text-zepto-purple tracking-tighter italic font-poppins"
          >
            Food Flie
          </Link>

          <div className="hidden md:flex flex-col cursor-pointer group">
            <div className="flex items-center gap-1 text-slate-800 font-bold">
              <span className="text-xs">
                Delivering in{" "}
                <span className="text-zepto-purple animate-pulse">10 Mins</span>
              </span>
              <ChevronDown
                size={14}
                className="text-zepto-purple group-hover:translate-y-0.5 transition-transform"
              />
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin size={12} />
              <span className="text-[10px] font-medium truncate max-w-[120px]">
                Jubilee Hills, Hyderabad...
              </span>
            </div>
          </div>
        </div>

        {/* Center: Wide Search Bar */}
        <div className="flex-1 max-w-2xl flex items-center gap-4">
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

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <button className="nav-icon-btn hidden sm:flex">
            <div className="relative">
              <User size={22} className="text-slate-700" />
            </div>
            <span className="text-[10px] font-bold text-slate-500">Login</span>
          </button>

          <button className="bg-zepto-purple text-white px-4 py-2.5 rounded-xl flex items-center gap-3 shadow-lg shadow-zepto-purple/20 hover:bg-zepto-dark transition-all">
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 bg-zepto-green text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-zepto-purple">
                0
              </span>
            </div>
            <span className="text-sm font-bold truncate italic">My Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
