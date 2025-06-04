// TODO - complete component
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
    // Here, you would usually send the projectData to your backend!
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2>Project Details</h2>
      <input
        name="title"
        value={projectData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <input
        name="customer"
        value={projectData.customer}
        onChange={handleChange}
        placeholder="Customer"
      />
      <input
        name="state"
        value={projectData.state}
        onChange={handleChange}
        placeholder="State"
      />
      <input
        name="type"
        value={projectData.type}
        onChange={handleChange}
        placeholder="Type"
      />
      <textarea
        name="description"
        value={projectData.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <h3>Project Managers</h3>
      {projectData.projectManagers.map((pm, idx) => (
        <div key={idx} className="space-y-1">
          <input
            name="name"
            value={pm.name}
            onChange={(e) => handleArrayChange(idx, e, "projectManagers")}
            placeholder="Name"
          />
          <input
            name="title"
            value={pm.title}
            onChange={(e) => handleArrayChange(idx, e, "projectManagers")}
            placeholder="Title"
          />
        </div>
      ))}

      <h3>Tasks</h3>
      {projectData.tasks.map((task, idx) => (
        <div key={idx} className="space-y-1">
          <input
            name="title"
            value={task.title}
            onChange={(e) => handleArrayChange(idx, e, "tasks")}
            placeholder="Task Title"
          />
          <input
            name="partNumber"
            value={task.partNumber}
            onChange={(e) => handleArrayChange(idx, e, "tasks")}
            placeholder="Part Number"
          />
          <input
            name="material"
            value={task.material}
            onChange={(e) => handleArrayChange(idx, e, "tasks")}
            placeholder="Material"
          />
          <input
            name="hours"
            value={task.hours}
            onChange={(e) => handleArrayChange(idx, e, "tasks")}
            placeholder="Hours"
          />
          <input
            name="status"
            value={task.status}
            onChange={(e) => handleArrayChange(idx, e, "tasks")}
            placeholder="Status"
          />
        </div>
      ))}

      <h3>Projected Metrics</h3>
      {projectData.projMetrics.map((metric, idx) => (
        <div key={idx} className="space-y-1">
          <input
            name="money"
            value={metric.money}
            onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
            placeholder="Budget ($)"
          />
          <input
            name="hours"
            value={metric.hours}
            onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
            placeholder="Budget Hours"
          />
          <input
            type="date"
            name="due"
            value={metric.due}
            onChange={(e) => handleArrayChange(idx, e, "projMetrics")}
            placeholder="Due Date"
          />
        </div>
      ))}

      <h3>Purchase List</h3>
      {projectData.purchaseList.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <input
            name="title"
            value={item.title}
            onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
            placeholder="Item Title"
          />
          <input
            name="partNumber"
            value={item.partNumber}
            onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
            placeholder="Part Number"
          />
          <input
            name="description"
            value={item.description}
            onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
            placeholder="Description"
          />
          <input
            type="date"
            name="orderedOn"
            value={item.orderedOn}
            onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
            placeholder="Ordered On"
          />
          <input
            name="price"
            value={item.price}
            onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
            placeholder="Price ($)"
          />
          <input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleArrayChange(idx, e, "purchaseList")}
            placeholder="Quantity"
          />
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit Project
      </button>
    </form>
  );
};
