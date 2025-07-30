"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function PostLoginPage() {
  const { setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://parsity-final-be.onrender.com/login/auth/user", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          router.replace("/"); // or redirect to dashboard
        }
      })
      .catch((err) => {
        console.error("Login failed", err);
        router.replace("/"); // fallback or login page
      });
  }, []);

  return <p>Logging you in...</p>;
}
