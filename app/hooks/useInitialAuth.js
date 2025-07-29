"use client";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useInitialAuth = () => {
  const { setUser, user } = useAuth();
  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const res = await axios.get("http://localhost:8000/login/check", {
          withCredentials: true,
        });
        if (res.status === 200 || 304) {
          setUser(res.data.user);
        }
      } catch (err) {
        // Not authenticated — do nothing
        console.log("User not authenticated");
      }
    };
    checkAndRedirect();
  }, []);
};
