import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CartFooter from "../../components/cartFooter";
import SEO from "../../components/common/seo";
import { Loader2 } from "lucide-react";
import { RESTAURANTS } from "../../data";
import {
  generateRestaurantSchema,
  generateMenuSchema,
  generateBreadcrumbSchema,
  generateFoodEstablishmentSchema,
} from "../../utils/seoSchemas";
import { trackViewContent } from "../../utils/metaPixel";

// Custom Hooks & Sub-components
import { useRestaurantMenu } from "./hooks/useRestaurantMenu";
import RestaurantHeader from "../../components/restaurant/restaurantHeader";
import RestaurantCategories from "../../components/restaurant/restaurantCategories";
import RestaurantMenuItems from "../../components/restaurant/restaurantMenuItems";

const RestaurantDetail = () => {
  const { id } = useParams();
  const localRestaurant = RESTAURANTS.find((r) => r.id === parseInt(id));

  const {
    restaurantData,
    menuItems,
    categories,
    loading,
    error,
    addingToCart,
    quantities,
    cartCount,
    onUpdateQuantity,
  } = useRestaurantMenu(id, localRestaurant);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Track ViewContent when restaurant page loads
  useEffect(() => {
    if (restaurantData && !loading) {
      trackViewContent({
        name: restaurantData.name,
        id: id,
        type: 'restaurant',
      });
    }
  }, [restaurantData, loading, id]);

  if (!restaurantData && !loading)
    return (
      <div className="p-20 text-center font-bold text-slate-800">
        Establishment not found
      </div>
    );

  if (!restaurantData && loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-10 h-10 text-brand animate-spin" />
        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
          Loading restaurant...
        </p>
      </div>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "https://foodflie.com" },
    { name: "Restaurants", url: "https://foodflie.com/restaurants" },
    {
      name: restaurantData?.name || "Restaurant",
      url: `https://foodflie.com/restaurant/${id}`,
    },
  ];

  const schemas = restaurantData
    ? [
        generateRestaurantSchema(restaurantData),
        generateFoodEstablishmentSchema(restaurantData),
        generateBreadcrumbSchema(breadcrumbs),
        ...(menuItems.length > 0
          ? [generateMenuSchema(restaurantData, menuItems)]
          : []),
      ]
    : [];

  return (
    <div className="bg-white min-h-screen pb-40">
      <SEO
        title={`${restaurantData?.name || "Restaurant"} - Order Online in 13 Minutes`}
        description={`Order from ${
          restaurantData?.name || "restaurant"
        } and get delivery in 13 minutes. ${
          restaurantData?.cuisines?.join
            ? restaurantData.cuisines.join(", ")
            : "Delicious food"
        } at menu prices. ${
          restaurantData?.rating ? `Rated ${restaurantData.rating} stars.` : ""
        } Free delivery on orders above ₹199.`}
        keywords={`${restaurantData?.name}, ${restaurantData?.name} menu, ${
          restaurantData?.name
        } delivery, food delivery, online order, ${
          restaurantData?.cuisines?.join
            ? restaurantData.cuisines.join(", ")
            : "restaurant"
        }, ${restaurantData?.city || "Hyderabad"} restaurants`}
        schema={schemas}
        canonical={`https://foodflie.com/restaurant/${id}`}
        type="restaurant"
      />
      
      <main className="responsive-container py-6 md:py-8">
        <RestaurantHeader restaurantData={restaurantData} />

        {/* Categories Horizontal Scroll (Mobile/Tablet Only) happens inside the component but it wraps the grid layout awkwardly in origin. We need a grid container. */}
        
        {/* We place mobile scroll above grid for semantic mobile flow, and let CSS handle grid placement on desktop */}
        <div className="block lg:hidden">
          <RestaurantCategories 
            categories={categories} 
            selectedCategory={selectedCategory} 
            onSelectCategory={setSelectedCategory} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Desktop Sidebar is part of RestaurantCategories but hidden on mobile via CSS */}
          <div className="hidden lg:block lg:col-span-3">
             <RestaurantCategories 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={setSelectedCategory} 
              />
          </div>

          <RestaurantMenuItems
            menuItems={menuItems}
            selectedCategory={selectedCategory}
            categories={categories}
            loading={loading}
            error={error}
            addingToCart={addingToCart}
            quantities={quantities}
            onUpdateQuantity={onUpdateQuantity}
          />
        </div>
      </main>

      <CartFooter count={cartCount} />
    </div>
  );
};

export default RestaurantDetail;
