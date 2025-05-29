"use client";
import { useProjectContext } from "../context/ProjectContext";

export const ProjectBreakdown = () => {
  const { setShowWindow, project, setProject } = useProjectContext();

  const currentMetrics = project.currentMetrics?.[0];

  return (
    <div
      style={{
        position: "fixed", // or 'fixed'
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
            setShowWindow(false);
            setProject(null);
          }}
        >
          X
        </button>
      </div>
      <div>
        {console.log(project)}
        {/* TODO - populate window with project info */}
        <br />
        <div className="container d-flex justify-content-between align-items-center gap-2 my-3">
          <button
            style={{
              backgroundColor: "aqua",
              height: "50px",
              fontSize: "x-large",
            }}
            className="border rounded w-50 text-center"
          >
            Status: <strong>{project.state}</strong>
          </button>
          <button
            style={{
              backgroundColor: "lavender",
              height: "50px",
              fontSize: "x-large",
            }}
            className="border rounded w-25 text-center"
          >
            Blockers: {project.blockers?.length || 0}
          </button>
          <button
            style={{
              backgroundColor: "forestgreen",
              height: "50px",
              fontSize: "x-large",
            }}
            className="border rounded w-25 text-center"
          >
            Comments: {project.comments?.length || 0}
          </button>
        </div>
        <div className="d-flex w-100 p-3">
          <div
            style={{ width: "300px" }}
            className="me-3 d-flex flex-column gap-3"
          >
            <div className="border rounded p-2">
              <p className="mt-0">
                <u>Description</u>
              </p>
              <h3
                style={{
                  height: "150px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  whiteSpace: "pre-wrap",
                }}
              >
                {project.description}
              </h3>
            </div>
            <br />
            <div className="border rounded">
              <p className="mt-0">
                <u>Projections</u>
              </p>
              <div
                style={{
                  height: "150px",
                  overflowY: "auto",
                  overflowX: "hidden",
                  fontSize: "x-large",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <p>Due: {project.projectedMetrics[0].due_date}</p>
                <p>Budget: {project.projectedMetrics[0].budget_money}</p>
                <p>Est. Hours: {project.projectedMetrics[0].budget_hours}</p>
              </div>
            </div>
            <br />
            <button className="btn btn-primary">Details</button>
          </div>
          <div className="border rounded flex-grow-1 p-3">
            <h4 className="text-center">
              <u>Current Metrics</u>
            </h4>
            {currentMetrics ? (
              <div>
                <p>Estimated Completion: {currentMetrics.expected_date}</p>
                <p>Total Spent: {currentMetrics.budget_money}</p>
                {/* TODO - Add more metrics, finish component/ Comments and Blockers */}
              </div>
            ) : (
              <div className="text-center">
                <p>Current Metrics have not been uploaded.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
