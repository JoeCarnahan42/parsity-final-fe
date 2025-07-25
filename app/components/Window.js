import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";
import { useAuth } from "../context/AuthContext";

// Components
import { ProjectBreakdown } from "./ProjectBreakdown";
import { ProjectDetails } from "./ProjectDetails";
import { ProjectForm } from "./ProjectForm";
import { UpdateForm } from "./UpdateForm";
import { Blockers } from "./Blockers";
import { Comments } from "./Comments";
import { Archives } from "./Archives";

export const Window = () => {
  const { project } = useProjectContext();
  const { loading } = useAuth();
  const {
    showDetails,
    showNewProjForm,
    showBreakdown,
    closeWindow,
    showUpdateForm,
    showBlockers,
    showComments,
    showArchives,
  } = useWindowContext();

  // TODO - find a way to refactor this to avoid unexpected overlapping
  const renderComponent = () => {
    if (loading) {
      return <h1>Loading, please wait...</h1>;
    }
    if (showArchives) {
      return <Archives />;
    }
    if (showUpdateForm) {
      return <UpdateForm />;
    }

    if (showBlockers) {
      return <Blockers />;
    }

    if (showComments) {
      return <Comments />;
    }

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
    if (loading) {
      return <span>Loading</span>;
    }
    if (showArchives) {
      return <span>Archived Projects</span>;
    }
    if (showUpdateForm) {
      return (
        <span>
          Updating <strong>{project.title}</strong>
        </span>
      );
    }

    if (project) {
      return (
        <span>
          <strong>{project.title}</strong>
        </span>
      );
    }

    if (showNewProjForm) {
      return <span>Create New Project</span>;
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "45%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "1000px",
        height: "770px",
        backgroundColor: "white",
        boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        borderRadius: "8px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#cddaffff",
          borderBottom: "1px solid #ccc",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {windowTitle()}
        <button
          className="btn btn-danger"
          onClick={() => {
            closeWindow();
          }}
        >
          X
        </button>
      </div>
      <div style={{ overflowY: "auto", flexGrow: 1, padding: "10px" }}>
        {renderComponent()}
      </div>
    </div>
  );
};
