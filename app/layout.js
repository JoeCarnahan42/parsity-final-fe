import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./context/AuthContext";
import { useAuthCheck } from "./hooks/useAuthCheck";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}
