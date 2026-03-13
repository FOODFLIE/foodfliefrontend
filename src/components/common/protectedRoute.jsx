import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

/**
 * A route that requires the user to be authenticated.
 * If not logged in, navigates to home and opens the login modal.
 */
const ProtectedRoute = ({ children, onLoginClick }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  if (!isAuthenticated) {
    // Navigate to home and open auth modal
    navigate("/", { replace: true });
    if (onLoginClick) onLoginClick();
    return null;
  }

  return children;
};

export default ProtectedRoute;
