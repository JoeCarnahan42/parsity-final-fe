"use client";
import { useProjectContext } from "../context/ProjectContext";
import { useWindowContext } from "../context/WindowContext";

export const ProjectDetails = () => {
  const { project } = useProjectContext();
  const { setShowDetails } = useWindowContext();

  return (
    <div className="d-flex w-100 p-3">
      <div style={{ width: "300px" }} className="me-3 d-flex flex-column gap-3">
        <div className="border rounded p-2">
          <h3 className="mt-0">
            <u>In House Production</u>
          </h3>

          <ul
            style={{
              height: "200px",
              overflowY: "auto",
              overflowX: "hidden",
              whiteSpace: "pre-wrap",
              fontSize: "large",
            }}
            className="p-3"
          >
            {/* TODO - create functionality for updating task state */}
            {project.tasks.map((task) => {
              return (
                <li
                  className="list-group border border-black"
                  key={task.id}
                  style={{ backgroundColor: "lightgrey" }}
                >
                  <u>{task.title}</u>
                  <p>
                    <u>Part Number:</u> {task.partnumber}
                  </p>
                  <p>
                    <u>Material:</u> {task.material}
                  </p>
                  <p>
                    <u>Est. Hours:</u> {task.hours}
                  </p>
                  <p>
                    <u>Status:</u> {task.status}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
        <br />
        <div className="border rounded p-2">
          <h3 className="mt-0">
            <u>Material Purchase List</u>
          </h3>
          {/* TODO - remove bullet points from ALL lists */}
          <ul
            style={{
              height: "250px",
              overflowY: "auto",
              overflowX: "hidden",
              whiteSpace: "pre-wrap",
              fontSize: "large",
            }}
            className="p-3"
          >
            {project.material.map((mat) => {
              return (
                <li
                  className="list-group border border-black"
                  key={mat.id}
                  style={{ backgroundColor: "lightgrey" }}
                >
                  <u>{mat.description}</u>
                  <p>
                    <u>For Part Number:</u> {mat.for_partnumber}
                  </p>
                  <p>
                    <u>Ordered On:</u> {mat.ordered_on}
                  </p>
                  <p>
                    <u>Price:</u> {mat.price}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border rounded flex-grow-1 p-3">
        <h4 className="text-center">
          <u>Purchase Items / Outsource</u>
        </h4>
        <div>
          <ul
            style={{
              height: "500px",
              overflowY: "auto",
              overflowX: "hidden",
              whiteSpace: "pre-wrap",
              fontSize: "large",
            }}
            className="p-3"
          >
            {project.purchaseList.map((item) => {
              return (
                <li
                  className="list-group border border-black"
                  style={{ backgroundColor: "lightgrey" }}
                  key={item.id}
                >
                  <p>
                    <u>Item:</u> {item.title}
                  </p>
                  <p>
                    <u>Description:</u> {item.description}
                  </p>
                  <p>
                    <u>Part Number:</u> {item.partnumber}
                  </p>
                  <p>
                    <u>Ordered On:</u> {item.ordered_on}
                  </p>
                  <p>
                    <u>Price:</u> {item.price}
                  </p>
                  <p>
                    <u>Quantity:</u> {item.quantity}
                  </p>
                </li>
              );
            })}
          </ul>
          {/* TODO - add section for total spent to date and outstanding items */}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowDetails(false)}
        >
          Back to overview
        </button>
      </div>
    </div>
  );
};
