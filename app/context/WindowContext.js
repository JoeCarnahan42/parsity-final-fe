"use client";
import { createContext, useContext, useState } from "react";
import { useProjectContext } from "./ProjectContext";

const WindowContext = createContext();

export const WindowContextProvider = ({ children }) => {
  const { setProject } = useProjectContext();

  const [showWindow, setShowWindow] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showNewProjForm, setShowNewProjForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [whatToUpdate, setWhatToUpdate] = useState(null);

  const closeWindow = () => {
    setShowDetails(false);
    setProject(null);
    setShowWindow(false);
    setShowNewProjForm(false);
    setShowBreakdown(false);
    setShowUpdateForm(false);
    setWhatToUpdate(null);
  };

  return (
    <WindowContext.Provider
      value={{
        showWindow,
        setShowWindow,
        showDetails,
        setShowDetails,
        closeWindow,
        showNewProjForm,
        setShowNewProjForm,
        setShowBreakdown,
        showBreakdown,
        showUpdateForm,
        setShowUpdateForm,
        whatToUpdate,
        setWhatToUpdate,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => useContext(WindowContext);
