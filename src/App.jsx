import React from "react";
import { Route, Routes } from "react-router-dom";
import CategoryProduct from "./pages/category/categoryProduct";
import RestaurantDetail from "./pages/restaurant/restaurantDetail";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Cart from "./pages/cart";
import OrderConfirmation from "./pages/OrderConfirmation";
import SellerAuth from "./pages/partner/sellerAuth";
import SellerDashboard from "./pages/partner/sellerDashboard";
import Orders from "./pages/partner/components/orders";
import Menu from "./pages/partner/components/menu";
import { AuthProvider } from "./context/authContext";
import { LocationProvider } from "./context/locationContext";
import Navbar from "./components/navbar";
import OrderHistory from "./pages/profile/orderHistory";
import OrderDetail from "./pages/profile/orderDetail";
import AboutUs from "./pages/legals/aboutUs";
import ContactUs from "./pages/legals/contactUs";
const App = () => {
  return (
    <LocationProvider>
      <AuthProvider>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryProduct />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/profile">
              <Route index element={<Profile />} />
              <Route path="orders" element={<OrderHistory />} />
              <Route path="order/:id" element={<OrderDetail />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/partner" element={<SellerAuth />} />
            <Route path="/partner/dashboard" element={<SellerDashboard />}>
              <Route index element={<Orders />} />
              <Route path="orders" element={<Orders />} />
              <Route path="menu" element={<Menu />} />
            </Route>
          </Routes>
       
        </div>
      </AuthProvider>
    </LocationProvider>
  );
};

export default App;
