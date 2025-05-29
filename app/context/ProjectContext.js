"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

export const ProjectContextProvider = ({ children }) => {
  const [project, setProject] = useState(null);
  const [showWindow, setShowWindow] = useState(false);
  const [showDetailsWindow, setShowDetailsWindow] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    if (project) {
      const getMaterials = async () => {
        try {
          const response = await axios.get(
            `https://parsity-final-be.onrender.com/materials/${project.id}`,
            {
              withCredentials: true,
            }
          );
          setMaterials(response.data);
        } catch (err) {
          console.error("Failed to retrieve materials.", err);
        }
      };
      getMaterials();
    }
  }, [project]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        showWindow,
        setShowWindow,
        showDetailsWindow,
        setShowDetailsWindow,
        materials,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
