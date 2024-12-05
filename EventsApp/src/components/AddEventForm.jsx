// import React, { useState } from "react";

// function AddEventForm() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("OPEN");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [idGroup, setIdGroup] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !description || !startTime || !idGroup) {
//       alert("Toate câmpurile obligatorii trebuie completate!");
//       return;
//     }

//     const eventData = {
//       name,
//       description,
//       status,
//       startTime,
//       endTime,
//       idGroup,
//     };

//     try {

//       ////
//       const token = localStorage.getItem("token");
//       /////
//       const response = await fetch("http://localhost:8081/organizer/events", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ////
//           Authorization: `Bearer ${token}`,
//           ////
//         },
//         body: JSON.stringify(eventData),
//       });
// ////////
//       const data = await response.json(); // Obține răspunsul în format JSON
//     console.log("Răspuns de la backend:", data);
// /////////
//       if (response.ok) {
//         alert("Evenimentul a fost adăugat cu succes!");
//       } else {
//         alert("Eroare la adăugarea evenimentului!");
//       }
//     } catch (error) {
//       console.error("Eroare la trimiterea cererii:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Add Event</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Name */}
//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="mb-4">
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         {/* Status */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <div className="flex items-center">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 value="OPEN"
//                 checked={status === "OPEN"}
//                 onChange={() => setStatus("OPEN")}
//                 className="mr-2"
//               />
//               Open
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="CLOSED"
//                 checked={status === "CLOSED"}
//                 onChange={() => setStatus("CLOSED")}
//                 className="mr-2"
//               />
//               Closed
//             </label>
//           </div>
//         </div>

//         {/* Start Time */}
//         <div className="mb-4">
//           <label
//             htmlFor="startTime"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Start Time
//           </label>
//           <input
//             type="datetime-local"
//             id="startTime"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             required
//           />
//         </div>

//         {/* End Time */}
//         <div className="mb-4">
//           <label
//             htmlFor="endTime"
//             className="block text-sm font-medium text-gray-700"
//           >
//             End Time
//           </label>
//           <input
//             type="datetime-local"
//             id="endTime"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//           />
//         </div>

//         {/* Group ID */}
//         <div className="mb-4">
//           <label
//             htmlFor="idGroup"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Group ID
//           </label>
//           <input
//             type="text"
//             id="idGroup"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={idGroup}
//             onChange={(e) => setIdGroup(e.target.value)}
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Add Event
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddEventForm;


import React, { useState } from "react";

function AddEventForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [idGroup, setIdGroup] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !startTime || !idGroup) {
      alert("Toate câmpurile obligatorii trebuie completate!");
      return;
    }

    const eventData = {
      name,
      description,
      startTime,
      endTime,
      idGroup,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/organizer/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();
      console.log("Răspuns de la backend:", data);

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
      <h2 className="text-2xl font-semibold text-center mb-6">Add Event</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
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

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            className="mt-1 p-2 w-full border rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Start Time */}
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

        {/* End Time */}
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

        {/* Group ID */}
        <div className="mb-4">
          <label htmlFor="idGroup" className="block text-sm font-medium text-gray-700">
            Group ID
          </label>
          <input
            type="text"
            id="idGroup"
            className="mt-1 p-2 w-full border rounded-md"
            value={idGroup}
            onChange={(e) => setIdGroup(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300">
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEventForm;
