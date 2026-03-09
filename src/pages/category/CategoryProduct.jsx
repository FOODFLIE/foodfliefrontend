import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/productCard";
import { CATEGORIES, RESTAURANTS } from "../../data";
import { ChevronRight, Filter, Loader2 } from "lucide-react";
import { getProductsByCategory } from "../../services/productService";
import SEO from "../../components/common/seo";

const CategoryProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const category = CATEGORIES.find((c) => c.id === parseInt(id));

  const [restaurants, setRestaurants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurantsForCategory = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const responseData = await getProductsByCategory(id);

        // Extract the restaurant array from potentially nested data
        const restaurantList = Array.isArray(responseData)
          ? responseData
          : responseData?.data || [];

        setRestaurants(restaurantList);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products for category:", err);
        setError("Failed to load restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsForCategory();
  }, [id]);

  if (!category && !categoryName)
    return (
      <div className="p-20 text-center font-bold text-slate-800">
        Category not found
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO title={categoryName || category?.title || "Category"} />
      <main className="responsive-container py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-zepto-purple">
            Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-slate-600 capitalize">
            {categoryName || category?.title || "Category"}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter font-poppins capitalize">
            {categoryName || category?.title || "Category"}
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

        {/* Restaurant Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-zepto-purple animate-spin" />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
              Searching for restaurants...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-zepto-purple text-white rounded-xl font-bold text-sm"
            >
              Retry
            </button>
          </div>
        ) : restaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((res) => (
              <ProductCard key={res.id} {...res} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 font-bold">
            No restaurants currently serving{" "}
            {categoryName || category?.title || "this category"} in your area.
          </div>
        )}
      </main>
    </div>
  );
};

export default CategoryProduct;
