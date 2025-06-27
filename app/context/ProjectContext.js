"use client";
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [projectPool, setProjectPool] = useState([]);
  const [project, setProject] = useState(null);
  const [allComments, setAllComments] = useState(0);
  const [allBlockers, setAllBlockers] = useState(0);

  return (
    <ProjectContext.Provider
      value={{
        projectPool,
        setProjectPool,
        project,
        setProject,
        allBlockers,
        allComments,
        setAllBlockers,
        setAllComments,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
