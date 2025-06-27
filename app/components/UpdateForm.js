"use client";
import { useState } from "react";
import axios from "axios";
import { useWindowContext } from "../context/WindowContext";
import { useProjectContext } from "../context/ProjectContext";

export const UpdateForm = () => {
  const { setShowUpdateForm, whatToUpdate, setWhatToUpdate } =
    useWindowContext();
  const { project, setAllComments, setAllBlockers } = useProjectContext();
  const [commentInput, setCommentInput] = useState({
    comment: "",
    date: "",
  });
  const [blockerInput, setBlockerInput] = useState({
    blocker: "",
    date: "",
  });

  const handleChange = (e) => {
    if (whatToUpdate === "Comment") {
      setCommentInput({
        ...commentInput,
        [e.target.name]: e.target.value,
      });
    }

    if (whatToUpdate === "Blocker") {
      setBlockerInput({
        ...blockerInput,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectId = project.id;
    // TODO - add conformation message
    // TODO - axios POST request
    if (whatToUpdate === "Comment") {
      if (!commentInput.comment || !commentInput.date) {
        console.error("Missing required fields");
        return;
      }

      try {
        const res = await axios.post(
          `https://parsity-final-be.onrender.com/comments/${projectId}/comments`,
          commentInput,
          {
            withCredentials: true,
          }
        );
        setAllComments(res.data);
        setCommentInput({
          comment: "",
          date: "",
        });
        setWhatToUpdate(null);
      } catch (err) {
        console.error(err);
      }
    }

    if (whatToUpdate === "Blocker") {
      if (!blockerInput.blocker || !blockerInput.date) {
        console.error("Missing required fields");
        return;
      }

      try {
        const res = await axios.post(
          `https://parsity-final-be.onrender.com/comments/${projectId}/blockers`,
          commentInput,
          {
            withCredentials: true,
          }
        );
        setAllBlockers(res.data);
        setCommentInput({
          blocker: "",
          date: "",
        });
        setWhatToUpdate(null);
      } catch (err) {
        console.error(err);
      }
    }

    // TODO - next potential fields
  };

  const cancelUpdates = () => {
    setWhatToUpdate(null);
    setShowUpdateForm(false);
  };

  const options = ["Metrics", "State", "Comment", "Blocker"];

  return (
    <div
      className="container text-center"
      style={{ maxWidth: "1000px", maxHeight: "575px", overflow: "auto" }}
    >
      <div className="row">
        {whatToUpdate === null && (
          <>
            <h1>What needs updated?</h1>
            {options.map((option) => {
              return (
                <div
                  className="col-3 d-flex justify-content-center"
                  key={option}
                >
                  <button
                    onClick={() => setWhatToUpdate(option)}
                    className="btn btn-secondary w-75"
                    type="button"
                  >
                    {option}
                  </button>
                </div>
              );
            })}
            <hr className="my-3" />
          </>
        )}
      </div>
      <br />
      <form onSubmit={handleSubmit} className="container py-3">
        {whatToUpdate !== null && (
          <>
            {whatToUpdate === "Comment" && (
              <div className="mb-3 w-50 m-auto">
                <h3>Add a Comment</h3>
                <label>
                  <u>Comment:</u>
                </label>
                <input
                  onChange={handleChange}
                  placeholder="Project on time!"
                  className="form-control"
                  type="text"
                  name="comment"
                  value={commentInput.comment}
                />
                <br />
                <label>
                  <u>Todays Date:</u>
                </label>
                <input
                  onChange={handleChange}
                  value={commentInput.date}
                  name="date"
                  className="form-control"
                  type="date"
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Post Comment
                </button>
              </div>
            )}
            {whatToUpdate === "Blocker" && (
              <div className="mb-3 w-50 m-auto">
                <h3>Add a Blocker</h3>
                <label>
                  <u>Blocker:</u>
                </label>
                <input
                  onChange={handleChange}
                  placeholder="Waiting for material."
                  className="form-control"
                  type="text"
                  name="blocker"
                  value={blockerInput.blocker}
                />
                <br />
                <label>
                  <u>Todays Date:</u>
                </label>
                <input
                  onChange={handleChange}
                  value={blockerInput.date}
                  name="date"
                  className="form-control"
                  type="date"
                />
                <br />
                <button type="submit" className="btn btn-success">
                  Post Blocker
                </button>
              </div>
            )}
          </>
        )}
      </form>
      <div
        style={{
          position: "absolute",
          bottom: 5,
          left: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <button
          type="button"
          onClick={() => cancelUpdates()}
          className="btn btn-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
