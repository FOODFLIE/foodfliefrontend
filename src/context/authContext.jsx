import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [partner, setPartner] = useState(null);
  const [partnerToken, setPartnerToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedPartner = localStorage.getItem("partner");
    const storedPartnerToken = localStorage.getItem("partnerToken");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    
    if (storedPartner && storedPartnerToken) {
      setPartner(JSON.parse(storedPartner));
      setPartnerToken(storedPartnerToken);
    }
    
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  };

  const partnerLogin = (partnerData, partnerTokenValue) => {
    setPartner(partnerData);
    setPartnerToken(partnerTokenValue);
    localStorage.setItem("partner", JSON.stringify(partnerData));
    localStorage.setItem("partnerToken", partnerTokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("foodflie_selected_address");
    localStorage.removeItem("recent_searches");
    localStorage.removeItem("accessToken");
  };

  const partnerLogout = () => {
    setPartner(null);
    setPartnerToken(null);
    localStorage.removeItem("partner");
    localStorage.removeItem("partnerToken");
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        token, 
        partner, 
        partnerToken, 
        login, 
        partnerLogin, 
        logout, 
        partnerLogout, 
        isAuthenticated: !!token, 
        isPartnerAuthenticated: !!partnerToken,
        loading 
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
