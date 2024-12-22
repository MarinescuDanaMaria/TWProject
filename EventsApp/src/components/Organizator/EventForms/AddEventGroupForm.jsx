import React, { useState } from "react";

function AddEventGroupForm() {
  const [name, setName] = useState("");
  const [idUser, setIdUser] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Toate câmpurile obligatorii trebuie completate!");
      return;
    }

    const groupData = { name};

    try {
      const token = localStorage.getItem("token"); // Obține token-ul pentru autorizare
      const response = await fetch("http://localhost:8081/organizer/add/event-groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(groupData),
      });

      const data = await response.json();
      console.log("Răspuns de la backend:", data);

      if (response.ok) {
        alert("Grupul de evenimente a fost creat cu succes!");
        setName("");
        setIdUser("");
      } else {
        alert(`Eroare la crearea grupului: ${data.error || "Eroare necunoscută"}`);
      }
    } catch (error) {
      console.error("Eroare la trimiterea cererii:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Event Group</h2>
      <form onSubmit={handleSubmit}>
        {/* Group Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Group Name
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

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Group
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventGroupForm;
