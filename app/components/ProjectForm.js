// TODO - add buttons to add more purchase-items/tasks
// TODO - make inputs that have specific values dropdowns
"use client";
import { useState } from "react";

export const ProjectForm = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    customer: "",
    state: "",
    type: "",
    description: "",
    projectManagers: [{ name: "", title: "" }],
    tasks: [{ title: "", partNumber: "", material: "", hours: "", status: "" }],
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
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting project data:", projectData);
    // TODO - make request to server
    setProjectData({
      title: "",
      customer: "",
      state: "",
      type: "",
      description: "",
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
    });
  };

  return (
    <>
      <div style={{ maxWidth: "1000px", maxHeight: "575px", overflow: "auto" }}>
        <form onSubmit={handleSubmit} className="container py-3">
          <h2 className="mb-3">Project Details</h2>
          <div className="mb-3">
            <input
              name="title"
              value={projectData.title}
              onChange={handleChange}
              placeholder="Title"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              name="customer"
              value={projectData.customer}
              onChange={handleChange}
              placeholder="Customer"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              name="state"
              value={projectData.state}
              onChange={handleChange}
              placeholder="State"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              name="type"
              value={projectData.type}
              onChange={handleChange}
              placeholder="Type"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <textarea
              name="description"
              value={projectData.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-control"
            />
          </div>

          <h3 className="mt-4 mb-2">Project Managers</h3>
          {projectData.projectManagers.map((pm, idx) => (
            <div key={idx} className="mb-3">
              <input
                name="name"
                value={pm.name}
                onChange={(e) => handleArrayChange(idx, e, "projectManagers")}
                placeholder="Name"
                className="form-control mb-2"
              />
              <input
                name="title"
                value={pm.title}
                onChange={(e) => handleArrayChange(idx, e, "projectManagers")}
                placeholder="Title"
                className="form-control"
              />
            </div>
          ))}

          <h3 className="mt-4 mb-2">Tasks</h3>
          {projectData.tasks.map((task, idx) => (
            <div key={idx} className="mb-3">
              <input
                name="title"
                value={task.title}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Task Title"
                className="form-control mb-2"
              />
              <input
                name="partNumber"
                value={task.partNumber}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Part Number"
                className="form-control mb-2"
              />
              <input
                name="material"
                value={task.material}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Material"
                className="form-control mb-2"
              />
              <input
                name="hours"
                value={task.hours}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Hours"
                className="form-control mb-2"
              />
              <input
                name="status"
                value={task.status}
                onChange={(e) => handleArrayChange(idx, e, "tasks")}
                placeholder="Status"
                className="form-control"
              />
            </div>
          ))}

          <h3 className="mt-4 mb-2">Projected Metrics</h3>
          {projectData.projMetrics.map((metric, idx) => (
            <div key={idx} className="mb-3">
              <input
                name="money"
                value={metric.money}
                onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
                placeholder="Budget ($)"
                className="form-control mb-2"
              />
              <input
                name="hours"
                value={metric.hours}
                onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
                placeholder="Budget Hours"
                className="form-control mb-2"
              />
              <input
                type="date"
                name="due"
                value={metric.due}
                onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
                className="form-control"
              />
            </div>
          ))}

          <h3 className="mt-4 mb-2">Purchase List</h3>
          {projectData.purchaseList.map((item, idx) => (
            <div key={idx} className="mb-3">
              <input
                name="title"
                value={item.title}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Item Title"
                className="form-control mb-2"
              />
              <input
                name="partNumber"
                value={item.partNumber}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Part Number"
                className="form-control mb-2"
              />
              <input
                name="description"
                value={item.description}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Description"
                className="form-control mb-2"
              />
              <input
                type="date"
                name="orderedOn"
                value={item.orderedOn}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                className="form-control mb-2"
              />
              <input
                name="price"
                value={item.price}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Price ($)"
                className="form-control mb-2"
              />
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
                placeholder="Quantity"
                className="form-control"
              />
            </div>
          ))}
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
    </>
  );
};
