"use client";
import { useState } from "react";

export const ToggleButton = () => {
  const [activeTab, setActiveTab] = useState("Jobs");

  const handleClick = (tab) => {
    setActiveTab(tab);
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
        Builds
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
