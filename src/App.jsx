import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import CategoryProduct from "./pages/category/CategoryProduct";
import RestaurantDetail from "./pages/restaurant/RestaurantDetail";

const App = () => {
  return (
    <div className="bg-prestige-dark min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryProduct />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </div>
  );
};

export default App;
