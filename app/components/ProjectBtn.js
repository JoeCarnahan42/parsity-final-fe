"use client";
import axios from "axios";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";

export const ProjectBtn = (props) => {
  const { setProject } = useProjectContext();
  const { setShowWindow, setShowBreakdown } = useWindowContext();

  const getProject = async (e) => {
    // TODO - make button color red if there is an active blocker
    try {
      const response = await axios.get(
        `https://parsity-final-be.onrender.com/projects/${e.target.id}`,
        {
          withCredentials: true,
        }
      );
      setProject(response.data);
      setShowWindow(true);
      setShowBreakdown(true);
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
