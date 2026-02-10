import React, { useState, useEffect } from "react";
import { Search, MapPin, ShoppingCart, User, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass py-2" : "bg-white py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-200/50">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <span className="text-2xl font-black tracking-tighter text-gray-900 flex items-center">
              FOOD<span className="text-brand-primary">FLIE</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-all">
            <MapPin size={18} className="text-brand-primary" />
            <span className="text-xs font-bold border-b-2 border-brand-primary pb-0.5 whitespace-nowrap">
              Other
            </span>
            <span className="text-xs text-gray-400 truncate max-w-[180px] font-medium">
              Bengaluru, Karnataka, India
            </span>
            <ChevronDown
              size={14}
              className="text-brand-primary group-hover:translate-y-0.5 transition-all"
            />
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-12">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, and more..."
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-orange-50 focus:border-orange-200 selection:bg-orange-100 outline-none transition-all text-sm font-medium placeholder:text-gray-400"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-brand-primary transition-all font-semibold text-sm">
            <div className="relative">
              <ShoppingCart size={22} strokeWidth={2.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-brand-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                0
              </span>
            </div>
            <span className="hidden sm:inline">Cart</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-brand-primary transition-all font-semibold text-sm">
            <User size={22} strokeWidth={2.5} />
            <span className="hidden sm:inline">Sign In</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
