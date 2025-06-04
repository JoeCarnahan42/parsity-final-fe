"use client";
import { createContext, useContext, useState } from "react";
import { useProjectContext } from "./ProjectContext";

const WindowContext = createContext();

export const WindowContextProvider = ({ children }) => {
  const { setProject } = useProjectContext();

  const [showWindow, setShowWindow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const closeWindow = () => {
    setShowDetails(false);
    setProject(null);
    setShowWindow(false);
  };

  return (
    <WindowContext.Provider
      value={{
        showWindow,
        setShowWindow,
        showDetails,
        setShowDetails,
        closeWindow,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => useContext(WindowContext);
