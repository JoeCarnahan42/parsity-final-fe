"use client";
import Image from "next/image";
import { useInitialAuth } from "./hooks/useInitialAuth";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { useAuth } from "./context/AuthContext";

// Components
import { AuthForm } from "./components/AuthForm";
import { RegForm } from "./components/RegForm";
import { BoardOverview } from "./components/BoardOverview";
import { GoogleLoginBtn } from "./components/GoogleLoginBtn";

export default function MainAuth() {
  // TODO - look into a react currency library
  useInitialAuth();
  useAuthCheck();
  const { user, authMode, setAuthMode, sessionExpired, loading } = useAuth();

  return (
    <div className="text-center mt-5">
      {sessionExpired === true && (
        <>
          <p style={{ color: "red" }}>Session Expired</p>
          <button
            className="btn btn-link p-0"
            onClick={() => setAuthMode("login")}
          >
            Back To Login
          </button>
        </>
      )}
      {loading === true && <h1>Loading, please wait...</h1>}
      {!user && (
        <>
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
              <GoogleLoginBtn />
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
        </>
      )}

      {user && <BoardOverview />}
    </div>
  );
}
