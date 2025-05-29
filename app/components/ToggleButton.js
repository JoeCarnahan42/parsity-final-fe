"use client";
import { useToggleView } from "../context/ViewContext";

export const ToggleButton = () => {
  const { activeView, setActiveView } = useToggleView();

  const handleClick = (tab) => {
    setActiveView(tab);
  };

  return (
    <div
      className="btn-group toggle-group"
      role="group"
      aria-label="Toggle button group"
    >
      <button
        type="button"
        className={`btn ${activeView === "Jobs" ? "active" : ""}`}
        onClick={() => handleClick("Builds")}
      >
        Builds
      </button>
      <button
        type="button"
        className={`btn ${activeView === "Prod. Runs" ? "active" : ""}`}
        onClick={() => handleClick("Prod. Runs")}
      >
        Prod. Runs
      </button>
    </div>
  );
};
