import React from "react";
import Navbar from "../../components/Navbar";
import CategoryCard from "../../components/CategoryCard";
import RestaurantCard from "../../components/RestaurantCard";
import { ArrowRight, Star, Clock, BadgeCheck } from "lucide-react";

const CATEGORIES = [
  {
    id: 1,
    title: "Burgers",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Salads",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Pasta",
    image:
      "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=400&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Desserts",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&h=400&fit=crop",
  },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "Burger Republic",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
    cuisines: ["Craft Burgers"],
    rating: 4.8,
    time: "20 MINS",
    offer: "60% OFF",
    sameAsMenuPrice: true,
  },
  {
    id: 2,
    name: "Biryani Excellence",
    image:
      "https://images.unsplash.com/photo-1589302168068-1c49911d4e45?w=400&h=300&fit=crop",
    cuisines: ["Hyderabadi"],
    rating: 4.6,
    time: "35 MINS",
    offer: "FREE DESSERT",
    sameAsMenuPrice: true,
  },
  {
    id: 3,
    name: "Artisan Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    cuisines: ["Italian"],
    rating: 4.9,
    time: "25 MINS",
    offer: "BOGO",
    sameAsMenuPrice: true,
  },
  {
    id: 4,
    name: "Sushi Garden",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    cuisines: ["Japanese"],
    rating: 4.7,
    time: "30 MINS",
    offer: "FREE DEL",
    sameAsMenuPrice: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-14 sm:pt-20 pb-6 sm:pb-12">
        {/* MICRO INTRO */}
        <section className="responsive-section mb-5 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-3 sm:py-6 border-b border-gray-50">
            <div>
              <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-black tracking-tight leading-none mb-0.5">
                CRAVE <span className="text-brand-primary">DIFFERENT.</span>
              </h1>
              <p className="text-[9px] sm:text-[11px] font-black text-gray-300 uppercase tracking-widest">
                Premium Selection • Original Prices
              </p>
            </div>
            <div className="flex self-start sm:self-auto">
              <div className="px-2 py-1 bg-brand-neutral rounded-lg border border-gray-100 flex items-center gap-1 sm:gap-2">
                <BadgeCheck
                  size={9}
                  sm:size={12}
                  className="text-brand-primary"
                  strokeWidth={3}
                />
                <span className="text-[8px] sm:text-[10px] font-black text-black uppercase tracking-tight">
                  Price Sync Active
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* MICRO SELECTION - CATEGORIES */}
        <section className="responsive-section mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-3.5 sm:mb-6">
            <h2 className="text-[9px] sm:text-sm font-black tracking-widest uppercase text-gray-400">
              Categories
            </h2>
            <button className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-brand-primary flex items-center gap-0.5 sm:gap-1 group">
              All{" "}
              <ArrowRight
                size={8}
                sm:size={10}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
          <div className="plate-grid-tight pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </section>

        {/* HIGH DENSITY GRID - RESTAURANTS */}
        <section className="responsive-section">
          <div className="mb-5 sm:mb-8">
            <h2 className="text-base sm:text-xl font-black text-black tracking-tight uppercase mb-2.5 sm:mb-4">
              Nearby Selection
            </h2>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {["Ratings 4.5+", "Under 30m", "Hot Offers"].map((f) => (
                <button
                  key={f}
                  className="px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-lg border border-gray-100 text-[8px] sm:text-[10px] font-black text-gray-400 uppercase tracking-tight hover:border-black hover:text-black transition-all"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* DENSE GRID: 2 COLS ON MOBILE, 3 ON TABLET, 4 ON DESKTOP */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {RESTAURANTS.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))}
          </div>
        </section>

        {/* COMPACT TRUST BAR */}
        <section className="responsive-section mt-12 sm:mt-16">
          <div className="bg-brand-black rounded-xl sm:rounded-2xl p-5 sm:p-10 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                  NO MARKUPS.{" "}
                  <span className="text-brand-primary italic">PERIOD.</span>
                </h2>
                <p className="text-[9px] sm:text-[10px] font-bold text-white/30 uppercase tracking-widest">
                  We match every restaurant menu price.
                </p>
              </div>
              <button className="compact-button w-full md:w-auto">
                Learn About Price Sync
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white pt-12 sm:pt-16 pb-6 sm:pb-8 border-t border-gray-50">
        <div className="responsive-section">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-xl sm:text-2xl font-black text-black tracking-tighter">
              FOOD<span className="text-brand-primary">FLIE.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {["Vision", "Privacy", "Partners", "Support"].map((link) => (
                <span
                  key={link}
                  className="text-[9px] sm:text-[10px] font-black text-gray-300 hover:text-black cursor-pointer uppercase tracking-widest transition-colors"
                >
                  {link}
                </span>
              ))}
            </div>
          </div>
          <div className="text-center">
            <span className="text-[8px] sm:text-[9px] font-black text-gray-200 uppercase tracking-[0.5em]">
              © 2026 FOODFLIE • PRECISION QUALITY
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
