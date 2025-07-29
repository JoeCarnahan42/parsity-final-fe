import axios from "axios";
import { useState } from "react";

export const ProjDeleteBtn = ({ projectId, onDelete }) => {
  const [confirming, setConfirming] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://parsity-final-be.onrender.com/projects/${projectId}`,
        {
          withCredentials: true,
        }
      );

      onDelete?.(); // Cleanup Callback
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div>
      {!confirming ? (
        <button className="btn btn-danger" onClick={() => setConfirming(true)}>
          Delete Project
        </button>
      ) : (
        <div className="d-flex flex-column align-items-start">
          <p>
            Are you sure you want to delete this project? It will be permamantly
            deleted.
          </p>
          <div className="container">
            <div className="d-flex gap-2 justify-content-center">
              <button className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
