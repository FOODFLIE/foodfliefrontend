import React from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import CategoryItem from "../../components/CategoryItem";
import RestaurantSection from "../../components/RestaurantSection";
import { CATEGORIES, RESTAURANTS } from "../../data";
import { ChevronRight, Zap } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white pb-20">
      <Navbar />

      <main className="responsive-container py-6">
        {/* Banner Section */}
        <Banner
          image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&h=400&fit=crop"
          badgeText="10 Minutes.  Menu Prices Guaranteed."
          title="HOT BIRYANI"
          titleHighlight="NO OVERPAYING"
          subtitle="We’re testing in your neighborhood. Get biryani in minutes at Menu prices."
        />

        {/* Categories Grid */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-xl font-black text-slate-800 tracking-tight font-poppins">
              Categories At Menu Price
            </h3>
            <button className="text-zepto-purple text-sm font-bold flex items-center gap-1 hover:underline">
              See All <ChevronRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-y-8 gap-x-4">
            {CATEGORIES.map((cat) => (
              <CategoryItem
                key={cat.id}
                id={cat.id}
                title={cat.title}
                image={cat.image}
              />
            ))}
          </div>
        </section>

        {/* Featured Section - Compact & Extracted */}
        <RestaurantSection
          title="10-Min Delivery At Menu Price"
          restaurants={RESTAURANTS}
          icon={Zap}
          compact={true}
        />
      </main>
    </div>
  );
};

export default Home;
