import React from "react";
import Navbar from "../../components/Navbar";
import CategoryCard from "../../components/CategoryCard";
import RestaurantCard from "../../components/RestaurantCard";
import {
  Filter,
  ChevronRight,
  SlidersHorizontal,
  ArrowRight,
} from "lucide-react";

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
    title: "Desserts",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Chines",
    image:
      "https://images.unsplash.com/photo-1512058560550-42749359aed7?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop",
  },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "The Burger Club",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop",
    cuisines: ["Burgers", "American"],
    rating: 4.4,
    time: "25 MINS",
    offer: "60% OFF UPTO ₹120",
    sameAsMenuPrice: true,
  },
  {
    id: 2,
    name: "Aroma Biryani",
    image:
      "https://images.unsplash.com/photo-1589302168068-1c49911d4e45?w=800&h=600&fit=crop",
    cuisines: ["Biryani", "Mughlai"],
    rating: 4.2,
    time: "35 MINS",
    offer: "ITEMS AT ₹159",
    sameAsMenuPrice: true,
  },
  {
    id: 3,
    name: "Pizza Paradise",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    cuisines: ["Pizzas", "Italian"],
    rating: 4.5,
    time: "30 MINS",
    offer: "FREE DELIVERY",
    sameAsMenuPrice: false,
  },
  {
    id: 4,
    name: "Sweet Truth",
    image:
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=800&h=600&fit=crop",
    cuisines: ["Desserts", "Bakery"],
    rating: 4.3,
    time: "20 MINS",
    offer: "₹100 OFF",
    sameAsMenuPrice: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Elite Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
          <div className="relative rounded-[3rem] overflow-hidden bg-gray-900 h-[400px] flex items-center shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=800&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
            <div className="relative z-10 px-12 md:px-20 max-w-2xl">
              <span className="text-brand-primary font-black text-sm uppercase tracking-[0.3em] mb-4 block">
                Premium Delivery
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
                CRAVING <br />
                <span className="text-gradient">EXCELLENCE?</span>
              </h1>
              <button className="bg-brand-primary hover:bg-brand-secondary text-white font-black py-4 px-10 rounded-2xl flex items-center gap-3 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-orange-500/20 active:scale-95">
                Explore Now <ArrowRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </section>

        {/* Category Carousel Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
                WHAT'S ON YOUR MIND?
              </h2>
              <div className="h-1.5 w-12 bg-brand-primary mt-2 rounded-full" />
            </div>
            <div className="flex gap-3">
              <button className="p-3 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-all shadow-sm">
                <ChevronRight
                  size={20}
                  strokeWidth={3}
                  className="rotate-180"
                />
              </button>
              <button className="p-3 bg-gray-50 border border-gray-100 rounded-full hover:bg-gray-100 transition-all shadow-sm">
                <ChevronRight size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
          <div className="flex gap-10 overflow-x-auto pb-6 scrollbar-hide snap-x">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="snap-start">
                <CategoryCard {...cat} />
              </div>
            ))}
          </div>
        </section>

        {/* Restaurant List Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
                Elite Dining Near You
              </h2>
              <p className="text-gray-500 font-bold text-sm mt-1">
                Discover the finest culinary experiences curated just for you.
              </p>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl text-[13px] font-black hover:bg-brand-primary transition-all shadow-lg active:scale-95">
                Filter <SlidersHorizontal size={14} strokeWidth={3} />
              </button>
              {["Fast Delivery", "Ratings 4.0+", "Offers"].map((f) => (
                <button
                  key={f}
                  className="px-6 py-3 border border-gray-100 rounded-2xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all whitespace-nowrap active:scale-95"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {RESTAURANTS.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer minimal info */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
          <span className="text-xl font-black text-gray-400">
            FOOD<span className="text-gray-400/50">FLIE</span>
          </span>
          <p className="text-gray-400 text-xs mt-2 font-bold uppercase tracking-widest">
            © 2026 Crafted with Excellence
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
