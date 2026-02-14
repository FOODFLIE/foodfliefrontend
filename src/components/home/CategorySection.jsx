import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate();

  // Food Categories (Best Practice for Food Delivery App)
  const categories = [
    {
      id: 1,
      name: "Biryani",
      image:
        "https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
    },
    {
      id: 2,
      name: "Pizza",
      image:
        "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
    },
    {
      id: 3,
      name: "Burger",
      image:
        "https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png",
    },
    {
      id: 4,
      name: "Rolls",
      image:
        "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
    },
    {
      id: 5,
      name: "Chicken",
      image:
        "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png",
    },
    {
      id: 6,
      name: "Thali",
      image:
        "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c64d5294099a1632716604.png",
    },
    {
      id: 7,
      name: "North Indian",
      image:
        "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be0101df1632716661.png",
    },
    {
      id: 8,
      name: "Dosa",
      image:
        "https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
    },
    {
      id: 9,
      name: "Chinese",
      image:
        "https://b.zmtcdn.com/data/o2_assets/e444ade83eb22360b6ca41d2e99d8c481632716661.png",
    },
  ];

  const handleCategoryClick = (id) => {
    navigate(`/category/${id}`);
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6 px-4 sm:px-0">
        <h2 className="text-xl font-black text-slate-900 tracking-tight italic">
          Inspiration for your first order
        </h2>
      </div>

      <div className="flex overflow-x-auto pb-4 gap-4 sm:gap-8 px-4 sm:px-0 scrollbar-hide snap-x">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="flex flex-col items-center gap-3 min-w-[80px] sm:min-w-[100px] snap-start group cursor-pointer"
          >
            <div className="w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 relative ring-4 ring-transparent group-hover:ring-zepto-purple/10">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-700 text-center leading-tight">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
