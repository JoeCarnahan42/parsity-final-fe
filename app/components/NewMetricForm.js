"use client";
import { useState } from "react";
import { useProjectContext } from "../context/ProjectContext";
import axios from "axios";

export const NewMetricForm = () => {
  const { project, setProject } = useProjectContext();
  const [newMetric, setNewMetric] = useState({});
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectId = project.id;

    try {
      const res = await axios.post(
        `https://parsity-final-be.onrender.com/metrics/${projectId}/current-metrics`,
        newMetric,
        {
          withCredentials: true,
        }
      );
      setProject((prevProject) => ({
        ...prevProject,
        currentMetrics: [
          {
            ...prevProject.currentMetrics[0],
            ...newMetric,
          },
        ],
      }));
      setNewMetric({});
      setConfirmationMsg("Metrics Posted!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewMetric({
      ...newMetric,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="container text-center"
      style={{ maxWidth: "1000px", maxHeight: "575px", overflow: "auto" }}
    >
      <div className="row">
        <h3>
          <u>Projected Metrics</u>
        </h3>
        <p>Promised Date: {project.projectedMetrics[0].due_date}</p>
        <p>Hours Budget: {project.projectedMetrics[0].budget_hours}</p>
        <p>Money Budget: {project.projectedMetrics[0].budget_money}</p>
      </div>
      <hr />
      <form className="container py-3" onSubmit={handleSubmit}>
        <div className="mb-3 w-50 m-auto">
          <h3>
            <u>Add Updated Metrics</u>
          </h3>
          <label>Estimated Completion:</label>
          <input
            required={true}
            onChange={handleChange}
            type="date"
            className="form-control"
            name="expected_date"
            value={newMetric.expected_date ?? ""}
          />
          <label>Current Used Hours:</label>
          <input
            required={true}
            onChange={handleChange}
            type="number"
            className="form-control"
            name="budget_hours"
            value={newMetric.budget_hours ?? ""}
          />
          <label>Money Spent:</label>
          <input
            required={true}
            onChange={handleChange}
            type="number"
            className="form-control"
            name="budget_money"
            placeholder="500"
            value={newMetric.budget_money ?? ""}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update Metrics
        </button>
        {confirmationMsg && (
          <div
            className="alert alert-success text-center fade show"
            role="alert"
          >
            {confirmationMsg}
          </div>
        )}
      </form>
      <button
        type="button"
        onClick={() => cancelUpdate()}
        className="btn btn-danger"
      >
        Cancel
      </button>
    </div>
  );
};
