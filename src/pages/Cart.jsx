import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Store,
  AlertCircle,
  ChevronRight,
  Receipt,
  Tag,
  ShieldCheck,
} from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/cartService";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

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

  const handleSlideStart = (e) => {
    setIsDragging(true);
    setStartX(e.type === "mousedown" ? e.clientX : e.touches[0].clientX);
  };

  const handleSlideMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;

    // Adjusted slider max width responsive
    const sliderMaxWidth =
      window.innerWidth < 1024 ? window.innerWidth - 80 : 380;
    const thumbWidth = 64;
    const maxSlide = sliderMaxWidth - thumbWidth - 16;

    // We will cap the visual slide relative to a hardcoded max for safety, or simply use ~260 for desktop
    // Let's use an arbitrary 240 as safe slide zone to trigger payment
    const rawMax = 260;
    const newPosition = Math.max(0, Math.min(diff, rawMax));
    setSliderPosition(newPosition);
  };

  const handleSlideEnd = () => {
    if (sliderPosition > 200) {
      // Complete the slide visually
      setSliderPosition(260);
      setTimeout(() => navigate("/checkout"), 400);
    } else {
      // Snap back
      setSliderPosition(0);
    }
    setIsDragging(false);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-[3px] border-slate-100"></div>
          <div className="absolute inset-0 rounded-full border-[3px] border-zepto-purple border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-zepto-purple/10 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#fafafa] relative overflow-hidden">
        {/* Background Ambient Blooms */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-50/80 to-transparent -z-10" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        {/* Empty State Card */}
        <div className="bg-white/80 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] border border-white/60 text-center max-w-lg w-full transform transition-all hover:-translate-y-1 hover:shadow-[0_30px_50px_-15px_rgba(0,0,0,0.06)] duration-500 relative z-10">
          <div className="relative w-36 h-36 mx-auto mb-10 group">
            <div className="absolute inset-0 bg-purple-100 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-transparent rounded-full rotate-45 transform group-hover:rotate-90 transition-transform duration-700"></div>
            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-[inset_0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 backdrop-blur-sm z-10">
              <ShoppingBag
                size={52}
                strokeWidth={1.5}
                className="text-zepto-purple drop-shadow-sm group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {/* Sparkles */}
            <div className="absolute top-2 right-4 w-3 h-3 bg-yellow-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)] animate-pulse"></div>
            <div className="absolute bottom-6 left-2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)] animate-bounce"></div>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">
            Cart is empty
          </h1>
          <p className="text-slate-500 font-medium mb-12 text-lg leading-relaxed">
            Good food is always cooking! Explore incredible restaurants near
            you.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full relative overflow-hidden bg-slate-900 text-white py-4 md:py-5 rounded-[1.25rem] font-bold hover:bg-black transition-all flex items-center justify-center gap-3 group shadow-xl shadow-slate-900/20 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2 text-[1.05rem] tracking-wide">
              Explore Restaurants
              <ArrowRight
                size={22}
                className="group-hover:translate-x-1.5 transition-transform duration-300"
              />
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer z-0" />
          </button>
        </div>
      </div>
    );
  }

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
                    <div
                      key={item.id}
                      className="p-6 md:p-8 hover:bg-slate-50/60 transition-colors group relative overflow-hidden"
                    >
                      <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
                        {/* Item Details */}
                        <div className="flex-1 w-full">
                          <div className="flex items-start gap-3 mb-2">
                            {/* Veg/Non-Veg icon placeholder (Mock logic or pure aesthetics) */}
                            <div className="flex-shrink-0 w-4 h-4 mt-1 border border-green-500 flex items-center justify-center rounded-sm">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <div>
                              <h3 className="text-xl md:text-[1.35rem] leading-tight font-black text-slate-800 group-hover:text-zepto-purple transition-colors">
                                {item.product_name}
                              </h3>
                              {/* Assuming SKU is somewhat relevant, or we can hide it for cleaner UI */}
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1.5">
                                Ref: {item.sku}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center gap-4">
                            <p className="text-xl font-black text-slate-900 tracking-tight">
                              ₹{parseFloat(item.price).toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="flex items-center gap-1.5 text-sm font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 px-2 py-1 rounded-md transition-all opacity-0 group-hover:opacity-100 -ml-2"
                            >
                              <Trash2 size={16} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Controls & Total Price */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-5">
                          {/* Premium Quantity Pill */}
                          <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1 shadow-sm hover:shadow hover:border-slate-300 transition-all">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-10 h-10 flex items-center justify-center bg-slate-50/80 rounded-[0.85rem] hover:bg-slate-100 hover:text-rose-500 transition-all active:scale-95"
                            >
                              {item.quantity === 1 ? (
                                <Trash2
                                  size={18}
                                  strokeWidth={2.5}
                                  className="text-slate-400"
                                />
                              ) : (
                                <Minus
                                  size={18}
                                  strokeWidth={2.5}
                                  className="text-slate-600"
                                />
                              )}
                            </button>
                            <span className="w-12 text-center font-black text-slate-800 text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-10 h-10 flex items-center justify-center bg-slate-50/80 rounded-[0.85rem] hover:bg-slate-100 hover:text-zepto-green transition-all active:scale-95"
                            >
                              <Plus
                                size={18}
                                strokeWidth={2.5}
                                className="text-slate-600"
                              />
                            </button>
                          </div>

                          {/* Item Subtotal Line */}
                          <div className="text-right flex flex-col items-end">
                            {/* <p className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-0.5">Total</p> */}
                            <p className="text-lg font-black text-slate-800 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                              ₹{parseFloat(item.total_price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
              <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-8 sticky top-28">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8 flex items-center gap-3">
                  <Receipt
                    className="text-slate-800"
                    size={24}
                    strokeWidth={2}
                  />
                  Bill Summary
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-slate-500 font-medium tracking-wide">
                      Item Total
                    </span>
                    <span className="font-bold text-slate-800">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-lg">
                    <span className="text-slate-500 font-medium tracking-wide">
                      Delivery Partner Fee
                    </span>
                    <span className="font-bold text-slate-800">
                      ₹{deliveryFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-lg">
                    <span className="text-slate-500 font-medium flex items-center gap-2">
                      Platform Fee
                      <span className="text-[0.65rem] bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded flex items-center justify-center font-bold">
                        INFO
                      </span>
                    </span>
                    <span className="font-bold text-slate-800">
                      ₹{handlingFee.toFixed(2)}
                    </span>
                  </div>

                  <div className="w-full h-px bg-slate-100 my-6"></div>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xl font-black text-slate-900 block tracking-tight">
                        TO PAY
                      </span>
                    </div>
                    <span className="text-3xl font-black text-slate-900 tracking-tighter">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Elegant Slide to Pay Mechanism */}
                <div className="mt-8 relative pt-2">
                  {/* Background track */}
                  <div className="w-full bg-slate-900 h-20 rounded-[1.25rem] relative overflow-hidden flex items-center shadow-xl shadow-slate-900/15 group">
                    {/* Text indicating action */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full pr-4">
                      <span
                        className={`text-[1.05rem] font-bold tracking-wide transition-all duration-300 ml-12 ${sliderPosition > window.innerWidth < 1024 ? 150 : 200 ? "text-white scale-95" : "text-slate-400 group-hover:text-slate-300"}`}
                      >
                        {sliderPosition > (window.innerWidth < 1024 ? 150 : 200)
                          ? "Processing..."
                          : "Slide to Complete Order"}
                      </span>
                    </div>

                    {/* Interactive Handle */}
                    <div
                      className="absolute left-2 top-2 bottom-2 w-16 bg-white rounded-xl shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing z-20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      style={{
                        transform: `translateX(${sliderPosition}px)`,
                        transition: isDragging
                          ? "none"
                          : "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                      onMouseDown={handleSlideStart}
                      onTouchStart={handleSlideStart}
                      // Important handles for smooth experience
                      onMouseMove={handleSlideMove}
                      onMouseUp={handleSlideEnd}
                      onMouseLeave={handleSlideEnd}
                      onTouchMove={handleSlideMove}
                      onTouchEnd={handleSlideEnd}
                    >
                      <div className="relative w-full h-full flex items-center justify-center">
                        <ChevronRight
                          size={24}
                          strokeWidth={2.5}
                          className={`text-slate-900 transition-all duration-300 ${sliderPosition > 50 ? "opacity-0 scale-50" : "opacity-100 scale-100"}`}
                        />
                        <ArrowRight
                          size={24}
                          strokeWidth={2.5}
                          className={`absolute text-slate-900 transition-all duration-300 ${sliderPosition > 50 ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
                        />
                      </div>
                    </div>

                    {/* Progress Fill */}
                    <div
                      className="absolute top-0 left-0 h-full bg-zepto-green opacity-95 transition-all z-10"
                      style={{
                        width:
                          sliderPosition > 0
                            ? `${sliderPosition + 60}px`
                            : "0px",
                        transition: isDragging
                          ? "none"
                          : "width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </div>
                </div>

                {/* Trust Badges bottom */}
                <div className="mt-8 flex items-center justify-center gap-3">
                  <ShieldCheck size={18} className="text-[#5e17eb]" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    100% SECURE CHECKOUT
                  </span>
                </div>
              </div>

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
