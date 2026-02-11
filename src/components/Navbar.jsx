import React, { useState, useEffect } from "react";
import { Search, MapPin, ShoppingCart, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-xl py-1.5 sm:py-2 shadow-sm border-b border-gray-50" : "bg-white py-2 sm:py-3"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Micro Branding */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-brand-black rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-base sm:text-lg">
                F
              </span>
            </div>
            <span className="text-lg sm:text-xl font-black text-black tracking-tighter scale-y-110">
              FOOD
              <span className="text-brand-primary underline decoration-2 underline-offset-4">
                FLIE
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-gray-100 pl-4 group cursor-pointer">
            <MapPin size={12} className="text-brand-primary" strokeWidth={3} />
            <span className="text-[10px] sm:text-[11px] font-black text-black group-hover:text-brand-primary transition-colors">
              Jubilee Hills
            </span>
            <ChevronDown size={10} className="text-gray-300" />
          </div>
        </div>

        {/* Precision Search */}
        <div className="flex-1 max-w-lg relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-primary">
            <Search size={14} sm:size={16} strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 border-none py-1.5 sm:py-2 px-9 sm:px-10 rounded-full text-[12px] sm:text-[13px] font-bold text-black placeholder:text-gray-300 focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
        </div>

        {/* Compact Checkout */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group bg-brand-black text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-brand-primary transition-all active:scale-95">
            <ShoppingCart size={14} sm:size={16} strokeWidth={3} />
            <span className="text-[11px] sm:text-[12px] font-black hidden xs:block italic">
              ₹499
            </span>
          </div>

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-gray-100 p-0.5 hover:border-brand-primary transition-all cursor-pointer hidden sm:block">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
