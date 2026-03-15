// Schema.org structured data generators for FoodFlie

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FoodFlie",
  "alternateName": "FoodFlie Food Delivery",
  "url": "https://foodflie.com",
  "logo": "https://foodflie.com/logo.png",
  "description": "13-minute food delivery with menu prices guaranteed. Order from your favorite restaurants.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "addressCountry": "IN"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-XXX-XXX-XXXX",
    "contactType": "Customer Service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi", "Telugu"]
  },
  "sameAs": [
    "https://facebook.com/foodflie",
    "https://twitter.com/foodflie",
    "https://instagram.com/foodflie"
  ]
});

export const generateLocalBusinessSchema = (location) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": `FoodFlie ${location}`,
  "image": "https://foodflie.com/logo.png",
  "@id": `https://foodflie.com/${location.toLowerCase()}`,
  "url": `https://foodflie.com/${location.toLowerCase()}`,
  "telephone": "+91-XXX-XXX-XXXX",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": location,
    "addressRegion": "Telangana",
    "postalCode": "",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 0,
    "longitude": 0
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "servesCuisine": ["Indian", "Chinese", "Italian", "Fast Food"],
  "priceRange": "₹₹"
});

export const generateRestaurantSchema = (restaurant) => ({
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": restaurant.name,
  "image": restaurant.image || "https://foodflie.com/default-restaurant.jpg",
  "@id": `https://foodflie.com/restaurant/${restaurant.id}`,
  "url": `https://foodflie.com/restaurant/${restaurant.id}`,
  "telephone": restaurant.phone || "",
  "priceRange": "₹₹",
  "servesCuisine": restaurant.cuisines || [],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": restaurant.address || "",
    "addressLocality": restaurant.city || "Hyderabad",
    "addressRegion": restaurant.state || "Telangana",
    "postalCode": restaurant.pincode || "",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": restaurant.latitude || 0,
    "longitude": restaurant.longitude || 0
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": restaurant.rating || 4.0,
    "reviewCount": restaurant.reviewCount || 100,
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasMenu": `https://foodflie.com/restaurant/${restaurant.id}#menu`
});

export const generateMenuSchema = (restaurant, menuItems) => ({
  "@context": "https://schema.org",
  "@type": "Menu",
  "name": `${restaurant.name} Menu`,
  "description": `Menu for ${restaurant.name} on FoodFlie`,
  "hasMenuSection": menuItems.map(item => ({
    "@type": "MenuSection",
    "name": item.category || "Main Menu",
    "hasMenuItem": {
      "@type": "MenuItem",
      "name": item.name,
      "description": item.description || "",
      "image": item.image || "",
      "offers": {
        "@type": "Offer",
        "price": item.price,
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock"
      },
      "nutrition": item.nutrition ? {
        "@type": "NutritionInformation",
        "calories": item.nutrition.calories || ""
      } : undefined
    }
  }))
});

export const generateFoodEstablishmentSchema = (restaurant) => ({
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": restaurant.name,
  "image": restaurant.image,
  "address": {
    "@type": "PostalAddress",
    "addressLocality": restaurant.city || "Hyderabad",
    "addressRegion": restaurant.state || "Telangana",
    "addressCountry": "IN"
  },
  "servesCuisine": restaurant.cuisines || [],
  "priceRange": "₹₹",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": restaurant.rating || 4.0,
    "reviewCount": restaurant.reviewCount || 100
  }
});

export const generateBreadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

export const generateProductSchema = (dish, restaurant) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": dish.name,
  "image": dish.image,
  "description": dish.description,
  "brand": {
    "@type": "Brand",
    "name": restaurant.name
  },
  "offers": {
    "@type": "Offer",
    "url": `https://foodflie.com/restaurant/${restaurant.id}`,
    "priceCurrency": "INR",
    "price": dish.price,
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": restaurant.name
    }
  },
  "aggregateRating": dish.rating ? {
    "@type": "AggregateRating",
    "ratingValue": dish.rating,
    "reviewCount": dish.reviewCount || 50
  } : undefined
});

export const generateWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "FoodFlie",
  "url": "https://foodflie.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://foodflie.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

export const generateServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Food Delivery",
  "provider": {
    "@type": "Organization",
    "name": "FoodFlie"
  },
  "areaServed": {
    "@type": "City",
    "name": "Hyderabad"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Food Delivery Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "13 Minute Food Delivery",
          "description": "Lightning-fast food delivery in just 13 minutes"
        }
      }
    ]
  }
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
