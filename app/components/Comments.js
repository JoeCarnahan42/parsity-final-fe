"use client";
import { useState } from "react";
import axios from "axios";

import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";

export const Comments = () => {
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const {
    project,
    setProject,
    setAllComments,
    allComments,
    numOfComments,
    setNumOfComments,
  } = useProjectContext();

  const { setShowComments } = useWindowContext();

  const projectId = project.id;

  const deleteComment = async (id) => {
    try {
      await axios.delete(
        `https://parsity-final-be.onrender.com/comments/${projectId}/comments/${id}`,
        {
          withCredentials: true,
        }
      );
      setAllComments([...allComments.filter((comment) => comment.id !== id)]);
      setNumOfComments(numOfComments - 1);
      setProject({
        ...project,
        comments: project.comments.filter((comment) => comment.id !== id),
      });
      setConfirmationMsg("Comment Deleted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Comments</h1>
      <hr />
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          whiteSpace: "pre-wrap",
          height: "425px",
        }}
        className="container"
      >
        {project.comments.map((comment) => (
          <div key={comment.id} className="container">
            <p>
              {comment.date} - {comment.comment} - {comment.name}
            </p>
            <div className="row justify-content-center">
              <button
                onClick={() => updateComment(comment.id)}
                className="col-1 btn btn-secondary"
              >
                Update
              </button>
              <br />
              <button
                onClick={() => deleteComment(comment.id)}
                className="col-1 btn btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <br />
      {confirmationMsg && (
        <div className="alert alert-success text-center fade show" role="alert">
          {confirmationMsg}
        </div>
      )}
      <button onClick={() => setShowComments(false)} className="btn btn-danger">
        Close
      </button>
    </>
  );
};
