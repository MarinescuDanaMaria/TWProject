import React, { useEffect, useState } from "react";

const EditEventForm = ({ event, onClose, onUpdate }) => {
  const [name, setName] = useState(event.name || "");
  const [description, setDescription] = useState(event.description || "");
  const [startTime, setStartTime] = useState(event.startTime || "");
  const [endTime, setEndTime] = useState(event.endTime || "");
  const [error, setError] = useState("");

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "";
    return dateTime.replace(" ", "T").slice(0, 16);
  };

  useEffect(() => {
    setName(event.name);
    setDescription(event.description);
    setStartTime(formatDateTime(event.startTime));
    setEndTime(formatDateTime(event.endTime));
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (endTime && new Date(endTime) < new Date(startTime)) {
      setError("End Time nu poate fi înainte de Start Time!");
      return;
    } else {
      setError("");
    }

    const eventData = {
      name,
      description,
      startTime,
      endTime,
    };

    try {
      const response = await fetch(`http://localhost:8081/organizer/event/${event.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Actualizarea evenimentului a eșuat");
      }

      const updatedEvent = await response.json();
      onUpdate(updatedEvent); // Apelează onUpdate cu evenimentul actualizat
      onClose(); // Închide formularul după actualizare
    } catch (error) {
      console.error(error);
      setError(error.message || "A apărut o eroare");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <button
          className="absolute top-2 right-2 text-xl"
          onClick={onClose}
        >
          <span>&times;</span>
        </button>
        <h2 className="text-2xl font-semibold text-center mb-6">Editare Eveniment</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nume
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descriere
            </label>
            <textarea
              id="description"
              className="mt-1 p-2 w-full border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              className="mt-1 p-2 w-full border rounded-md"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              className="mt-1 p-2 w-full border rounded-md"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Salvează Modificările
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm;
