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
  const [authMode, setAuthMode] = useState("login");

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://parsity-final-be.onrender.com/login/",
        credentials,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setUser(res.data);
      setIsSessionActive(true);
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    await axios.post(
      "https://parsity-final-be.onrender.com/login/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
    setAuthMode("login");
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
