"use client";
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export const useInitialAuth = () => {
  const router = useRouter();
  const { setUser, user } = useAuth();
  useEffect(() => {
    const checkAndRedirect = async () => {
      try {
        const res = await axios.get(
          "https://parsity-final-be.onrender.com/login/check",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200 || 304) {
          setUser(res.data.user);
          router.push("/");
        }
      } catch (err) {
        // Not authenticated — do nothing
        console.log("User not authenticated");
      }
    };
    checkAndRedirect();
  }, []);
};
