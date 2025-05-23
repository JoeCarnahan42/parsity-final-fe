"use client";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // adjust path

export const RegForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(
        "https://parsity-final-be.onrender.com/register/",
        { email, password },
        { withCredentials: true }
      );
      await login({ email, password });
    } catch (err) {
      console.error("Registration or login failed:", err);
      setError(err?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="container mt-4" onSubmit={handleRegister}>
      {error && <p className="text-danger">{error}</p>}
      <div className="form-group">
        <label>Email</label>
        <input
          className="form-control form-control-sm mx-auto"
          style={{ maxWidth: "250px" }}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mt-2">Password</label>
        <input
          className="form-control form-control-sm mx-auto"
          style={{ maxWidth: "250px" }}
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button
          className="btn btn-success mt-3"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
};
