import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { CATEGORIES, RESTAURANTS } from "../../data";
import { ChevronRight, Filter } from "lucide-react";

const CategoryProduct = () => {
  const { id } = useParams();
  const category = CATEGORIES.find((c) => c.id === parseInt(id));
  const filteredRestaurants = RESTAURANTS;

  if (!category)
    return <div className="p-20 text-center">Category not found</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      <Navbar />

      <main className="responsive-container py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-zepto-purple">
            Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-slate-600">{category.title}</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter font-poppins">
            {category.title}
          </h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-zepto-grey rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-3 mb-10 overflow-x-auto scrollbar-hide">
          {["Relevance", "Faster Delivery", "Ratings 4.0+", "Offers"].map(
            (tag) => (
              <button
                key={tag}
                className="px-5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-500 whitespace-nowrap hover:border-zepto-purple hover:text-zepto-purple transition-all"
              >
                {tag}
              </button>
            ),
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRestaurants.map((res) => (
            <ProductCard key={res.id} {...res} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryProduct;
