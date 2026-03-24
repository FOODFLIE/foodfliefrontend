import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProductsAndPartners } from "../services/productService";
import { CATEGORIES } from "../data";
import { trackSearch } from "../utils/metaPixel";

/**
 * useSearch Hook
 * Manages search state, results, suggestions, and recent searches.
 */
export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState({ products: [], partners: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Load recent searches on mount
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

  // Update query and search results
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
    const cleanTerm = term.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== cleanTerm.toLowerCase(),
      );
      const updated = [cleanTerm, ...filtered].slice(0, 5);
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
      trackSearch(searchQuery);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);

    if (val.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const searchVal = val.toLowerCase().trim();
    
    // Filter categories
    const filteredCats = CATEGORIES.filter((item) =>
      item.title.toLowerCase().includes(searchVal),
    ).map(c => ({ title: c.title, type: 'category' }));

    // Filter recent searches to show as suggestions too
    const filteredRecent = recentSearches.filter(term => 
      term.toLowerCase().includes(searchVal) && 
      !filteredCats.some(c => c.title.toLowerCase() === term.toLowerCase())
    ).map(r => ({ title: r, type: 'recent' }));

    setSuggestions([...filteredCats, ...filteredRecent]);
  };

  const handleSuggestionClick = (term) => {
    setSearchInput(term);
    setSearchParams({ q: term });
    setSuggestions([]);
    setIsFocused(false);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSuggestions([]);
    setSearchParams({});
  };

  return {
    query,
    searchInput,
    suggestions,
    results,
    loading,
    error,
    recentSearches,
    isFocused,
    setSearchInput,
    setSearchParams,
    handleInputChange,
    handleSuggestionClick,
    handleSearch,
    removeRecent,
    clearSearch,
    setIsFocused,
    setRecentSearches,
  };
};
