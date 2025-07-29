"use client";
import axios from "axios";
import { useState } from "react";

// components
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";

export const Blockers = () => {
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const {
    project,
    setProject,
    setAllBlockers,
    allBlockers,
    numOfBlockers,
    setNumOfBlockers,
  } = useProjectContext();
  const { setShowBlockers } = useWindowContext();

  // Sets color coding based on severity
  const severityClassMap = {
    high: "border-danger text-danger",
    medium: "border-warning text-warning",
    low: "border-success text-success",
  };

  const projectId = project.id;

  const deleteBlocker = async (id) => {
    try {
      await axios.delete(
        `https://parsity-final-be.onrender.com/comments/${projectId}/blockers/${id}`,
        {
          withCredentials: true,
        }
      );
      setAllBlockers([...allBlockers.filter((blocker) => blocker.id !== id)]);
      setNumOfBlockers(numOfBlockers - 1);
      setProject({
        ...project,
        blockers: project.blockers.filter((blocker) => blocker.id !== id),
      });
      setConfirmationMsg("Blocker Deleted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Blockers</h1>
      <hr />
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          whiteSpace: "pre-wrap",
          height: "450px",
        }}
        className="container"
      >
        {project.blockers.map((blocker) => (
          <div
            className={`border rounded ${
              severityClassMap[blocker.severity] ||
              "border-secondary text-secondary"
            }`}
            key={blocker.id}
          >
            <p>
              {blocker.date} - <u>Severity</u>: {blocker.severity} -{" "}
              <u>Status</u>: {blocker.status} - {blocker.name}
            </p>
            <p>
              <u>Description</u>: {blocker.description}
            </p>
            <div className="row justify-content-center">
              <button
                onClick={() => updateBlocker(blocker.id)}
                className="col-1 btn btn-secondary"
              >
                Update
              </button>
              <br />
              <button
                onClick={() => deleteBlocker(blocker.id)}
                className="col-1 btn btn-danger"
              >
                Delete
              </button>
            </div>
            <br />
          </div>
        ))}
      </div>
      <br />
      {confirmationMsg && (
        <div className="alert alert-success text-center fade show" role="alert">
          {confirmationMsg}
        </div>
      )}
      <button onClick={() => setShowBlockers(false)} className="btn btn-danger">
        Close
      </button>
    </>
  );
};
