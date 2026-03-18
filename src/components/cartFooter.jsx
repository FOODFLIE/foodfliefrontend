import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AuthModal from "./authModal";

const CartFooter = ({ count }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  if (count <= 0) return null;

  const handleViewCart = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
    <div className="fixed bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-full max-w-2xl px-0 md:px-6">
      <div className="bg-brand rounded-2xl md:rounded-[2rem] px-4 py-2 md:px-10 md:py-3 flex items-center justify-between shadow-[0_20px_40px_rgba(220,38,38,0.4)] md:shadow-[0_40px_80px_rgba(220,38,38,0.4)] text-white border-t border-white/20">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white flex items-center justify-center font-black text-base md:text-xl text-brand shadow-xl">
            {count}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[8px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.15em] md:tracking-[0.2em]">
              Cart Ready
            </span>
            <span className="text-[10px] md:text-lg font-black italic font-display font-poppins">
              Proceed to Checkout
            </span>
          </div>
        </div>
        <button
          onClick={handleViewCart}
          className="bg-white text-brand px-4 py-2 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-wider md:tracking-widest hover:scale-105 transition-all shadow-lg"
        >
          VIEW CART
        </button>
      </div>
    </div>
    <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default CartFooter;
