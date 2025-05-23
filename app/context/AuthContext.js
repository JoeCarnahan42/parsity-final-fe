"use client";
import axios from "axios";

const { createContext, useState, useEffect, useContext } = require("react");

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  // TODO - Check for authentication
  // useEffect(() => {
  //   axios
  //     .get("/auth/me", { withCredentials: true })
  //     .then((res) => setUser(res.data))
  //     .catch(() => setUser(null));
  // }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post("/login/", credentials, {
        withCredentials: true,
      });
      setUser(res.data); // TODO - update backend to return user info
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
