"use client";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuthCheck = (intervalMs = 5 * 60 * 1000) => {
  const router = useRouter();
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
          router.push("/");
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, intervalMs);
    return () => clearInterval(interval);
  }, [setUser, intervalMs, router]);
};
