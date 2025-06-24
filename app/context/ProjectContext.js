"use client";
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projectPool, setProjectPool] = useState([]);
  const [project, setProject] = useState(null);

  return (
    <ProjectContext.Provider
      value={{
        projectPool,
        setProjectPool,
        project,
        setProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
