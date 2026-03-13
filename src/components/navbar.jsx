import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "./authModal";
import LocationModal from "./modals/locationModal";
import MobileBottomNav from "./navigation/mobileBottomNav";
import Logo from "./navigation/logo";
import LocationPill from "./navigation/locationPill";
import SearchBar from "./navigation/searchBar";
import NavActions from "./navigation/navActions";
import { useAuth } from "../context/authContext";
import { useUserLocation } from "../context/locationContext";
import { useCart } from "../context/cartContext";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { address, loading: locationLoading } = useUserLocation();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="responsive-container py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-6 shrink-0">
            <Logo />
            <LocationPill
              address={address}
              loading={locationLoading}
              onClick={() => setIsLocationModalOpen(true)}
            />
          </div>

          <SearchBar />

          <NavActions
            isAuthenticated={isAuthenticated}
            user={user}
            onLoginClick={() => setIsAuthModalOpen(true)}
            onProfileClick={() => navigate("/profile")}
            cartCount={cartCount}
          />
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
      />

      <MobileBottomNav
        onSearchClick={() => navigate("/search")}
        onLoginClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        cartCount={cartCount}
      />
    </>
  );
};

export default Navbar;
