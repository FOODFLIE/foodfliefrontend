import React from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/Banner";
import CategorySection from "../../components/home/CategorySection";
import RestaurantChainSection from "../../components/home/RestaurantChainSection";

// Dummy data for chains
const CHAIN_RESTAURANTS = [
  {
    id: "rk-foods",
    name: "R.K Foods",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/8/18233598/0b2fd8k12k3k123k.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*", // Placeholder
    rating: 4.4,
    time: "10-15 mins",
    cuisine: "South Indian, Chinese, Juices",
    location: "Shivaji Nagar",
    discount: "ITEMS AT ₹39",
  },
  {
    id: "panthulu-tiffin",
    name: "Panthulu tiffin center",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/2/18603682/3858c63404c55214d026857112028006.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*", // Placeholder
    rating: 4.3,
    time: "50-60 mins",
    cuisine: "South Indian",
    location: "Bandla Metla",
    discount: "ITEMS AT ₹19",
  },
  {
    id: "hotel-sarovar",
    name: "Hotel Sarovar",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/8/18418048/81e5927376c729210c4d2146f481c951.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*", // Placeholder
    rating: 4.2,
    time: "30-35 mins",
    cuisine: "Biryani, North Indian, Chinese",
    location: "Bhavya Samatha Nagar",
    discount: "ITEMS AT ₹99",
  },
  {
    id: "sai-mantra",
    name: "Sai Mantra Restaurant",
    image:
      "https://b.zmtcdn.com/data/pictures/chains/8/18428048/1234567890.jpg?fit=around|771.75:416.25&crop=771.75:416.25;*,*", // Placeholder
    rating: 3.6,
    time: "35-45 mins",
    cuisine: "South Indian, Home Food",
    location: "Kammapalem",
    discount: "ITEMS AT ₹29",
  },
];

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
        <RestaurantChainSection
          title="Top restaurant chains in Ongole"
          restaurants={CHAIN_RESTAURANTS}
        />
      </main>
    </div>
  );
};

export default Home;
