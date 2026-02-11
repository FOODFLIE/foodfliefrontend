import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { RESTAURANTS } from "../../data";
import {
  ArrowLeft,
  Star,
  Clock,
  Heart,
  Share2,
  Info,
  Plus,
} from "lucide-react";

// Mock Menu Data
const MENU_CATEGORIES = [
  {
    title: "Signature Classics",
    items: [
      {
        id: 101,
        name: "Truffle Umami Burger",
        price: 599,
        desc: "Aged wagyu beef, black truffle aioli, melted brie.",
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop",
      },
      {
        id: 102,
        name: "Gold Leaf Saffron Biryani",
        price: 899,
        desc: "Hand-picked strands of saffron, tender lamb, edible 24k gold.",
        image:
          "https://images.unsplash.com/photo-1589302168068-1c49911d4e45?w=200&h=200&fit=crop",
      },
    ],
  },
  {
    title: "Artisanal Sides",
    items: [
      {
        id: 201,
        name: "Parmesan Dust Fries",
        price: 299,
        desc: "Triple cooked fries with 24-month aged parmesan.",
        image:
          "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop",
      },
    ],
  },
];

const RestaurantDetail = () => {
  const { id } = useParams();
  const restaurant = RESTAURANTS.find((r) => r.id === parseInt(id));
  const [cartCount, setCartCount] = useState(0);

  if (!restaurant)
    return <div className="text-white p-10">Restaurant not found</div>;

  return (
    <div className="min-h-screen bg-prestige-dark text-white selection:bg-prestige-accent/30 selection:text-white pb-32">
      <Navbar />

      {/* Immersive Header */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={restaurant.image}
            className="w-full h-full object-cover scale-110 blur-[2px] opacity-40"
            alt={restaurant.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-prestige-dark via-prestige-dark/40 to-transparent" />
        </div>

        <div className="responsive-section relative h-full flex flex-col justify-end pb-12">
          <Link
            to="/"
            className="absolute top-28 left-4 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Back to Gallery
            </span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 glass-morphism rounded-lg border-prestige-accent/30 flex items-center gap-2">
                  <Star
                    size={12}
                    className="fill-prestige-accent text-prestige-accent"
                  />
                  <span className="text-xs font-black">
                    {restaurant.rating}
                  </span>
                </div>
                <span className="text-[10px] font-black text-prestige-accent uppercase tracking-widest">
                  Signature Certified
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none uppercase">
                {restaurant.name}
              </h1>
              <p className="text-[10px] md:text-[12px] font-bold text-prestige-silver/60 uppercase tracking-[0.2em]">
                {restaurant.cuisines.join(" • ")} • Jubillee Hills
              </p>
            </div>

            <div className="flex gap-2">
              {[Heart, Share2, Info].map((Icon, i) => (
                <button
                  key={i}
                  className="w-12 h-12 rounded-2xl glass-morphism flex items-center justify-center hover:border-prestige-accent transition-all"
                >
                  <Icon
                    size={18}
                    className="text-white/40 hover:text-white transition-colors"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <main className="responsive-section mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          {MENU_CATEGORIES.map((category) => (
            <div key={category.title} className="space-y-8">
              <div className="flex flex-col gap-1 border-l-4 border-prestige-accent pl-6">
                <h2 className="text-xl font-black tracking-tight uppercase">
                  {category.title}
                </h2>
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                  {category.items.length} SIGNATURE CREATIONS
                </span>
              </div>

              <div className="grid gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    className="glass-morphism rounded-[2rem] p-6 border-white/5 flex gap-6 group hover:border-white/10 transition-all"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-green-500 flex items-center justify-center p-0.5">
                          <div className="w-1 h-1 rounded-full bg-green-500" />
                        </div>
                        <h3 className="text-[16px] font-black tracking-tight uppercase">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-xs text-prestige-silver/40 font-medium leading-relaxed italic">
                        {item.desc}
                      </p>
                      <div className="pt-2 flex items-center gap-4">
                        <span className="text-sm font-black text-prestige-accent font-outfit">
                          ₹{item.price}
                        </span>
                        <button
                          onClick={() => setCartCount((prev) => prev + 1)}
                          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 border border-white/5 hover:bg-prestige-accent hover:border-prestige-accent text-white transition-all group/btn"
                        >
                          <Plus
                            size={14}
                            className="group-hover/btn:rotate-90 transition-transform"
                          />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Add Item
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 border border-white/5">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        alt={item.name}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="sticky top-32 glass-morphism rounded-[2.5rem] p-8 space-y-8 border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">
                  Delivery Time
                </span>
                <span className="text-lg font-black">{restaurant.time}</span>
              </div>
              <Clock
                size={24}
                className="text-prestige-accent"
                strokeWidth={2.5}
              />
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest">
                Offers Protocol
              </h4>
              <div className="p-4 rounded-2xl bg-prestige-accent/5 border border-prestige-accent/10 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-prestige-accent flex items-center justify-center shadow-lg shadow-prestige-accent/20">
                  <span className="text-[10px] font-black">%</span>
                </div>
                <span className="text-xs font-black text-white italic">
                  {restaurant.offer}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* PERSISTENT CART BRIDGE */}
      {cartCount > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="glass-morphism rounded-full px-8 py-4 flex items-center gap-12 shadow-2xl border-prestige-accent/20 prestige-glow">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-black text-sm">
                {cartCount}
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">
                  Checkout Value
                </span>
                <span className="text-sm font-black italic text-prestige-accent">
                  Signature Selection Active
                </span>
              </div>
            </div>
            <Link
              to="/"
              className="compact-button shadow-2xl shadow-prestige-accent/40"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetail;
