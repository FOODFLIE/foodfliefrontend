import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import RestaurantCard from "../../components/RestaurantCard";
import { CATEGORIES, RESTAURANTS } from "../../data";
import { ArrowLeft, SlidersHorizontal, ChevronDown } from "lucide-react";

const CategoryProduct = () => {
  const { id } = useParams();
  const category = CATEGORIES.find((c) => c.id === parseInt(id));

  // Mock filtering: just show all restaurants for now,
  // in a real app would filter by category.
  const filteredRestaurants = RESTAURANTS;

  if (!category)
    return <div className="text-white p-10">Category not found</div>;

  return (
    <div className="min-h-screen bg-prestige-dark text-white selection:bg-prestige-accent/30 selection:text-white">
      <Navbar />

      <main className="pt-28 pb-12">
        {/* Dynamic Header */}
        <section className="responsive-section mb-12">
          <div className="relative h-[200px] md:h-[240px] rounded-[2.5rem] overflow-hidden mesh-gradient prestige-glow border border-white/5 flex flex-col items-center justify-center text-center p-8">
            <Link
              to="/"
              className="absolute top-6 left-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Back to Gallery
              </span>
            </Link>

            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase">
                {category.title}
              </h1>
              <p className="text-[10px] md:text-[11px] font-black signature-tracking text-prestige-silver uppercase mt-3">
                Signature Selection • Handpicked for You
              </p>
            </div>

            <div className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-prestige-accent to-transparent" />
          </div>
        </section>

        {/* Floating Glass Filter Bar */}
        <section className="responsive-section mb-10">
          <div className="glass-morphism rounded-full px-6 py-3 flex items-center justify-between shadow-2xl border-white/5 mx-2">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              {["Sort By", "Cuisines", "Ratings", "Offers"].map((filter) => (
                <button
                  key={filter}
                  className="flex items-center gap-2 group whitespace-nowrap"
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-prestige-silver/60 group-hover:text-white transition-colors">
                    {filter}
                  </span>
                  <ChevronDown size={10} className="text-prestige-accent" />
                </button>
              ))}
            </div>
            <div className="w-px h-4 bg-white/10 mx-4 hidden md:block" />
            <button className="flex items-center gap-2 group shrink-0">
              <SlidersHorizontal size={14} className="text-prestige-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">
                More Filters
              </span>
            </button>
          </div>
        </section>

        {/* Results Grid */}
        <section className="responsive-section">
          <div className="mb-8 px-2">
            <h2 className="text-sm font-black signature-tracking uppercase text-prestige-silver opacity-50">
              {filteredRestaurants.length} Results in {category.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredRestaurants.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))}
          </div>
        </section>
      </main>

      {/* Persistence Simple Footer */}
      <footer className="py-12 border-t border-white/5 opacity-50">
        <div className="responsive-section text-center">
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.8em]">
            Neo-Prestige Quality Assurance
          </span>
        </div>
      </footer>
    </div>
  );
};

export default CategoryProduct;
