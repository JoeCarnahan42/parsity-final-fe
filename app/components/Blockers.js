import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";

export const Blockers = () => {
  const { project } = useProjectContext();
  const { setShowBlockers } = useWindowContext();

  const severityClassMap = {
    high: "border-danger text-danger",
    medium: "border-warning text-warning",
    low: "border-success text-success",
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
          height: "500px",
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
              {blocker.date} - {blocker.severity} - {blocker.status} -{" "}
              {blocker.name}
            </p>
            <p>Description: {blocker.description}</p>
            <div className="row justify-content-center">
              <button className="col-1 btn btn-secondary">Update</button>
              <br />
              <button className="col-1 btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
      <br />
      <button onClick={() => setShowBlockers(false)} className="btn btn-danger">
        Close
      </button>
    </>
  );
};
