"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const AuthForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = async (e) => {
    e.preventDefault();
    setError("");
    const credentials = {
      email,
      password,
    };
    try {
      setLoading(true);
      await axios.post(
        "https://parsity-final-be.onrender.com/login/",
        credentials,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      router.push("/board-overview");
    } catch (err) {
      console.error("Login Failed", err);
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <h2>Attempting to log in...</h2>
        </div>
      ) : (
        <form className="container" onSubmit={login}>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};
