import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryProduct from "./pages/category/CategoryProduct";
import RestaurantDetail from "./pages/restaurant/RestaurantDetail";
import Home from "./pages/home/home";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/Cart";
import SellerAuth from "./pages/partner/SellerAuth";
import SellerDashboard from "./pages/partner/SellerDashboard";
import Orders from "./pages/partner/components/Orders";
import Menu from "./pages/partner/components/Menu";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryProduct />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/partner" element={<SellerAuth />} />
          <Route path="/partner/dashboard" element={<SellerDashboard />}>
            <Route index element={<Orders />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<Menu />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
