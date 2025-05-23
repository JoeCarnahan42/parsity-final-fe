"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useInitialAuth = () => {
  const router = useRouter();

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
          router.push("/board-overview");
        }
      } catch (err) {
        // Not authenticated — do nothing
      }
    };
    checkAndRedirect();
  }, [router]);
};
