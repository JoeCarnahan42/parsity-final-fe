"use client";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { Sparklines, SparklinesBars } from "react-sparklines";

export const ProjectBreakdown = () => {
  const { project } = useProjectContext();

  const {
    setShowDetails,
    setShowUpdateForm,
    setShowBlockers,
    setShowComments,
    setShowNewMetrics,
  } = useWindowContext();

  return (
    <div>
      {/* TODO - delete console log */}
      {console.log(project)}
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
          onClick={() => setShowBlockers(true)}
          style={{
            backgroundColor: "orange",
            height: "50px",
            fontSize: "x-large",
          }}
          className="border rounded w-25 text-center"
        >
          Blockers: {project.blockers?.length || 0}
        </button>
        <button
          onClick={() => setShowComments(true)}
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
          <button
            onClick={() => setShowDetails(true)}
            className="btn btn-primary"
          >
            Details
          </button>
        </div>
        <div className="border rounded flex-grow-1 p-3">
          <h4 className="text-center">
            <u>Current Metrics</u>
          </h4>
          {project.currentMetrics[0] ? (
            <div>
              <p>
                Estimated Completion: {project.currentMetrics[0].expected_date}
              </p>
              <p>
                Current Hours Spent: {project.currentMetrics[0].budget_hours}
              </p>
              <p>Total Spent: {project.currentMetrics[0].budget_money}</p>
              {/* TODO - Add more metrics, finish component/ Comments and Blockers */}
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-4">
                    <label>
                      <u>Hours</u>
                    </label>
                    <Sparklines
                      data={[
                        project.projectedMetrics[0].budget_hours,
                        project.currentMetrics[0].budget_hours,
                      ]}
                      width={30}
                      height={15}
                    >
                      <SparklinesBars style={{ fill: "#41c3f9" }} />
                    </Sparklines>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span>Budgeted</span>
                      <span>Used</span>
                    </div>
                  </div>
                  <div className="col-4">
                    <u>Money</u>
                    <Sparklines
                      data={[
                        project.projectedMetrics[0].budget_money,
                        project.currentMetrics[0].budget_money,
                      ]}
                      width={30}
                      height={15}
                    >
                      <SparklinesBars style={{ fill: "#41c3f9" }} />
                    </Sparklines>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.75rem",
                      }}
                    >
                      <span>Budgeted</span>
                      <span>Used</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                id={project.id}
                onClick={() => setShowUpdateForm(true)}
                className="btn btn-secondary"
              >
                Update Project
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p>Current Metrics have not been uploaded.</p>
              <button
                id={project.id}
                onClick={() => setShowNewMetrics(true)}
                className="btn btn-secondary"
              >
                Add Updated Metrics
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
