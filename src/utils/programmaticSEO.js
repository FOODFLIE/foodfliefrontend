// Programmatic SEO utilities for FoodFlie

export const generateLocationSEO = (location, cuisines = [], restaurants = []) => {
  const title = `Food Delivery in ${location} | 13 Min Delivery | FoodFlie`;
  const description = `Order food online in ${location} and get delivery in just 13 minutes. ${cuisines.length > 0 ? cuisines.slice(0, 3).join(', ') + ' and more.' : 'Top restaurants available.'} Menu prices guaranteed, no hidden charges.`;
  const keywords = [
    `food delivery in ${location}`,
    `${location} food delivery`,
    `online food order ${location}`,
    `restaurants in ${location}`,
    `13 minute delivery ${location}`,
    ...cuisines.map(cuisine => `${cuisine} delivery ${location}`),
    ...restaurants.slice(0, 5).map(restaurant => `${restaurant.name} ${location}`)
  ].join(', ');

  return { title, description, keywords };
};

export const generateDishSEO = (dishName, location = 'Hyderabad', restaurants = []) => {
  const title = `${dishName} Delivery in ${location} | Order Online | FoodFlie`;
  const description = `Craving ${dishName}? Order from ${restaurants.length > 0 ? restaurants.slice(0, 3).map(r => r.name).join(', ') : 'top restaurants'} in ${location}. Get ${dishName} delivered in 13 minutes at menu prices.`;
  const keywords = [
    `${dishName} delivery`,
    `${dishName} online order`,
    `${dishName} delivery ${location}`,
    `order ${dishName} online`,
    `${dishName} near me`,
    `best ${dishName} ${location}`,
    `${dishName} home delivery`
  ].join(', ');

  return { title, description, keywords };
};

export const generateCuisineSEO = (cuisine, location = 'Hyderabad', restaurants = []) => {
  const title = `${cuisine} Food Delivery in ${location} | 13 Min Delivery | FoodFlie`;
  const description = `Order authentic ${cuisine} food in ${location}. ${restaurants.length > 0 ? `Choose from ${restaurants.length}+ restaurants including ${restaurants.slice(0, 2).map(r => r.name).join(', ')}.` : 'Multiple restaurants available.'} 13-minute delivery guaranteed.`;
  const keywords = [
    `${cuisine} food delivery`,
    `${cuisine} restaurants ${location}`,
    `${cuisine} delivery ${location}`,
    `order ${cuisine} food online`,
    `${cuisine} near me`,
    `best ${cuisine} ${location}`,
    `${cuisine} home delivery ${location}`
  ].join(', ');

  return { title, description, keywords };
};

export const generateCategorySEO = (category, location = 'Hyderabad') => {
  const categoryMap = {
    'breakfast': 'Breakfast',
    'lunch': 'Lunch',
    'dinner': 'Dinner',
    'snacks': 'Snacks',
    'desserts': 'Desserts',
    'beverages': 'Beverages'
  };

  const categoryName = categoryMap[category] || category;
  const title = `${categoryName} Delivery in ${location} | Order Online | FoodFlie`;
  const description = `Order ${categoryName.toLowerCase()} online in ${location} and get delivery in 13 minutes. Fresh ${categoryName.toLowerCase()} from top restaurants at menu prices.`;
  const keywords = [
    `${categoryName.toLowerCase()} delivery`,
    `${categoryName.toLowerCase()} delivery ${location}`,
    `order ${categoryName.toLowerCase()} online`,
    `${categoryName.toLowerCase()} near me`,
    `${categoryName.toLowerCase()} home delivery`,
    `best ${categoryName.toLowerCase()} ${location}`
  ].join(', ');

  return { title, description, keywords };
};

// Location-based keyword generators
export const generateLocationKeywords = (location) => [
  `food delivery in ${location}`,
  `${location} food delivery`,
  `online food order ${location}`,
  `restaurants in ${location}`,
  `food delivery near ${location}`,
  `${location} restaurants online`,
  `home delivery ${location}`,
  `food ordering ${location}`,
  `${location} food apps`,
  `quick delivery ${location}`
];

