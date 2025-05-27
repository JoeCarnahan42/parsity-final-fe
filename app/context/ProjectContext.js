"use client";
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [showWindow, setShowWindow] = useState(false);

  return (
    <ProjectContext.Provider
      value={{ project, setProject, showWindow, setShowWindow }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
