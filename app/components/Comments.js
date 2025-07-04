import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";

export const Comments = () => {
  const { project } = useProjectContext();
  const { setShowComments } = useWindowContext();

  return (
    <>
      <h1>Comments</h1>
      <hr />
      <div className="container">
        {project.comments.map((comment) => (
          <p key={comment.id}>
            {comment.date} - {comment.comment} -{" "}
            {comment.name || "NO NAME PROVIDED"}
          </p>
        ))}
        {/* TODO - remove "NO NAME PROVIDED once name fields have been populated." */}
      </div>
      <button onClick={() => setShowComments(false)} className="btn btn-danger">
        Close
      </button>
    </>
  );
};
