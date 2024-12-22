import React, { useState } from "react";
import { useParams } from "react-router-dom";

function AddEventForm() {
  const { groupId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (endTime && new Date(endTime) < new Date(startTime)) {
      setError("End Time nu poate fi înainte de Start Time!");
      return; 
    } else {
      setError("")
    }

    if (!name || !description || !startTime) {
      alert("Toate câmpurile obligatorii trebuie completate!");
      return;
    }

    const eventData = {
      name,
      description,
      startTime,
      endTime,
      groupId
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8081/organizer/events-group/${groupId}/add/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Evenimentul a fost adăugat cu succes!");
      } else {
        alert(`Eroare la adăugarea evenimentului: ${data.error}`);
      }
    } catch (error) {
      console.error("Eroare la trimiterea cererii:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Adaugă Eveniment</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
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
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
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

        {error && (
          <div className="mb-4 text-red-500 text-sm">
            <p>{error}</p>
          </div>
        )}

        <div className="text-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300">
            Adaugă Eveniment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventForm;
