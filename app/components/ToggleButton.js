"use client";
import { useState } from "react";

export const ToggleButton = () => {
  const [activeTab, setActiveTab] = useState("Jobs"); // Tracks active tab

  const handleClick = (tab) => {
    setActiveTab(tab); // Change the active tab
  };

  return (
    <div
      className="btn-group toggle-group"
      role="group"
      aria-label="Toggle button group"
    >
      <button
        type="button"
        className={`btn ${activeTab === "Jobs" ? "active" : ""}`}
        onClick={() => handleClick("Jobs")}
      >
        Jobs
      </button>
      <button
        type="button"
        className={`btn ${activeTab === "Prod. Runs" ? "active" : ""}`}
        onClick={() => handleClick("Prod. Runs")}
      >
        Prod. Runs
      </button>
    </div>
  );
};
