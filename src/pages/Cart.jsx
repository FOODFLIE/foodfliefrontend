import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store, AlertCircle, ChevronRight, Tag } from "lucide-react";
import { getCart, updateCartItem, removeFromCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";
import EmptyCart from "../components/emptyCart";
import LoadingCart from "../components/loadingCart";
import CartItem from "../components/cartItem";
import BillSummary from "../components/billSummary";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    try {
      await updateCartItem(itemId, newQuantity);
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOrderComplete = async () => {
    try {
      await placeOrder("Default Address", "COD");
      setTimeout(() => navigate("/orders"), 400);
    } catch (err) {
      setError("Failed to place order: " + err.message);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingCart />;
  if (!cart || !cart.items || cart.items.length === 0) return <EmptyCart />;

  // Calculate taxes/fees nicely
  const subtotal = parseFloat(cart.subtotal) || 0;
  const deliveryFee = parseFloat(cart.delivery_fee) || 0;
  const handlingFee = 5.0; // Mock fixed handling/platform fee
  const totalAmount = subtotal + deliveryFee + handlingFee;

  return (
    <div className="min-h-screen bg-[#fafafa] pb-32 pt-10 md:pt-14 relative z-0">
      {/* Background Soft Gradients */}
      <div className="absolute top-0 left-0 w-full h-[35vh] bg-gradient-to-b from-purple-50/70 via-white/40 to-transparent -z-10" />

      <div className="responsive-container">
        <div className="max-w-[1080px] mx-auto">
          {/* Header Title Layer */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-[3.5rem] leading-none font-black text-slate-900 tracking-tighter mb-3">
                Review Cart
              </h1>
              <div className="flex items-center gap-3 text-slate-500 font-medium text-lg">
                <span className="bg-white px-3 py-1 rounded-full border border-slate-200/60 shadow-sm text-slate-700 font-bold">
                  {cart.items.length} item{cart.items.length !== 1 ? "s" : ""}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5">
                  <Store size={18} className="text-slate-400" />
                  {cart.partner_name}
                </span>
              </div>
            </div>

            {/* Optional delivery timeline or similar badge */}
            <div className="hidden md:flex bg-green-50/80 border border-green-100 text-zepto-green px-4 py-2 rounded-2xl items-center gap-2 font-bold shadow-sm backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Delivery in 25-30 mins
            </div>
          </div>

          {error && (
            <div className="mb-8 bg-rose-50 border border-rose-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm animate-fade-in">
              <AlertCircle size={22} className="text-rose-500" />
              <p className="text-sm font-semibold text-rose-700">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative">
                {/* Decorative top accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-zepto-purple to-purple-400"></div>

                <div className="p-6 md:p-8 bg-gradient-to-b from-slate-50/50 to-white border-b border-slate-100 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white rounded-[1.25rem] border border-slate-100 flex items-center justify-center shadow-sm relative overflow-hidden group-hover:border-purple-200 transition-colors">
                      <Store
                        size={26}
                        className="text-slate-700 relative z-10"
                        strokeWidth={1.5}
                      />
                      <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                        {cart.partner_name}
                      </h2>
                      <p className="text-sm text-slate-500 font-medium mt-1">
                        Delivering to your saved location
                      </p>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-100">
                  {cart.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>

              {/* Promo Offer Banner */}
              <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-[2rem] p-6 border border-purple-100/60 shadow-[0_8px_20px_rgb(0,0,0,0.02)] flex items-center justify-between gap-4 group cursor-pointer hover:border-purple-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100/50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Tag size={22} className="text-zepto-purple" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">
                      Apply Coupon
                    </h4>
                    <p className="text-sm text-slate-500 font-medium">
                      Log in to view offers
                    </p>
                  </div>
                </div>
                <ChevronRight
                  size={20}
                  className="text-slate-300 group-hover:text-zepto-purple transition-colors group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </div>

              {/* Cooking Notes Banner */}
              <div className="bg-white rounded-[2rem] p-6 border border-slate-200/60 shadow-[0_8px_20px_rgb(0,0,0,0.02)] cursor-text transition-all focus-within:border-slate-300 focus-within:shadow-md">
                <textarea
                  placeholder="Any cooking instructions? (e.g. Less spicy, extra sauce)"
                  className="w-full bg-transparent outline-none resize-none font-medium text-slate-700 placeholder:text-slate-400"
                  rows="2"
                ></textarea>
              </div>
            </div>

            {/* Right Column - Bill Details & Call to Action */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <BillSummary
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                handlingFee={handlingFee}
                totalAmount={totalAmount}
                onOrderComplete={handleOrderComplete}
              />

              {/* Optional Terms Disclaimer */}
              <div className="mt-6 text-center px-4">
                <p className="text-xs font-medium text-slate-400 leading-relaxed">
                  By completing this order, you agree to our{" "}
                  <span className="text-slate-600 underline cursor-pointer hover:text-zepto-purple">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-slate-600 underline cursor-pointer hover:text-zepto-purple">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
