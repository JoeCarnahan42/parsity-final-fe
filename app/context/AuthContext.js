"use client";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // TODO - Handle setloading here!
  useEffect(() => {});
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);

  const logout = async () => {
    await axios.post(
      "https://parsity-final-be.onrender.com/login/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    setIsSessionActive(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        login,
        logout,
        sessionExpired,
        setSessionExpired,
        authMode,
        setAuthMode,
        isSessionActive,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
