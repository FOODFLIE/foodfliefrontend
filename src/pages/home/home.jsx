import React from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import CategorySection from "../../components/home/categorySection";
import RestaurantChainSection from "../../components/home/restaurantChainSection";

const Home = () => {
  return (
    <div className="bg-white pb-20">
      <main className="responsive-container py-6">
        {/* Banner Section */}
        <Banner
          image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&h=400&fit=crop"
          badgeText="10 Minutes.  Menu Prices Guaranteed."
          title="HOT BIRYANI"
          titleHighlight="NO OVERPAYING"
          subtitle="We’re testing in your neighborhood. Get biryani in minutes at Menu prices."
        />

        {/* New Categories Section */}
        <CategorySection />

        {/* Top Restaurant Chains */}
        <RestaurantChainSection title="Top restaurant chains in Ongole" />
      </main>
    </div>
  );
};

export default Home;
