"use client";
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  // TODO - Add a state that tracks budget info hold the sum of
  // various purchase information to track total spending and budget comparison
  const [projectPool, setProjectPool] = useState([]);
  const [project, setProject] = useState(null);
  const [numOfComments, setNumOfComments] = useState(0);
  const [numOfBlockers, setNumOfBlockers] = useState(0);
  const [allComments, setAllComments] = useState([]);
  const [allBlockers, setAllBlockers] = useState([]);

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
        numOfBlockers,
        numOfComments,
        setNumOfBlockers,
        setNumOfComments,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
