import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-3xl ${
        isScrolled
          ? "glass-morphism py-2.5 px-6 prestige-glow"
          : "bg-transparent py-4 px-2"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Prestige Branding */}
        <div className="flex items-center gap-6">
          <div className="group cursor-pointer flex items-center gap-2.5">
            <div className="w-9 h-9 bg-prestige-accent rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-500 shadow-lg shadow-prestige-accent/20">
              <span className="text-white font-black text-xl">F</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[18px] font-black tracking-tighter text-white">
                FOOD<span className="text-prestige-accent italic">FLIE.</span>
              </span>
              <span className="text-[7px] font-black signature-tracking text-prestige-silver uppercase">
                Elite Selection
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-white/10 group cursor-pointer">
            <MapPin size={12} className="text-prestige-accent" />
            <span className="text-[11px] font-bold text-white/50 group-hover:text-white transition-colors">
              Jubilee Hills
            </span>
            <ChevronDown size={10} className="text-white/20" />
          </div>
        </div>

        {/* Functional Cluster */}
        <div className="flex items-center gap-2">
          <div className="flex items-center glass-morphism rounded-full p-1.5 gap-1 shadow-inner">
            <button className="p-2 text-white/40 hover:text-prestige-accent transition-colors">
              <Search size={16} strokeWidth={2.5} />
            </button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button className="flex items-center gap-2 group px-3 py-1.5 rounded-full hover:bg-white/5 transition-all">
              <ShoppingCart
                size={16}
                className="text-white group-hover:text-prestige-accent"
              />
              <span className="text-[11px] font-black text-white italic">
                ₹0
              </span>
            </button>
          </div>

          <button className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center hover:border-prestige-accent transition-all group overflow-hidden">
            <User
              size={18}
              className="text-white/40 group-hover:text-white transition-colors"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
