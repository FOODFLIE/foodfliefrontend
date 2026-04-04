import React from "react";
import { Link } from "react-router-dom";
import { Store, ShoppingBag, ChevronRight } from "lucide-react";
import ProductCard from "../productCard";

const SearchResultsDisplay = ({ results, query }) => {
  if (results.products.length === 0 && results.partners.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-12 animate-fade-in">
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
                  <h3 className="font-black text-slate-800 line-clamp-2 group-hover:text-brand transition-colors">
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
              <div key={product.id} className="flex flex-col h-full">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchResultsDisplay;
