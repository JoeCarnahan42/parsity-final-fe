"use client";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthForm = () => {
  const { login } = useAuth();
  const router = useRouter();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (emailRef.current?.value) setEmail(emailRef.current.value);
      if (passwordRef.current?.value) setPassword(passwordRef.current.value);
    }, 100);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      router.push("/board-overview");
    } catch (err) {
      console.error("Login Failed", err);
      setError(err?.response?.data?.message || "Login failed.");
    } finally {
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
        <form className="container" onSubmit={handleLogin}>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              ref={emailRef}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
              className="form-control"
              ref={passwordRef}
              type="password"
              name="password"
              autoComplete="password"
              required
              value={password}
              onInput={(e) => setPassword(e.target.value)}
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
