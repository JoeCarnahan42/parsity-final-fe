"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuthCheck = (intervalMs = 5 * 60 * 1000) => {
  const router = useRouter();
  const { setUser, setSessionExpired } = useAuth();

  useEffect(() => {
    let timeoutId;

    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://parsity-final-be.onrender.com/login/check",
          {
            withCredentials: true,
          }
        );
        setUser(res.data);
        setSessionExpired(false);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setUser(null);
          setSessionExpired(true);
          console.log("Session expired. User logged out.");
          setTimeout(() => {}, 3000);
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, intervalMs);
    return () => clearInterval(interval);
  }, [setUser, intervalMs, router, setSessionExpired]);
};
