"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://parsity-final-be.onrender.com/login/logout",
        {},
        {
          withCredentials: true,
        }
      );
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}
