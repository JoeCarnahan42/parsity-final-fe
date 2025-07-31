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
  const [confirmationMsg, setConfirmationMsg] = useState(null);

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
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Schedule a Meeting</h2>

      <input
        type="text"
        name="summary"
        placeholder="Meeting Title"
        value={formData.summary}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block">
        Start Time:
        <input
          type="datetime-local"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
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
          className="w-full p-2 border rounded"
        />
      </label>
      {confirmationMsg && (
        <div className="text-green-600">{confirmationMsg}</div>
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Calendar Event
      </button>
    </form>
  );
};
