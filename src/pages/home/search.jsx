import React from "react";
import { Loader2 } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import SEO from "../../components/common/seo";

// Refactored Components
import SearchHeader from "../../components/search/SearchHeader";
import SuggestionsDropdown from "../../components/search/SuggestionsDropdown";
import RecentAndPopular from "../../components/search/RecentAndPopular";
import SearchResultsDisplay from "../../components/search/SearchResultsDisplay";

const Search = () => {
  const {
    query,
    searchInput,
    suggestions,
    results,
    loading,
    error,
    recentSearches,
    isFocused,
    handleInputChange,
    handleSuggestionClick,
    handleSearch,
    removeRecent,
    clearSearch,
    setIsFocused,
    setRecentSearches,
    setSearchParams
  } = useSearch();

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ q: searchInput });
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO title="Search Food | FoodFlie" />
      
      <div className="relative">
        <SearchHeader 
          searchInput={searchInput}
          handleInputChange={handleInputChange}
          onKeyDown={onKeyDown}
          setIsFocused={setIsFocused}
          clearSearch={clearSearch}
        />
        
        {/* Suggestions Dropdown Overlay */}
        <div className="responsive-container relative">
          {isFocused && (
            <SuggestionsDropdown 
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
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
              <Loader2 className="w-10 h-10" />
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
          <RecentAndPopular 
            recentSearches={recentSearches}
            removeRecent={removeRecent}
            handleSuggestionClick={handleSuggestionClick}
            setRecentSearches={setRecentSearches}
          />
        ) : (
          <SearchResultsDisplay 
            results={results}
            query={query}
          />
        )}
      </main>
    </div>
  );
};

export default Search;
