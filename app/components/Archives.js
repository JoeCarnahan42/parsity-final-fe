import { useProjectContext } from "../context/ProjectContext";
import { ProjectBtn } from "./ProjectBtn";

export const Archives = () => {
  const { projectPool } = useProjectContext();

  const projects = projectPool.filter((proj) => proj.state === "Completed");
  // TODO - implement job type toggle for archives
  if (projects.length < 1) {
    return <h1>No Archived Projects (yet...)</h1>;
  }
  return (
    <>
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          whiteSpace: "pre-wrap",
          fontSize: "large",
        }}
        className="container w-50"
      >
        {projects.map((proj) => (
          <div key={proj.id}>
            <ProjectBtn project={proj} />
            <br />
          </div>
        ))}
      </div>
    </>
  );
};
