"use client";
import { useToggleView } from "../context/ViewContext";

export const ToggleButton = () => {
  const { activeView, setActiveView } = useToggleView();

  const handleClick = (type) => {
    setActiveView(type);
  };

  return (
    <div
      className="btn-group toggle-group"
      role="group"
      aria-label="Toggle button group"
    >
      <button
        type="button"
        className={`btn ${activeView === "Builds" ? "active" : ""}`}
        onClick={() => handleClick("Builds")}
      >
        Builds
      </button>
      <button
        type="button"
        className={`btn ${activeView === "Batches" ? "active" : ""}`}
        onClick={() => handleClick("Batches")}
      >
        Batches
      </button>
    </div>
  );
};
