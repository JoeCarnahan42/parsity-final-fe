"use client";
import { useAuth } from "../context/AuthContext";

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button className="btn btn-danger" onClick={logout}>
      Logout
    </button>
  );
}
