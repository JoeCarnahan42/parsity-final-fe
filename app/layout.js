import "bootstrap/dist/css/bootstrap.css";
import "../global.css";
import { AuthProvider } from "./context/AuthContext";
import { ProjectContextProvider } from "./context/ProjectContext";
import { ToggleViewProvider } from "./context/ViewContext";
import { WindowContextProvider } from "./context/WindowContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToggleViewProvider>
          <ProjectContextProvider>
            <WindowContextProvider>
              <AuthProvider>{children}</AuthProvider>
            </WindowContextProvider>
          </ProjectContextProvider>
        </ToggleViewProvider>
      </body>
    </html>
  );
}
