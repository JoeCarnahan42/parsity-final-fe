"use client";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useAuthCheck = (intervalMs = 5 * 60 * 1000) => {
  const { setUser } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://parsity-final-be.onrender.com/login/check",
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
          console.log("Session expired. User logged out.");
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, intervalMs);
    return () => clearInterval(interval);
  }, [setUser, intervalMs]);
};
