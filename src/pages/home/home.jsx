import React from "react";
import Navbar from "../../components/navbar";
import Banner from "../../components/Banner";
import CategorySection from "../../components/home/categorySection";
import RestaurantChainSection from "../../components/home/restaurantChainSection";
import Footer from "../../components/footer";
import SEO from "../../components/common/seo";
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateServiceSchema,
  generateLocalBusinessSchema,
  generateFAQSchema
} from "../../utils/seoSchemas";

const Home = () => {
  const faqs = [
    {
      question: "How fast is FoodFlie delivery?",
      answer: "FoodFlie delivers your food in just 13 minutes, making us one of the fastest food delivery services."
    },
    {
      question: "Are there any hidden charges?",
      answer: "No! We guarantee menu prices only. What you see on the restaurant menu is what you pay."
    },
    {
      question: "Do you accept cash on delivery?",
      answer: "Yes, we accept both online payments and cash on delivery for your convenience."
    }
  ];

  const schemas = [
    generateOrganizationSchema(),
    generateWebSiteSchema(),
    generateServiceSchema(),
    generateLocalBusinessSchema("Hyderabad"),
    generateFAQSchema(faqs)
  ];

  return (
    <div>
      <SEO
        title="13 Minute Food Delivery in Hyderabad | Menu Prices Guaranteed"
        description="Order food online in Hyderabad and get delivery in just 13 minutes. Menu prices guaranteed, no hidden charges. Cash on delivery available. Order biryani, pizza, burgers & more from top restaurants near you."
        keywords="food delivery near me, 13 minute food delivery, fast food delivery hyderabad, menu price food delivery, instant food delivery, biryani delivery, pizza delivery, online food order, restaurant delivery near me, quick food delivery"
        schema={schemas}
        canonical="https://foodflie.com"
      />
      <div className="bg-white pb-12">
        <main className="responsive-container py-3">
          {/* Banner Section */}
          <Banner
            // image="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200&h=400&fit=crop"
            badgeText="13-Minute Delivery • Menu Prices Guaranteed • Cash on Delivery"
            title="HOT BIRYANI"
            titleHighlight="NO OVERPAYING"
            subtitle="Limited launch in KPHB.Get hot biryani delivered in minutes at menu prices."
          />

          {/* New Categories Section */}
          <CategorySection />

          {/* Top Restaurant Chains */}
          <RestaurantChainSection title="Top restaurant chains in Ongole" />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
