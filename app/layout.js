import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from "./context/AuthContext";
import { ProjectContextProvider } from "./context/ProjectContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProjectContextProvider>
          <AuthProvider>{children}</AuthProvider>
        </ProjectContextProvider>
      </body>
    </html>
  );
}
