"use client";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import { useAuthCheck } from "../hooks/useAuthCheck";

export const AuthForm = () => {
  const sessionExpired = useAuthCheck();
  const { login } = useAuth();
  const { setSessionExpired, setAuthMode } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handles Autofill
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
    setSessionExpired(false);
    setAuthMode(null);

    try {
      await login({ email, password });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center mt-5">
          <h2>Attempting to log in... This may take a while.</h2>
        </div>
      ) : (
        <form className="container" onSubmit={handleLogin}>
          {error && <p className="text-danger">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control form-control-sm mx-auto"
              style={{ maxWidth: "250px" }}
              ref={emailRef}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
            <label className="mt-2">Password</label>
            <input
              className="form-control form-control-sm mx-auto"
              style={{ maxWidth: "250px" }}
              ref={passwordRef}
              type="password"
              name="password"
              autoComplete="password"
              required
              value={password}
              onInput={(e) => setPassword(e.target.value)}
            />
            <br />
            {sessionExpired ? (
              <p style={{ color: "red" }}>Session Expired</p>
            ) : null}
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};
