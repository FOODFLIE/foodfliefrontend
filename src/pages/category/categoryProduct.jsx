import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar";
import ProductCard from "../../components/productCard";
import { getProductsByCategory } from "../../services/productService";
import { fetchCategories } from "../../services/categoryServices";
import { ChevronRight, Filter, Loader2, Zap } from "lucide-react";
import SEO from "../../components/common/seo";
import { useUserLocation } from "../../context/locationContext";
import NoStoresFound from "../../components/common/NoStoresFound";

const CategoryProduct = () => {
  const { id } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName;
  const { coords } = useUserLocation();
  const [realCategory, setRealCategory] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
console.log("restaurants", restaurants);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryAndRestaurants = async () => {
      if (!id) return;
      try {
        setLoading(true);

        // Always fetch categories to get metadata (time, type)
        const cats = await fetchCategories();
        const cat = cats.find((c) => String(c.id) === String(id));
        if (cat) setRealCategory(cat);

        const responseData = await getProductsByCategory(id);
        const restaurantList = Array.isArray(responseData)
          ? responseData
          : responseData?.data || [];

        setRestaurants(restaurantList);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch category data:", err);
        setError("Failed to load category content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndRestaurants();
  }, [id, categoryName, coords?.latitude, coords?.longitude]);

  if (!loading && !categoryName && !realCategory)
    return (
      <div className="p-20 text-center font-bold text-slate-800">
        Category not found
      </div>
    );

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO
        title={`${categoryName || realCategory?.name || "Food"} | FoodFlie`}
      />
      <main className="responsive-container py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
          <Link to="/" className="hover:text-brand">
            Home
          </Link>
          <ChevronRight size={10} />
          <span className="text-slate-600 capitalize">
            {categoryName || realCategory?.name || "Category"}
          </span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-5xl font-black text-slate-800 tracking-tighter font-display capitalize mb-2">
              {categoryName || realCategory?.name || "Category"}
            </h1>
            {(realCategory?.delivery_type === "fast" ||
              realCategory?.delivery_time) && (
              <div className="flex items-center gap-2">
                <span className="bg-brand text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-sm uppercase tracking-wider">
                  <Zap size={10} fill="currentColor" />{" "}
                  {realCategory?.delivery_time || 13} MINS DELIVERY
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-brand-grey rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors">
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
                className="px-5 py-2 rounded-full border border-slate-200 text-xs font-bold text-slate-500 whitespace-nowrap hover:border-brand hover:text-brand transition-all"
              >
                {tag}
              </button>
            ),
          )}
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
              Searching for restaurants...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500 font-bold mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-brand text-white rounded-xl font-bold text-sm"
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
          <NoStoresFound 
            title={`No ${categoryName || realCategory?.name || "Items"} Found`}
            description={`We couldn't find any restaurants serving ${categoryName || realCategory?.name || "this category"} in your area. Try a different location.`}
          />
        )}
      </main>
    </div>
  );
};

export default CategoryProduct;
