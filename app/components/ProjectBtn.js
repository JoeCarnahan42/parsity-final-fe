"use client";
import axios from "axios";
import { useProjectContext } from "../context/ProjectContext";

export const ProjectBtn = (props) => {
  const { setProject, setShowWindow } = useProjectContext();

  const getProject = async (e) => {
    try {
      const response = await axios.get(
        `https://parsity-final-be.onrender.com/projects/${e.target.id}`,
        {
          withCredentials: true,
        }
      );
      setProject(response.data);
      setShowWindow(true);
    } catch (err) {
      console.error("Failed to retrieve project.", err);
    }
  };

  return (
    <>
      <button
        onClick={getProject}
        id={props.project.id}
        className="btn btn-primary w-100"
      >
        {props.project.title} : {props.project.customer}
      </button>
    </>
  );
};
