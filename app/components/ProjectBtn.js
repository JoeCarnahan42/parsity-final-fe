"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useProjectContext } from "../context/ProjectContext";

export const ProjectBtn = (props) => {
  const { setProject, setShowWindow } = useProjectContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getProject = async (e) => {
    try {
      setLoading(true);
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
      setLoading(false);
      setError("Error retrieving project");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // update context here??
  });

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
