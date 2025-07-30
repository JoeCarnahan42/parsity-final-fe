"use client";
import Image from "next/image";
import axios from "axios";
import { useInitialAuth } from "./hooks/useInitialAuth";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

// Components
import { BoardOverview } from "./components/BoardOverview";

export default function MainAuth() {
  // TODO - look into a react currency library
  // useInitialAuth();
  // useAuthCheck();
  const { user, setUser, sessionExpired, loading } = useAuth();

  useEffect(() => {
    const handleMessage = (event) => {
      console.log("log 1", event);
      if (
        event.origin === "https://parsity-final-be.onrender.com" &&
        event.data.loggedIn === true
      ) {
        console.log("log 2: request fires");
        axios
          .get("https://parsity-final-be.onrender.com/login/auth/user", {
            withCredentials: true,
          })
          .then((res) => {
            console.log("log 3", res);
            if (res.data.user) {
              setUser(res.data.user);
            }
          })
          .catch(() => {
            setUser(null);
          });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
          <>
            <button
              className="btn align-items-center border border-secondary rounded px-3 py-2 bg-white shadow-sm"
              onClick={() => {
                const popup = window.open(
                  "https://parsity-final-be.onrender.com/login/google",
                  "_blank",
                  "width=500,height=600"
                );

                const interval = setInterval(() => {
                  if (popup?.closed) {
                    clearInterval(interval);
                    axios
                      .get(
                        "https://parsity-final-be.onrender.com/login/auth/user",
                        {
                          withCredentials: true,
                        }
                      )
                      .then((res) => {
                        setUser(res.data.user);
                      })
                      .catch((err) => {
                        console.error("Not logged in", err);
                      });
                  }
                }, 500);
              }}
              style={{ gap: "10px", fontWeight: "500" }}
            >
              <Image
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google logo"
                width={20}
                height={20}
              />
              Continue with Google
            </button>
          </>
        </>
      )}

      {user && <BoardOverview />}
    </div>
  );
}
