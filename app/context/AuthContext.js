"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const router = useRouter();

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "https://parsity-final-be.onrender.com/login/",
        credentials,
        {
          withCredentials: true,
        }
      );
      setUser(res.data);
      router.push("/board-overview");
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  const logout = async () => {
    await axios.post(
      "https://parsity-final-be.onrender.com/login/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
