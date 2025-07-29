"use client";
import Image from "next/image";
import axios from "axios";

export const GoogleLoginBtn = () => {
  const handleGoogleLogin = () => {
    const popup = window.open(
      "https://parsity-final-be.onrender.com/login/google",
      "_blank",
      "width=500,height=600"
    );

    const interval = setInterval(() => {
      if (popup?.closed) {
        clearInterval(interval);
        // Check if login was successful
        axios
          .get("https://parsity-final-be.onrender.com/login/check", {
            withCredentials: true,
          })
          .then((res) => {
            if (res.data.user) {
              // Redirect or update UI
              window.location.href = "/dashboard";
            } else {
              alert("Google login failed.");
            }
          })
          .catch(() => alert("Login check failed."));
      }
    }, 1000);
  };

  return (
    <button
      className="align-items-center border border-secondary rounded px-3 py-2 bg-white shadow-sm"
      onClick={handleGoogleLogin}
      style={{ gap: "10px", fontWeight: 500 }}
    >
      <Image
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google logo"
        width={20}
        height={20}
      />
      Continue with Google
    </button>
  );
};
