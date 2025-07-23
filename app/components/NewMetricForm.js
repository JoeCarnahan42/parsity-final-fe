"use client";
import { useState } from "react";
import { useProjectContext } from "../context/ProjectContext";

export const NewMetricForm = () => {
  const { project, setProject } = useProjectContext();
  const [newMetric, setNewMetric] = useState({});

  const handleSubmit = (e) => {
    // submission logic
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
            onChange={handleChange}
            type="date"
            className="form-control"
            name="expected_date"
            value={newMetric.expected_date ?? ""}
          />
          <label>Current Used Hours:</label>
          <input
            onChange={handleChange}
            type="number"
            className="form-control"
            name="budget_hours"
            value={newMetric.budget_hours ?? ""}
          />
          <label>Money Spent:</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            name="budget_money"
            placeholder="$500"
            value={newMetric.budget_money ?? ""}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update Metrics
        </button>
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
