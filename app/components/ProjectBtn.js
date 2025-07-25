"use client";
import axios from "axios";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { useAuth } from "../context/AuthContext";

export const ProjectBtn = (props) => {
  const { setProject, allBlockers } = useProjectContext();
  const { setShowWindow, setShowBreakdown, setShowArchives } =
    useWindowContext();
  const { setLoading } = useAuth();
  const id = props.project.id;
  const blockers = allBlockers.filter((blocker) => blocker.project_id === id);
  const numBlockers = blockers.length;

  const getProject = async (e) => {
    setLoading(true);
    setShowWindow(true);
    setShowArchives(false);
    try {
      const response = await axios.get(
        `https://parsity-final-be.onrender.com/projects/${e.currentTarget.id}`,
        {
          withCredentials: true,
        }
      );
      setProject(response.data);
      setShowBreakdown(true);
      setLoading(false);
    } catch (err) {
      console.error("Failed to retrieve project.", err);
    }
  };

  return (
    <>
      <button
        onClick={getProject}
        id={props.project.id}
        className={`btn w-100 d-flex justify-content-between align-items-center btn-primary`}
      >
        <span>
          {props.project.title} : {props.project.customer}
        </span>
        <span
          className={`text-center ${
            numBlockers > 0 ? "bg-danger" : "bg-success"
          } ${numBlockers > 0 ? "text-light" : "text-dark"}`}
          style={{
            minWidth: "32px",
            height: "24px",
            lineHeight: "24px",
            fontSize: "0.6rem",
            borderRadius: "4px",
            paddingLeft: "2px",
            paddingRight: "2px",
          }}
        >
          Blockers: {numBlockers}
        </span>
      </button>
    </>
  );
};
