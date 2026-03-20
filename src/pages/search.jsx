import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search as SearchIcon,
  ChevronRight,
  Loader2,
  ArrowLeft,
  Store,
  ShoppingBag,
  Clock,
  X,
  TrendingUp,
} from "lucide-react";
import { searchProductsAndPartners } from "../services/productService";
import ProductCard from "../components/productCard";
import { CATEGORIES } from "../data";
import SEO from "../components/common/seo";
import { trackSearch } from "../utils/metaPixel";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);

  const [results, setResults] = useState({ products: [], partners: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recent_searches");
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        setRecentSearches([]);
      }
    }
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      handleSearch(query);
      saveToRecent(query);
    } else {
      setResults({ products: [], partners: [] });
    }
  }, [query]);

  const saveToRecent = (term) => {
    if (!term || term.trim().length < 2) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== term.toLowerCase(),
      );
      const updated = [term, ...filtered].slice(0, 5);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  const removeRecent = (e, term) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = recentSearches.filter((item) => item !== term);
    setRecentSearches(updated);
    localStorage.setItem("recent_searches", JSON.stringify(updated));
  };

  const handleSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchProductsAndPartners(searchQuery);
      setResults(data);
      
      // Track search event with Meta Pixel
      trackSearch(searchQuery);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ q: searchInput });
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    // Optional: add debounce here if you want live search
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO title="Search Food | FoodFlie" />
      {/* Search Header for Mobile/Desktop */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 p-4">
        <div className="responsive-container flex items-center gap-3">
          <Link
            to="/"
            className="p-2 -ml-2 text-slate-400 hover:text-brand transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </Link>
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon size={18} strokeWidth={2.5} />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              onKeyDown={onKeyDown}
              placeholder="Search for 'biryani', 'pizza', 'milk'..."
              className="w-full bg-slate-50 border border-slate-100 focus:bg-white focus:border-brand focus:ring-4 focus:ring-brand/5 h-12 pl-12 pr-4 rounded-xl text-base font-medium transition-all outline-none shadow-sm"
              autoFocus
            />
          </div>
        </div>
      </div>

      <main className="responsive-container py-6 px-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-brand animate-spin" />
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
              Searching for "{query}"...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} />
            </div>
            <p className="text-slate-800 font-black text-xl mb-2">Oops!</p>
            <p className="text-slate-500 text-sm mb-6">{error}</p>
            <button
              onClick={() => handleSearch(query)}
              className="px-8 py-3 bg-brand text-white rounded-xl font-bold text-sm shadow-lg shadow-brand/20 active:scale-95 transition-all"
            >
              Try Again
            </button>
          </div>
        ) : query.length < 2 ? (
          <div className="max-w-2xl mx-auto space-y-10">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                      Recent Searches
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem("recent_searches");
                    }}
                    className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSearchInput(term);
                        setSearchParams({ q: term });
                      }}
                      className="group flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-sm font-bold text-slate-600 hover:border-brand hover:bg-white hover:text-brand transition-all"
                    >
                      {term}
                      <X
                        size={14}
                        className="text-slate-300 group-hover:text-brand transition-colors"
                        onClick={(e) => removeRecent(e, term)}
                      />
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Popular Suggestions */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={16} className="text-brand" />
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                  Popular Suggestions
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CATEGORIES.slice(0, 6).map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchInput(c.title);
                      setSearchParams({ q: c.title });
                    }}
                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-brand/30 hover:shadow-md transition-all group text-left"
                  >
                    <span className="text-sm font-bold text-slate-700 group-hover:text-brand transition-colors">
                      {c.title}
                    </span>
                    <ChevronRight
                      size={16}
                      className="text-slate-300 group-hover:text-brand transition-colors"
                    />
                  </button>
                ))}
              </div>
            </section>

            {/* Empty State visual if no recent searches */}
            {recentSearches.length === 0 && (
              <div className="text-center py-10 opacity-50">
                <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon size={24} />
                </div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Start typing to search Products & Stores
                </p>
              </div>
            )}
          </div>
        ) : results.products.length === 0 && results.partners.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-xl font-black text-slate-800 mb-2">
              No results for "{query}"
            </h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
              We couldn't find any products or stores matching your search. Try
              checking your spelling or use different keywords.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Partners / Stores Section */}
            {results.partners.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg">
                    <Store size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">
                    Stores
                  </h2>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-auto">
                    {results.partners.length} results
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.partners.map((partner) => (
                    <Link
                      key={partner.id}
                      to={`/restaurant/${partner.id}`}
                      className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl hover:border-brand/30 hover:shadow-md transition-all group bg-white"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-sm border border-slate-100">
                        {partner.image ? (
                          <img
                            src={partner.image}
                            alt={partner.store_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Store size={24} />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-slate-800 truncate group-hover:text-brand transition-colors">
                          {partner.store_name}
                        </h3>
                        <p className="text-xs font-bold text-slate-400 truncate mb-1">
                          {partner.area || partner.address}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand">
                            Open Now
                          </span>
                          <ChevronRight
                            size={14}
                            className="text-slate-300 ml-auto"
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Products Section */}
            {results.products.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-brand/10 text-brand rounded-lg">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-800 tracking-tight">
                    Products
                  </h2>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full ml-auto">
                    {results.products.length} results
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {results.products.map((product) => (
                    <div key={product.id} className="h-full">
                      <ProductCard {...product} />
                      {/* Display which store it's from if available */}
                      {product.partner && (
                        <Link
                          to={`/restaurant/${product.partner_id}`}
                          className="mt-2 block text-[10px] font-bold text-slate-400 hover:text-brand transition-colors truncate"
                        >
                          from{" "}
                          <span className="text-slate-600 font-black">
                            {product.partner.store_name}
                          </span>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
