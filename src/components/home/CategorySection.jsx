import React, { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryServices";

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (id, name) => {
    navigate(`/category/${id}`, { state: { categoryName: name } });
  };

  if (loading) {
    return (
      <div className="py-2">
        <div className="flex overflow-x-auto pb-3 gap-4 sm:gap-8 px-4 sm:px-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px]"
            >
              <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full bg-slate-200 animate-pulse"></div>
              <div className="w-16 h-4 bg-slate-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-2">
      <div className="flex items-center justify-between mb-2 px-4 sm:px-0">
        <h2 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
          What's on your mind?
        </h2>
      </div>

      <div className="flex overflow-x-auto pb-3 gap-3 sm:gap-8 px-4 sm:px-0 scrollbar-hide snap-x">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id, category.name)}
            className="flex flex-col items-center gap-1.5 min-w-[65px] sm:min-w-[100px] snap-start group cursor-pointer"
          >
            <div className="w-[65px] h-[65px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 relative ring-2 ring-transparent group-hover:ring-brand/10">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <p className="text-[10px] sm:text-base font-bold text-slate-700 text-center leading-tight capitalize">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