// Dish-based keyword generators
export const generateDishKeywords = (dish, location = 'Hyderabad') => [
  `${dish} delivery`,
  `${dish} online order`,
  `${dish} delivery ${location}`,
  `order ${dish} online`,
  `${dish} near me`,
  `${dish} home delivery`,
  `best ${dish} ${location}`,
  `${dish} restaurants ${location}`,
  `fresh ${dish} delivery`,
  `${dish} delivery app`
];

// Restaurant-based keyword generators
export const generateRestaurantKeywords = (restaurantName, location = 'Hyderabad', cuisines = []) => [
  `${restaurantName} delivery`,
  `${restaurantName} online order`,
  `${restaurantName} ${location}`,
  `${restaurantName} menu`,
  `order from ${restaurantName}`,
  `${restaurantName} home delivery`,
  ...cuisines.map(cuisine => `${restaurantName} ${cuisine}`),
  `${restaurantName} reviews`,
  `${restaurantName} contact`,
  `${restaurantName} timings`
];

// URL slug generators
export const generateLocationSlug = (location) => 
  location.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export const generateDishSlug = (dish) => 
  dish.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export const generateCuisineSlug = (cuisine) => 
  cuisine.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Meta description generators with local focus
export const generateLocalMetaDescription = (type, name, location = 'Hyderabad') => {
  const templates = {
    restaurant: `Order from ${name} in ${location} and get delivery in 13 minutes. Menu prices guaranteed, no hidden charges. Cash on delivery available.`,
    dish: `Craving ${name}? Get it delivered in ${location} in just 13 minutes. Order from top restaurants at menu prices.`,
    cuisine: `Order ${name} food in ${location} with 13-minute delivery. Authentic flavors from top restaurants at menu prices.`,
    location: `Food delivery in ${name} in just 13 minutes. Order from 100+ restaurants. Menu prices guaranteed, no hidden charges.`
  };

  return templates[type] || templates.restaurant;
};

// Structured data for local pages
export const generateLocalPageSchema = (location, restaurants = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": `Restaurants in ${location}`,
  "description": `Food delivery restaurants in ${location} with 13-minute delivery`,
  "numberOfItems": restaurants.length,
  "itemListElement": restaurants.map((restaurant, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Restaurant",
      "name": restaurant.name,
      "url": `https://foodflie.com/restaurant/${restaurant.id}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": location
      }
    }
  }))
});

// Internal linking suggestions
export const generateInternalLinks = (currentPage, data) => {
  const links = [];

  switch (currentPage.type) {
    case 'restaurant':
      // Link to cuisine pages
      if (data.cuisines) {
        data.cuisines.forEach(cuisine => {
          links.push({
            text: `More ${cuisine} restaurants`,
            url: `/cuisine/${generateCuisineSlug(cuisine)}`,
            anchor: `${cuisine} restaurants in ${data.location || 'Hyderabad'}`
          });
        });
      }
      break;

    case 'location':
      // Link to popular dishes and cuisines in that location
      if (data.popularDishes) {
        data.popularDishes.forEach(dish => {
          links.push({
            text: `${dish} delivery in ${data.location}`,
            url: `/dish/${generateDishSlug(dish)}/${generateLocationSlug(data.location)}`,
            anchor: `Order ${dish} in ${data.location}`
          });
        });
      }
      break;

    case 'dish':
      // Link to restaurants serving this dish
      if (data.restaurants) {
        data.restaurants.slice(0, 3).forEach(restaurant => {
          links.push({
            text: `${data.dish} at ${restaurant.name}`,
            url: `/restaurant/${restaurant.id}`,
            anchor: `Order ${data.dish} from ${restaurant.name}`
          });
        });
      }
      break;
  }

  return links;
};