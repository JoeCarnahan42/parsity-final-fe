"use client";
import { createContext, useContext, useState } from "react";
import { useProjectContext } from "./ProjectContext";

const WindowContext = createContext();

export const WindowContextProvider = ({ children }) => {
  const { setProject } = useProjectContext();

  // State for wether or not the empty window is visible
  const [showWindow, setShowWindow] = useState(false);
  // State for wether or not the project breakdown is visible
  const [showBreakdown, setShowBreakdown] = useState(false);
  // State for wether or not the projects blockers are visible
  const [showBlockers, setShowBlockers] = useState(false);
  // State for wether or not the projects comments are visible
  const [showComments, setShowComments] = useState(false);
  // State for wether or not the expanded project details are visible
  const [showDetails, setShowDetails] = useState(false);
  // State for wether or not the new project form is visible
  const [showNewProjForm, setShowNewProjForm] = useState(false);
  // State for wether or not the update form is visible
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  // TODO - rename this. State for which new data is being added. EX. comments/blockers/current metrics
  const [whatToUpdate, setWhatToUpdate] = useState(null);
  // State for choosing which project detail needs edited. EX. state, title, customer...
  const [whatToEdit, setWhatToEdit] = useState(null);

  const closeWindow = () => {
    setShowDetails(false);
    setProject(null);
    setShowWindow(false);
    setShowNewProjForm(false);
    setShowBreakdown(false);
    setShowUpdateForm(false);
    setWhatToUpdate(null);
    setShowBlockers(false);
    setShowComments(false);
    setWhatToEdit(null);
  };

  return (
    <WindowContext.Provider
      value={{
        showWindow,
        setShowWindow,
        showDetails,
        setShowDetails,
        showBlockers,
        setShowBlockers,
        showComments,
        setShowComments,
        closeWindow,
        showNewProjForm,
        setShowNewProjForm,
        showBreakdown,
        setShowBreakdown,
        showUpdateForm,
        setShowUpdateForm,
        whatToUpdate,
        setWhatToUpdate,
        whatToEdit,
        setWhatToEdit,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};

export const useWindowContext = () => useContext(WindowContext);
