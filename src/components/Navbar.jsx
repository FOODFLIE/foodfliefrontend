import React, { useState } from "react";
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

const Navbar = () => {
  const { user, isAuthenticated } = useAuth();
  const { address, loading: locationLoading } = useUserLocation();
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="responsive-container py-3 flex items-center justify-between gap-4 sm:gap-8">
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
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
        onSearchClick={() => setIsSearchOpen(true)}
        onLoginClick={() => setIsAuthModalOpen(true)}
        isAuthenticated={isAuthenticated}
        cartCount={0}
      />
    </>
  );
};

export default Navbar;
