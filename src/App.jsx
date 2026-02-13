import { Route, Routes } from "react-router-dom";
import CategoryProduct from "./pages/category/CategoryProduct";
import RestaurantDetail from "./pages/restaurant/RestaurantDetail";
import Home from "./pages/home/home";
import Profile from "./pages/profile/Profile";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:id" element={<CategoryProduct />} />
          <Route path="/restaurant/:id" element={<RestaurantDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
