"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
// TODO - Fix/Finish authentication (Review parsity module)

export const AuthForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const login = async (e) => {
    e.preventDefault();
    const credentials = {
      email,
      password,
    };
    try {
      await axios.post(
        "https://parsity-final-be.onrender.com/login/",
        credentials,
        {
          withCredentials: true,
        }
      );
      router.push("/Board-Overview");
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  return (
    <>
      <form className="container" onSubmit={login}>
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
    </>
  );
};
