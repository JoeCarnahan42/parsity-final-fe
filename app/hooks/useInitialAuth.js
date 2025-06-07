"use client";
import { useEffect } from "react";
import axios from "axios";

export const useInitialAuth = () => {
  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const res = await axios.get(
          "https://parsity-final-be.onrender.com/login/check",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
        }
      } catch (err) {
        // Not authenticated — do nothing
      }
    };
    checkAndRedirect();
  }, []);
};
