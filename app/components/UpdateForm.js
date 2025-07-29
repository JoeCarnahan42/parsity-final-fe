"use client";
import { useState } from "react";
import axios from "axios";
import { useWindowContext } from "../context/WindowContext";
import { useProjectContext } from "../context/ProjectContext";

export const UpdateForm = () => {
  const { setShowUpdateForm, whatToUpdate, setWhatToUpdate } =
    useWindowContext();
  const {
    project,
    setProject,
    allComments,
    allBlockers,
    setAllComments,
    setAllBlockers,
    numOfComments,
    numOfBlockers,
    setNumOfBlockers,
    setNumOfComments,
    setProjectPool,
  } = useProjectContext();

  // Local States
  const [confirmationMsg, setConfirmationMsg] = useState("");

  // These states could be reduced to one dynamic state
  const [commentInput, setCommentInput] = useState({
    comment: "",
    date: "",
    name: "",
  });
  const [blockerInput, setBlockerInput] = useState({
    description: "",
    severity: "",
    status: "",
    date: "",
    name: "",
  });
  const [projectInput, setProjectInput] = useState({});
  const [metricInput, setMetricInput] = useState({});

  // This function does not need all the conditionals if the input state is dynamic
  const handleChange = (e) => {
    if (whatToUpdate === "Comment") {
      setCommentInput({
        ...commentInput,
        [e.target.name]: e.target.value,
      });
    }

    if (whatToUpdate === "Blocker") {
      setBlockerInput({
        ...blockerInput,
        [e.target.name]: e.target.value,
      });
    }

    if (whatToUpdate === "State") {
      setProjectInput({
        ...projectInput,
        [e.target.name]: e.target.value,
      });
    }

    if (whatToUpdate === "Metrics") {
      setMetricInput({
        ...metricInput,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectId = project.id;
    if (whatToUpdate === "Comment") {
      if (!commentInput.comment || !commentInput.date) {
        console.error("Missing required fields");
        return;
      }

      try {
        const res = await axios.post(
          `https://parsity-final-be.onrender.com/comments/${projectId}/comments`,
          commentInput,
          {
            withCredentials: true,
          }
        );
        setProject((prevProject) => ({
          ...prevProject,
          comments: [...prevProject.comments, res.data],
        }));
        setNumOfComments(numOfComments + 1);
        setAllComments([...allComments, res.data]);
        setCommentInput({
          comment: "",
          date: "",
          name: "",
        });
        setConfirmationMsg("Posted successfully!");
      } catch (err) {
        console.error(err);
        setConfirmationMsg("Error");
      }
    }

    if (whatToUpdate === "Blocker") {
      if (!blockerInput.description || !blockerInput.date) {
        console.error("Missing required fields");
        return;
      }

      try {
        const res = await axios.post(
          `https://parsity-final-be.onrender.com/comments/${projectId}/blockers`,
          blockerInput,
          {
            withCredentials: true,
          }
        );
        setProject((prevProject) => ({
          ...prevProject,
          blockers: [...prevProject.blockers, res.data],
        }));
        setNumOfBlockers(numOfBlockers + 1);
        setAllBlockers([...allBlockers, res.data]);
        setBlockerInput({
          description: "",
          severity: "",
          status: "",
          date: "",
          name: "",
        });
        setConfirmationMsg("Posted successfully!");
      } catch (err) {
        console.error(err);
        setConfirmationMsg("Error");
      }
    }

    if (whatToUpdate === "State") {
      if (!projectInput.state) {
        console.error("Missing updated state");
      }

      try {
        await axios.put(
          `https://parsity-final-be.onrender.com/projects/${projectId}`,
          projectInput,
          {
            withCredentials: true,
          }
        );
        setProject((prevProject) => ({
          ...prevProject,
          ...projectInput,
        }));
        setProjectPool((prevPool) =>
          prevPool.map((project) =>
            project.id === projectId ? { ...project, ...projectInput } : project
          )
        );
        setProjectInput({});
        setConfirmationMsg("State Updated!");
      } catch (err) {
        console.error(err);
      }
    }

    if (whatToUpdate === "Metrics") {
      try {
        await axios.put(
          `https://parsity-final-be.onrender.com/metrics/${projectId}/current-metrics`,
          metricInput,
          {
            withCredentials: true,
          }
        );
        setProject((prevProject) => ({
          ...prevProject,
          currentMetrics: [
            {
              ...prevProject.currentMetrics[0],
              ...metricInput,
            },
          ],
        }));
        setMetricInput({});
        setConfirmationMsg("Metrics Updated!");
      } catch (err) {
        console.error(err);
      }
    }

    // TODO - next potential fields
  };

  const cancelUpdates = () => {
    setWhatToUpdate(null);
    setShowUpdateForm(false);
  };

  const deselectOption = () => {
    setWhatToUpdate(null);
  };

  const options = ["Metrics", "State", "Comment", "Blocker"];

  return (
    <div
      className="container text-center"
      style={{ maxWidth: "1000px", maxHeight: "575px", overflow: "auto" }}
    >
      <div className="row">
        <>
          <h1>What needs updated?</h1>
          {options.map((option) => {
            return (
              <div className="col-3 d-flex justify-content-center" key={option}>
                <button
                  onClick={() => setWhatToUpdate(option)}
                  className="btn btn-secondary w-75"
                  type="button"
                >
                  {option}
                </button>
              </div>
            );
          })}
          <hr className="my-3" />
        </>
      </div>
      <form onSubmit={handleSubmit} className="container py-3">
        {whatToUpdate !== null && (
          <>
            {whatToUpdate === "Comment" && (
              <div className="mb-3 w-50 m-auto">
                <h3>Add a Comment</h3>
                <label>
                  <u>Comment:</u>
                </label>
                <input
                  onChange={handleChange}
                  placeholder="Project on time!"
                  className="form-control"
                  type="text"
                  name="comment"
                  value={commentInput.comment}
                />
                <br />
                <label>
                  <u>Todays Date:</u>
                </label>
                <input
                  onChange={handleChange}
                  value={commentInput.date}
                  name="date"
                  className="form-control"
                  type="date"
                />
                <br />
                <label>
                  <u>Name:</u>
                </label>
                <input
                  onChange={handleChange}
                  value={commentInput.name}
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Post Comment
                </button>
              </div>
            )}
            {whatToUpdate === "Blocker" && (
              <div className="mb-3 w-50 m-auto">
                <h3>Add a Blocker</h3>
                <label>
                  <u>Description:</u>
                </label>
                <input
                  onChange={handleChange}
                  placeholder="Waiting for material."
                  className="form-control"
                  type="text"
                  name="description"
                  value={blockerInput.description}
                />
                <br />
                <label>
                  <u>Severity:</u>
                </label>
                <select
                  onChange={handleChange}
                  className="form-select"
                  value={blockerInput.severity}
                  name="severity"
                >
                  <option value="">Choose One</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <br />
                <label>
                  <u>Status:</u>
                </label>
                <select
                  onChange={handleChange}
                  className="form-select"
                  value={blockerInput.status}
                  name="status"
                >
                  <option value="">Choose One</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <br />
                <label>
                  <u>Todays Date:</u>
                </label>
                <input
                  onChange={handleChange}
                  value={blockerInput.date}
                  name="date"
                  className="form-control"
                  type="date"
                />
                <br />
                <label>
                  <u>Name:</u>
                </label>
                <input
                  onChange={handleChange}
                  value={blockerInput.name}
                  name="name"
                  className="form-control"
                  placeholder="John Doe"
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Post Blocker
                </button>
              </div>
            )}
            {whatToUpdate === "State" && (
              <div className="mb-3 w-50 m-auto">
                <h3>Update Project</h3>
                <p>
                  <u>Current State</u>: {project.state}
                </p>
                <label>New State:</label>
                <select
                  onChange={handleChange}
                  className="form-select"
                  value={projectInput.state}
                  name="state"
                >
                  <option value="">Choose One</option>
                  <option value="Quoting">Quoting</option>
                  <option value="Processing">Processing</option>
                  <option value="Kicked Off">Kicked-Off</option>
                  <option value="In Production">In-Production</option>
                  <option value="Debug">Debugging</option>
                  <option value="Runoff">Runoff</option>
                  <option value="Shipping">Shipping</option>
                  <option value="Install">Installation</option>
                  <option value="Completed">Completed</option>
                </select>
                <br />
                <button type="submit" className="btn btn-success">
                  Update State
                </button>
              </div>
            )}
            {whatToUpdate === "Metrics" && (
              <div className="mb-3 w-50 m-auto">
                <h3>Update Current Project Metrics</h3>
                <p>
                  <u>Current Metrics</u>:
                </p>
                <p>
                  Estimated Completion:{" "}
                  {project.currentMetrics?.[0]?.expected_date ||
                    project.projectedMetrics[0].due_date}
                </p>
                <p>
                  Total Hours Spent:{" "}
                  {project.currentMetrics?.[0]?.budget_hours ||
                    `Not Set | Budgeted Hours = ${project.projectedMetrics[0].budget_hours}`}
                </p>
                <p>
                  Total Spending:{" "}
                  {project.currentMetrics?.[0]?.budget_money ||
                    `Not Set | Budget = $${project.projectedMetrics[0].budget_money}`}
                </p>
                <hr />
                <br />
                <label>Change Date:</label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="expected_date"
                  className="form-control"
                  value={metricInput.expected_date ?? ""}
                />
                <label>Update Hours:</label>
                <input
                  onChange={handleChange}
                  type="number"
                  placeholder="500"
                  name="budget_hours"
                  className="form-control"
                  value={metricInput.budget_hours ?? ""}
                />
                <label>Update Spending:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="budget_money"
                  placeholder="$1,000,000"
                  className="form-control"
                  value={metricInput.budget_money ?? ""}
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Update Metrics
                </button>
              </div>
            )}
            {confirmationMsg && (
              <div
                className="alert alert-success text-center fade show"
                role="alert"
              >
                {confirmationMsg}
              </div>
            )}
          </>
        )}
      </form>
      <div
        style={{
          position: "absolute",
          bottom: 5,
          left: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        {whatToUpdate === null ? (
          <button
            type="button"
            onClick={() => cancelUpdates()}
            className="btn btn-danger"
          >
            Cancel
          </button>
        ) : (
          <button
            type="button"
            onClick={() => deselectOption()}
            className="btn btn-danger"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
