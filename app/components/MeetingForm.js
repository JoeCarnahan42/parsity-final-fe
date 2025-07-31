"use client";
import axios from "axios";
import { useState } from "react";

export const MeetingForm = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    location: "",
    start: "",
    end: "",
    timezone,
  });
  const [confirmationMsg, setConfirmationMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://parsity-final-be.onrender.com/calendar/create-event",
        formData,
        { withCredentials: true }
      );
      setConfirmationMsg("Meeting scheduled successfully!");
      setFormData({
        summary: "",
        description: "",
        location: "",
        start: "",
        end: "",
        timezone,
      });
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-group">
      <h2 className="text-xl font-semibold">Schedule a Meeting</h2>

      <input
        type="text"
        name="summary"
        placeholder="Meeting Title"
        value={formData.summary}
        onChange={handleChange}
        required
        className="form-control"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="form-control"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="form-control"
      />

      <label className="block">
        Start Time:
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
          className="form-control"
        />
      </label>

      <label className="block">
        End Time:
        <input
          type="datetime-local"
          name="end"
          value={formData.end}
          onChange={handleChange}
          required
          className="form-control"
        />
      </label>
      {confirmationMsg && (
        <div className="alert alert-success text-center fade show" role="alert">
          {confirmationMsg}
        </div>
      )}
      <button type="submit" className="btn btn-success">
        Create Calendar Event
      </button>
    </form>
  );
};
