"use client";
import { AuthForm } from "./components/AuthForm";
import { useAuth } from "./context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  return <>{user ? <button onClick={logout}>Logout</button> : <AuthForm />}</>;
}
