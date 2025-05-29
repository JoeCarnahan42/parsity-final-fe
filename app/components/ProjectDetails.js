"use client";
import { useProjectContext } from "../context/ProjectContext";

export const ProjectDetails = () => {
  const { setShowDetailsWindow, project } = useProjectContext();

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "1000px",
        height: "700px",
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f0f0f0",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {project.title} : {project.customer}
        </span>
        <button
          onClick={() => {
            setShowDetailsWindow(false);
          }}
        >
          X
        </button>
      </div>
      <div>
        {console.log("PURCHASE LIST ---", project.purchaseList)}
        {console.log("TASKS ---", project.tasks)}
        {/* TODO - populate window with project info */}
      </div>
    </div>
  );
};
