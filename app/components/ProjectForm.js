"use client";
import { useRef, useState } from "react";
import axios from "axios";
import { useProjectContext } from "../context/ProjectContext";

export const ProjectForm = () => {
  const { setProjectPool } = useProjectContext();

  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [projectData, setProjectData] = useState({
    title: "",
    customer: "",
    state: "",
    type: "",
    description: "",
    salePrice: "",
    projectManagers: [{ name: "", title: "" }],
    tasks: [
      {
        title: "",
        partNumber: "",
        material: "",
        hours: "",
        status: "",
      },
    ],
    projMetrics: [{ money: "", hours: "", due: "" }],
    purchaseList: [
      {
        title: "",
        partNumber: "",
        description: "",
        orderedOn: "",
        price: "",
        quantity: "",
      },
    ],
    materials: [
      {
        description: "",
        forPartNumber: "",
        orderedOn: "",
        price: "",
      },
    ],
  });

  // Used to set identifier to delete the correct field
  const iRef = useRef(0);

  const addField = (e) => {
    const field = e.target.id;

    if (field === "project-manager") {
      const identifier = iRef.current++;
      setProjectData((projectData) => ({
        ...projectData,
        projectManagers: [
          ...projectData.projectManagers,
          { name: "", title: "", canDelete: true, identifier },
        ],
      }));
    }

    if (field === "tasks") {
      const identifier = iRef.current++;
      setProjectData((projectData) => ({
        ...projectData,
        tasks: [
          ...projectData.tasks,
          {
            title: "",
            partNumber: "",
            material: "",
            hours: "",
            status: "",
            canDelete: true,
            identifier,
          },
        ],
      }));
    }

    if (field === "purchase-item") {
      const identifier = iRef.current++;
      setProjectData((projectData) => ({
        ...projectData,
        purchaseList: [
          ...projectData.purchaseList,
          {
            title: "",
            partNumber: "",
            description: "",
            orderedOn: "",
            price: "",
            quantity: "",
            canDelete: true,
            identifier,
          },
        ],
      }));
    }

    if (field === "material") {
      const identifier = iRef.current++;
      setProjectData((projectData) => ({
        ...projectData,
        materials: [
          ...projectData.materials,
          {
            description: "",
            forPartNumber: "",
            orderedOn: "",
            price: "",
            canDelete: true,
            identifier,
          },
        ],
      }));
    }
  };

  const deleteField = (e) => {
    const id = Number(e.target.id);
    const field = e.target.name;

    if (field === "project-manager") {
      const arr = "projectManagers";
      setProjectData((projectData) => {
        const updatedArray = projectData[arr].filter(
          (item) => item.identifier !== id
        );

        return {
          ...projectData,
          [arr]: updatedArray,
        };
      });
    }

    if (field === "task") {
      const arr = "tasks";
      setProjectData((projectData) => {
        const updatedArray = projectData[arr].filter(
          (item) => item.identifier !== id
        );

        return {
          ...projectData,
          [arr]: updatedArray,
        };
      });
    }

    if (field === "item") {
      const arr = "purchaseList";
      setProjectData((projectData) => {
        const updatedArray = projectData[arr].filter(
          (item) => item.identifier !== id
        );

        return {
          ...projectData,
          [arr]: updatedArray,
        };
      });
    }

    if (field === "material") {
      const arr = "materials";
      setProjectData((projectData) => {
        const updatedArray = projectData[arr].filter(
          (material) => material.identifier !== id
        );

        return {
          ...projectData,
          [arr]: updatedArray,
        };
      });
    }
  };

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (index, e, field) => {
    const updatedArray = [...projectData[field]];
    updatedArray[index][e.target.name] = e.target.value;
    setProjectData({ ...projectData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://parsity-final-be.onrender.com/projects/",
        projectData,
        {
          withCredentials: true,
        }
      );

      const newProject = response.data;

      setProjectPool((projectPool) => [...projectPool, newProject]);

      setConfirmationMsg("Project added successfully!");

      setTimeout(() => {
        setConfirmationMsg("");
      }, 3000);

      setProjectData({
        title: "",
        customer: "",
        state: "",
        type: "",
        description: "",
        salePrice: "",
        projectManagers: [{ name: "", title: "" }],
        tasks: [
          { title: "", partNumber: "", material: "", hours: "", status: "" },
        ],
        projMetrics: [{ money: "", hours: "", due: "" }],
        purchaseList: [
          {
            title: "",
            partNumber: "",
            description: "",
            orderedOn: "",
            price: "",
            quantity: "",
          },
        ],
        materials: [
          {
            description: "",
            forPartNumber: "",
            orderedOn: "",
            price: "",
          },
        ],
      });
    } catch (err) {
      console.error("Error submitting project", err);
    }
  };

  console.log(projectData);

  return (
    <>
      <div
        className="text-center"
        style={{ maxWidth: "1000px", maxHeight: "575px", overflow: "auto" }}
      >
        <form onSubmit={handleSubmit} className="container py-3">
          <h2
            style={{ backgroundColor: "cornflowerblue" }}
            className="mb-3 w-50 m-auto"
          >
            Project Details
          </h2>
          <div className="mb-3 w-50 m-auto">
            <label>
              <u>Title</u>
            </label>
            <input
              required
              name="title"
              type="text"
              value={projectData.title}
              onChange={handleChange}
              placeholder="Form Roller"
              className="form-control"
            />
          </div>
          <div className="mb-3 w-50 m-auto">
            <label>
              <u>Customer</u>
            </label>
            <input
              required
              name="customer"
              type="text"
              value={projectData.customer}
              onChange={handleChange}
              placeholder="Company Name"
              className="form-control"
            />
          </div>
          <div className="mb-3 w-50 m-auto">
            <label>
              <u>Project State</u>
            </label>
            <select
              required
              name="state"
              value={projectData.state}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Choose One</option>
              <option value="Quoting">Quoting</option>
              <option value="Processing">Processing</option>
              <option value="Kicked Off">Kicked-Off</option>
              <option value="In Production">In-Production</option>
              <option value="Debugging">Debugging</option>
              <option value="Runoff">Runoff</option>
              <option value="Shipping">Shipping</option>
              <option value="Install">Installing</option>
            </select>
          </div>
          <div className="mb-3 w-50 m-auto">
            <label>
              <u>Job Type</u>
            </label>
            <select
              required
              name="type"
              value={projectData.type}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Choose One</option>
              <option value="Build">Build</option>
              <option value="Batch">Batch</option>
            </select>
          </div>
          <div className="mb-3 w-50 m-auto">
            <label>
              <u>Sale Price</u>
            </label>
            <input
              required
              name="salePrice"
              type="number"
              value={projectData.salePrice}
              onChange={handleChange}
              placeholder="200"
              className="form-control"
            />
          </div>
          <div className="mb-3 w-50 m-auto">
            <label>
              <u>Project Description</u>
            </label>
            <textarea
              required
              name="description"
              value={projectData.description}
              onChange={handleChange}
              placeholder="'Small machine that makes this thing...'"
              className="form-control"
            />
          </div>

          <h3
            style={{ backgroundColor: "cornflowerblue" }}
            className="mt-4 mb-2 w-50 m-auto"
          >
            Project Managers
          </h3>
          {projectData.projectManagers.map((pm, idx) => (
            <div key={idx} className="mb-3 w-50 m-auto">
              <label>
                <u>Full Name</u>
              </label>
              <input
                required
                name="name"
                type="text"
                value={pm.name}
                onChange={(e) => handleArrayChange(idx, e, "projectManagers")}
                placeholder="John Doe"
                className="form-control mb-2"
              />
              <label>
                <u>Title</u>
              </label>
              <input
                required
                name="title"
                type="text"
                value={pm.title}
                onChange={(e) => handleArrayChange(idx, e, "projectManagers")}
                placeholder="Mechanical Lead"
                className="form-control"
              />
              {pm.canDelete === true && (
                <button
                  type="button"
                  name="project-manager"
                  id={pm.identifier}
                  onClick={(e) => deleteField(e)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
              <hr style={{ border: "1px solid black" }} />
            </div>
          ))}
          <button
            id="project-manager"
            onClick={(e) => addField(e)}
            className="btn btn-secondary"
            type="button"
          >
            Add Another Project Manager
          </button>

          <h3
            style={{ backgroundColor: "cornflowerblue" }}
            className="mt-4 mb-2 w-50 m-auto"
          >
            Tasks
          </h3>
          {projectData.tasks.map((task, idx) => (
            <div key={idx} className="mb-3 w-50 m-auto">
              <label>
                <u>Task Title</u>
              </label>
              <input
                required
                name="title"
                type="text"
                value={task.title}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Machine Rollers"
                className="form-control mb-2"
              />
              <label>
                <u>Part Number</u>
              </label>
              <input
                required
                name="partNumber"
                type="text"
                value={task.partNumber}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Part Number"
                className="form-control mb-2"
              />
              <label>
                <u>Material</u>
              </label>
              <input
                required
                name="material"
                type="text"
                value={task.material}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Stainless Steel"
                className="form-control mb-2"
              />
              <label>
                <u>Expected Hours</u>
              </label>
              <input
                required
                name="hours"
                type="number"
                value={task.hours}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Hours"
                className="form-control mb-2"
              />
              <label>
                <u>Current Status</u>
              </label>
              <select
                required
                name="status"
                value={task.status}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                className="form-select"
              >
                <option value="">Choose One</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              {task.canDelete === true && (
                <button
                  type="button"
                  name="task"
                  id={task.identifier}
                  onClick={(e) => deleteField(e)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
              <hr style={{ border: "1px solid black" }} />
            </div>
          ))}
          <button
            id="tasks"
            onClick={(e) => addField(e)}
            className="btn btn-secondary"
            type="button"
          >
            Add Another Task
          </button>

          <h3
            style={{ backgroundColor: "cornflowerblue" }}
            className="mt-4 mb-2 w-50 m-auto"
          >
            Projected Metrics
          </h3>
          {projectData.projMetrics.map((metric, idx) => (
            <div key={idx} className="mb-3 w-50 m-auto">
              <label>
                <u>Monetary Budget</u>
              </label>
              <input
                required
                name="money"
                type="number"
                value={metric.money}
                onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
                placeholder="10000"
                className="form-control mb-2"
              />
              <label>
                <u>Hours Budget</u>
              </label>
              <input
                required
                name="hours"
                type="number"
                value={metric.hours}
                onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
                placeholder="300"
                className="form-control mb-2"
              />
              <label>
                <u>Estimated Completion Date</u>
              </label>
              {/* TODO - dont allow date to be BEFORE current date */}
              <input
                required
                type="date"
                name="due"
                value={metric.due}
                onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
                className="form-control"
              />
            </div>
          ))}

          <h3
            className="mt-4 mb-2 w-50 m-auto"
            style={{ backgroundColor: "cornflowerblue" }}
          >
            Purchase List
          </h3>
          {projectData.purchaseList.map((item, idx) => (
            <div key={idx} className="mb-3 w-50 m-auto">
              <label>
                <u>Item Name</u>
              </label>
              <input
                required
                name="title"
                type="text"
                value={item.title}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="2 inch X 5 inch pneumatic cylinder"
                className="form-control mb-2"
              />
              <label>
                <u>Part Number</u>
              </label>
              <input
                required
                name="partNumber"
                type="text"
                value={item.partNumber}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Part Number"
                className="form-control mb-2"
              />
              <label>
                <u>Item Description</u>
              </label>
              <input
                required
                name="description"
                type="text"
                value={item.description}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Cylinder for lift gate"
                className="form-control mb-2"
              />
              <label>
                <u>Date Ordered</u>
              </label>
              {/* TODO - dont allow date to be AFTER current date */}
              <input
                required
                type="date"
                name="orderedOn"
                value={item.orderedOn}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                className="form-control mb-2"
              />
              <label>
                <u>Item Price</u>
              </label>
              <input
                required
                name="price"
                type="number"
                value={item.price}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="300"
                className="form-control mb-2"
              />
              <label>
                <u>Item Quantity</u>
              </label>
              <input
                required
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="5"
                className="form-control"
              />
              {item.canDelete === true && (
                <button
                  type="button"
                  name="item"
                  id={item.identifier}
                  onClick={(e) => deleteField(e)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
              <hr style={{ border: "1px solid black" }} />
            </div>
          ))}
          <button
            id="purchase-item"
            onClick={(e) => addField(e)}
            className="btn btn-secondary"
            type="button"
          >
            Add Another Item
          </button>
          <h3
            className="mt-4 mb-2 w-50 m-auto"
            style={{ backgroundColor: "cornflowerblue" }}
          >
            Material Purchase List
          </h3>
          {projectData.materials.map((material, idx) => (
            <div key={idx} className="mb-3 w-50 m-auto">
              <label>
                <u>Description</u>
              </label>
              <input
                required
                name="description"
                type="text"
                value={material.description}
                onChange={(e) => handleArrayChange(idx, e, "materials")}
                placeholder="Cold Rolled Steel"
                className="form-control mb-2"
              />
              <label>
                <u>For Part Number</u>
              </label>
              <input
                required
                name="forPartNumber"
                type="text"
                value={material.forPartNumber}
                onChange={(e) => handleArrayChange(idx, e, "materials")}
                placeholder="Part Number"
                className="form-control mb-2"
              />
              <label>
                <u>Price</u>
              </label>
              <input
                required
                name="price"
                type="number"
                value={material.price}
                onChange={(e) => handleArrayChange(idx, e, "materials")}
                placeholder="50"
                className="form-control mb-2"
              />
              <label>
                <u>Date Ordered</u>
              </label>
              {/* TODO - dont allow date to be AFTER current date */}
              <input
                required
                type="date"
                name="orderedOn"
                value={material.orderedOn}
                onChange={(e) => handleArrayChange(idx, e, "materials")}
                className="form-control mb-2"
              />
              {material.canDelete === true && (
                <button
                  type="button"
                  name="material"
                  id={material.identifier}
                  onClick={(e) => deleteField(e)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              )}
              <hr style={{ border: "1px solid black" }} />
            </div>
          ))}
          <button
            id="material"
            onClick={(e) => addField(e)}
            className="btn btn-secondary"
            type="button"
          >
            Add Another Item
          </button>
        </form>
      </div>
      <div>
        <button
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="btn btn-primary mt-3"
        >
          Submit Project
        </button>
      </div>
      {confirmationMsg && (
        <div className="alert alert-success text-center fade show" role="alert">
          {confirmationMsg}
        </div>
      )}
    </>
  );
};
