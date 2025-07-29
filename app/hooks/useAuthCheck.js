"use client";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useAuthCheck = (intervalMs = 5 * 60 * 1000) => {
  const { setUser, user, setSessionExpired, isSessionActive } = useAuth();
  // TODO - import application state and reset everything when session expires

  useEffect(() => {
    let timeoutId;

    if (!user) {
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await axios.get(
          "https://parsity-final-be.onrender.com/login/check",
          {
            withCredentials: true,
          }
        );
        setSessionExpired(false);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        setUser(res.data.user);
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
  }, [setUser, intervalMs, setSessionExpired, isSessionActive]);
};
