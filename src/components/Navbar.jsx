import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  ChevronDown,
  Bell,
} from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "glass-marketing py-3 shadow-lg" : "bg-white py-5"}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between gap-12">
        {/* Logo & Location: The Core Context */}
        <div className="flex items-center gap-12 shrink-0">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-all">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter">
              FOOD<span className="text-brand-primary">FLIE</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-100 cursor-pointer hover:border-brand-primary/30 transition-all group">
            <MapPin size={18} className="text-brand-primary" strokeWidth={3} />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">
                Deliver to
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-black text-gray-900">
                  Home • Jubilee Hills
                </span>
                <ChevronDown
                  size={14}
                  className="text-gray-400 group-hover:text-brand-primary transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Search: The Conversion Engine */}
        <div className="flex-1 max-w-2xl relative group hidden md:block">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-primary transition-colors">
            <Search size={20} strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Search for restaurants, items, or cuisines..."
            className="w-full bg-gray-50 border border-gray-100 py-4 pl-14 pr-6 rounded-[1.2rem] text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-brand-primary focus:ring-4 focus:ring-orange-500/5 transition-all"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm text-[10px] font-black text-gray-400 uppercase tracking-widest pointer-events-none">
            ⌘ K
          </div>
        </div>

        {/* Action Buttons: The Checkout Path */}
        <div className="flex items-center gap-8 shrink-0">
          <div className="hidden sm:flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
              <Bell size={20} />
            </div>
          </div>

          <div className="flex items-center gap-3 cursor-pointer group bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-brand-primary transition-all shadow-xl shadow-black/10 active:scale-95">
            <div className="relative">
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span className="absolute -top-3 -right-3 w-5 h-5 bg-brand-primary text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-gray-900">
                2
              </span>
            </div>
            <span className="text-sm font-black hidden lg:block">₹499.00</span>
          </div>

          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-gray-100 p-0.5 hover:border-brand-primary transition-all cursor-pointer shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              className="w-full h-full object-cover rounded-[0.8rem]"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
