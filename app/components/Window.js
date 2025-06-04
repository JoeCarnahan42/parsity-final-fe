import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { ProjectBreakdown } from "./ProjectBreakdown";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectForm } from "./ProjectForm";

export const Window = () => {
  const { project } = useProjectContext();
  const { showDetails, showNewProjForm, showBreakdown, closeWindow } =
    useWindowContext();

  const renderComponent = () => {
    if (showDetails) {
      return <ProjectDetails />;
    }

    if (showBreakdown) {
      return <ProjectBreakdown />;
    }

    if (showNewProjForm) {
      return <ProjectForm />;
    }
    // TODO - add other forms here
  };

  const windowTitle = () => {
    if (project) {
      return <span>{project.title}</span>;
    }

    if (showNewProjForm) {
      return <span>Create New Project</span>;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
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
        {windowTitle()}
        <button
          onClick={() => {
            closeWindow();
          }}
        >
          X
        </button>
      </div>
      {renderComponent()}
    </div>
  );
};
