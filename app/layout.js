import "bootstrap/dist/css/bootstrap.css";
import "../global.css";
import { AuthProvider } from "./context/AuthContext";
import { ProjectContextProvider } from "./context/ProjectContext";
import { ToggleViewProvider } from "./context/ViewContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToggleViewProvider>
          <ProjectContextProvider>
            <AuthProvider>{children}</AuthProvider>
          </ProjectContextProvider>
        </ToggleViewProvider>
      </body>
    </html>
  );
}
