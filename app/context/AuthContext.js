"use client";
import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  useEffect(() => {});
  const [user, setUser] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "https://parsity-final-be.onrender.com/login/",
        credentials,
        {
          withCredentials: true,
        }
      );
      setUser(res.data);
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
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        sessionExpired,
        setSessionExpired,
        authMode,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
