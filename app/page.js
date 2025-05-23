"use client";
import { useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { RegForm } from "./components/RegForm";

export default function MainAuth() {
  const [authMode, setAuthMode] = useState("login"); // always start on login

  return (
    <div className="text-center mt-5">
      {authMode === "login" && (
        <>
          <AuthForm />
          <p className="mt-3">
            Don&apos;t have an account?{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => setAuthMode("register")}
            >
              Register here
            </button>
          </p>
        </>
      )}

      {authMode === "register" && (
        <>
          <RegForm />
          <p className="mt-3">
            Already have an account?{" "}
            <button
              className="btn btn-link p-0"
              onClick={() => setAuthMode("login")}
            >
              Login here
            </button>
          </p>
        </>
      )}
    </div>
  );
}
