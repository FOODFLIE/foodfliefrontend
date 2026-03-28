import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import CategoryProduct from "./pages/category/categoryProduct";
import RestaurantDetail from "./pages/restaurant/restaurantDetail";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import Cart from "./pages/cart";
import OrderConfirmation from "./pages/orderConfirmation";
import SellerAuth from "./pages/partner/sellerAuth";
import SellerDashboard from "./pages/partner/sellerDashboard";
import Orders from "./pages/partner/components/orders";
import Menu from "./pages/partner/components/menu";
import { AuthProvider } from "./context/authContext";
import { LocationProvider } from "./context/locationContext";
import { CartLocationProvider } from "./context/cartLocationContext";
import Navbar from "./components/navbar";
import OrderHistory from "./pages/profile/orderHistory";
import OrderDetail from "./pages/profile/orderDetail";
import Addresses from "./pages/profile/addresses";
import AboutUs from "./pages/legals/aboutUs";
import ContactUs from "./pages/legals/contactUs";
import Search from "./pages/home/search";
import { Toaster } from "react-hot-toast";
import Preloader from "./components/preloader";
import { CartProvider } from "./context/cartContext";
import ProtectedRoute from "./components/common/protectedRoute";
import ScrollToTop from "./components/common/scrollToTop";
import { usePageTracking } from "./hooks/usePageTracking";

import InstallPrompt from "./components/InstallPrompt";

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Track page views automatically
  usePageTracking();

  // Check if current route is a partner route
  const isPartnerRoute = location.pathname.startsWith('/partner');

  // Check if it's the first visit in this session
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("appLoaded");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleLoadingFinish = () => {
    setLoading(false);
    sessionStorage.setItem("appLoaded", "true");
  };

  return (
    <LocationProvider>
      <AuthProvider>
        <CartProvider>
          {loading && <Preloader onFinish={handleLoadingFinish} />}
          <Toaster position="top-center" reverseOrder={false} />
          <ScrollToTop />
          <div
            className={`min-h-screen transition-opacity duration-700 ${loading ? "opacity-0" : "opacity-100"}`}
          >
            {/* Only show Navbar for non-partner routes */}
            {!isPartnerRoute && <Navbar />}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/category/:id" element={<CategoryProduct />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/profile">
                <Route index element={<Profile />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="order/:id" element={<OrderDetail />} />
                <Route path="addresses" element={<Addresses />} />
              </Route>
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartLocationProvider>
                    <Cart />
                  </CartLocationProvider>
                </ProtectedRoute>
              } />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route
                path="/orderConfirmation/:id"
                element={<OrderConfirmation />}
              />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/orders/:id" element={<OrderConfirmation />} />
              <Route path="/partner" element={<SellerAuth />} />
              <Route path="/partner/dashboard" element={<SellerDashboard />}>
                <Route index element={<Orders />} />
                <Route path="orders" element={<Orders />} />
                <Route path="menu" element={<Menu />} />
              </Route>
            </Routes>
            <InstallPrompt />
          </div>
        </CartProvider>
      </AuthProvider>
    </LocationProvider>
  );
};

export default App;
