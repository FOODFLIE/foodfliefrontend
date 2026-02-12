import { Route, Routes } from "react-router-dom";
import CategoryProduct from "./pages/category/CategoryProduct";
import RestaurantDetail from "./pages/restaurant/RestaurantDetail";
import Home from "./pages/home/home";

const App = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryProduct />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </div>
  );
};

export default App;
