import React from "react";
import Navbar from "../../components/Navbar";
import CategoryCard from "../../components/CategoryCard";
import RestaurantCard from "../../components/RestaurantCard";
import { ArrowRight, Zap, Target, ShieldCheck, Timer } from "lucide-react";

const CATEGORIES = [
  {
    id: 1,
    title: "Gourmet Burgers",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Royal Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Hot Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Decadent Cakes",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Fresh Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=400&fit=crop",
  },
];

const RESTAURANTS = [
  {
    id: 1,
    name: "The Burger Republic",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=600&fit=crop",
    cuisines: ["Craft Burgers", "American"],
    rating: 4.8,
    time: "15-20 MINS",
    offer: "60% OFF UPTO ₹150",
    sameAsMenuPrice: true,
  },
  {
    id: 2,
    name: "Biryani Excellence",
    image:
      "https://images.unsplash.com/photo-1589302168068-1c49911d4e45?w=800&h=600&fit=crop",
    cuisines: ["Hyderabadi", "Mughlai"],
    rating: 4.6,
    time: "30-35 MINS",
    offer: "FREE DESSERT ON ₹499",
    sameAsMenuPrice: true,
  },
  {
    id: 3,
    name: "Pizza Artisan",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
    cuisines: ["Italian", "Neapolitan"],
    rating: 4.9,
    time: "20-25 MINS",
    offer: "BUY 1 GET 1 FREE",
    sameAsMenuPrice: true,
  },
  {
    id: 4,
    name: "Sushi Zen Garden",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=600&fit=crop",
    cuisines: ["Japanese", "Sushi"],
    rating: 4.7,
    time: "25-30 MINS",
    offer: "NO DELIVERY FEE",
    sameAsMenuPrice: true,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* APPETITE HERO SECTION */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-20 pt-8">
          <div className="relative rounded-[3rem] overflow-hidden h-[500px] flex items-center shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=800&fit=crop"
              className="absolute inset-0 w-full h-full object-cover"
              alt="Delicious Food"
            />
            <div className="absolute inset-0 marketing-hero-gradient" />

            <div className="relative z-10 px-12 md:px-24 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-4 py-1.5 bg-brand-primary rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Best in Class
                </div>
                <div className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                  Fastest Delivery in City
                </div>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tight mb-10">
                HUNGRY FOR <br />
                <span className="text-brand-primary">PERFECTION?</span>
              </h1>
              <p className="text-white/80 font-bold text-lg mb-12 max-w-xl">
                Experience world-class flavors delivered to your doorstep at{" "}
                <span className="text-white underline decoration-brand-primary decoration-[3px]">
                  actual restaurant prices
                </span>
                .
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <button className="bg-brand-primary hover:bg-brand-secondary text-white font-black py-5 px-12 rounded-2xl flex items-center gap-4 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-orange-500/40 active:scale-95 text-lg">
                  Order Your Feast <ArrowRight size={22} strokeWidth={3} />
                </button>
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg"
                      >
                        <img src={`https://i.pravatar.cc/100?u=${i + 10}`} />
                      </div>
                    ))}
                  </div>
                  <div className="text-white/90 text-sm font-black italic tracking-tight">
                    Joined by 12k+ Foodies
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST SIGNALS BAR */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck className="text-green-500" />,
                label: "Menu Price Policy",
                sub: "No markup, ever.",
              },
              {
                icon: <Timer className="text-blue-500" />,
                label: "25 Mins Goal",
                sub: "Fast or free.",
              },
              {
                icon: <Target className="text-orange-500" />,
                label: "Precise Tracking",
                sub: "Real-time updates.",
              },
              {
                icon: <Zap className="text-yellow-500" />,
                label: "Instant Refunds",
                sub: "No questions asked.",
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="p-3 bg-gray-50 rounded-2xl">{t.icon}</div>
                <div>
                  <div className="text-[13px] font-black text-gray-900 tracking-tight">
                    {t.label}
                  </div>
                  <div className="text-[11px] font-bold text-gray-400">
                    {t.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORY EXPLORER */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-28">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
                What's the Craving today?
              </h2>
              <div className="h-1.5 w-16 bg-brand-primary mt-3 rounded-full" />
            </div>
            <button className="text-brand-primary font-black text-sm uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="flex gap-10 overflow-x-auto pb-8 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} {...cat} />
            ))}
          </div>
        </section>

        {/* RESTAURANT MARKETPLACE */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase underline decoration-brand-primary/20 decoration-[6px] underline-offset-8">
                Top rated for you
              </h2>
              <p className="text-gray-500 font-bold mt-4">
                Handpicked elite restaurants with the best delivery performance.
              </p>
            </div>

            <div className="flex items-center gap-4">
              {["Offers", "Fastest", "Rating 4.5+", "Vegetarian"].map((f) => (
                <button
                  key={f}
                  className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-black text-gray-600 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm active:scale-95"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {RESTAURANTS.map((res) => (
              <RestaurantCard key={res.id} {...res} />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 pt-32 pb-20 rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-24">
            <div>
              <div className="text-3xl font-black text-white mb-8 tracking-tighter">
                FOOD<span className="text-brand-primary">FLIE</span>
              </div>
              <p className="text-gray-500 font-bold leading-relaxed mb-8">
                The world's first food delivery platform designed for
                transparency and elite curated taste.
              </p>
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 bg-white/5 rounded-xl border border-white/5 hover:border-brand-primary transition-colors"
                  ></div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-12">
              {[
                { t: "Company", l: ["About Us", "Team", "Careers", "Impact"] },
                {
                  t: "Legal",
                  l: ["Terms", "Privacy", "Menu Price Policy", "Trust Bar"],
                },
                { t: "Help", l: ["Support", "Partner with us", "Fleet Login"] },
              ].map((g, idx) => (
                <div key={idx}>
                  <div className="text-white/40 text-[10px] uppercase font-black tracking-[0.3em] mb-8">
                    {g.t}
                  </div>
                  <ul className="space-y-4">
                    {g.l.map((link) => (
                      <li
                        key={link}
                        className="text-gray-400 font-black text-[13px] hover:text-brand-primary cursor-pointer transition-colors"
                      >
                        {link}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <span className="text-gray-600 font-bold text-xs uppercase tracking-[0.3em]">
              © 2026 FOODFLIE PRIVATE LIMITED
            </span>
            <div className="flex gap-12">
              {["MADE IN INDIA", "ISO CERTIFIED", "FSSAI COMPLIANT"].map(
                (b) => (
                  <span
                    key={b}
                    className="text-white/10 font-bold text-[10px] tracking-widest"
                  >
                    {b}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
