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
    <div className="min-h-screen bg-prestige-dark text-white selection:bg-prestige-accent/30 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-12">
        {/* ARTISTIC HERO - Abstract Mesh */}
        <section className="responsive-section mb-12">
          <div className="relative h-[240px] md:h-[320px] rounded-[2.5rem] overflow-hidden mesh-gradient prestige-glow border border-white/5 flex flex-col items-center justify-center text-center p-8 group">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 bg-prestige-accent/10 blur-[100px] rounded-full animate-pulse" />
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-prestige-accent/5 blur-[80px] rounded-full animate-pulse decoration-1000" />
            </div>

            <div className="relative z-10 space-y-4">
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
                UNCOMPROMISED <br />
                <span className="text-prestige-accent italic">FLAVOR.</span>
              </h1>
              <p className="text-[10px] md:text-[12px] font-black signature-tracking text-prestige-silver uppercase">
                Artisanal Curation • Zero Markup • Absolute Precision
              </p>
            </div>

            {/* Interactive Floating Detail */}
            <div className="absolute bottom-6 right-8 hidden md:flex items-center gap-3 glass-morphism px-4 py-2 rounded-2xl animate-bounce duration-3000">
              <div className="w-2 h-2 rounded-full bg-prestige-accent prestige-glow" />
              <span className="text-[10px] font-bold text-white/60">
                Elite Access Active
              </span>
            </div>
          </div>
        </section>

        {/* SIGNATURE SELECTION - CATEGORIES */}
        <section className="responsive-section mb-16">
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex flex-col">
              <h2 className="text-sm font-black signature-tracking uppercase text-prestige-silver opacity-50 mb-1">
                The Gallery
              </h2>
              <span className="text-xl font-black text-white tracking-tight">
                Artisanal Selection
              </span>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest text-prestige-accent flex items-center gap-2 group hover:gap-3 transition-all">
              VIEW ALL{" "}
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
          <div className="plate-grid-tight pb-6 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </section>

        {/* HIGH DENSITY GRID - RESTAURANTS */}
        <section className="responsive-section">
          <div className="mb-10 px-2 flex items-center justify-between">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">
              Elite Selection
            </h2>
            <div className="flex gap-2">
              {["Ratings 4.5+", "Under 30m"].map((f) => (
                <button
                  key={f}
                  className="px-4 py-1.5 rounded-full border border-white/5 text-[9px] font-black text-prestige-silver/40 uppercase tracking-widest hover:border-prestige-accent hover:text-white transition-all glass-morphism"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {RESTAURANTS.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))}
          </div>
        </section>

        {/* COMPACT TRUST BAR */}
    
      </main>

      <footer className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-prestige-dark to-black opacity-50" />
        <div className="responsive-section relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="text-3xl font-black text-white tracking-tighter mb-6">
                FOOD<span className="text-prestige-accent italic">FLIE.</span>
              </div>
              <p className="text-prestige-silver/30 text-xs font-bold leading-relaxed max-w-sm">
                Redefining the digital dining experience through precision
                curation and uncompromised quality. The elite choice for the
                modern connoisseur.
              </p>
            </div>
            {["Services", "Company"].map((title, i) => (
              <div key={title} className="flex flex-col gap-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  {title}
                </h4>
                <div className="flex flex-col gap-2">
                  {i === 0
                    ? ["Selection", "Fast Track", "Protocol", "Support"].map(
                        (l) => (
                          <span
                            key={l}
                            className="text-xs font-bold text-prestige-silver/40 hover:text-prestige-accent cursor-pointer transition-colors"
                          >
                            {l}
                          </span>
                        ),
                      )
                    : ["Our Vision", "Partners", "Careers", "Legal"].map(
                        (l) => (
                          <span
                            key={l}
                            className="text-xs font-bold text-prestige-silver/40 hover:text-prestige-accent cursor-pointer transition-colors"
                          >
                            {l}
                          </span>
                        ),
                      )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.8em]">
              © 2026 FOODFLIE • PRECISION CURATION
            </span>
            <div className="flex gap-8">
              {["TW", "IG", "FB"].map((s) => (
                <span
                  key={s}
                  className="text-[10px] font-black text-white/20 hover:text-white cursor-pointer transition-colors tracking-widest"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
