import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditEventForm from "../Organizator/EventForms/EditEventForm";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";

const CustomEventCard = ({ event, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const handleEditClick = () => {
    setIsEditing(true); // Schimbă starea pentru a deschide formularul de editare
  };

  const handleCloseForm = () => {
    setIsEditing(false); // Închide formularul de editare
  };
  const handleViewDetails = () => {
    // Navigate to the event details page for this group and event
    navigate(`/group/${event.idGroup}/event/${event.id}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
      <p className="text-gray-600">{event.startTime}
      </p>

      <div className="flex justify-between items-center mt-4">
        {/* Dacă nu suntem în modul de editare, arătăm butoanele */}
        {!isEditing ? (
          <>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={handleViewDetails}
            >
              Vezi detalii
            </button>
            <div className="flex space-x-2">
              <button
                className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                onClick={handleEditClick} // Clic pe butonul de editare
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                className="px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center"
                onClick={() => onDelete(event.id)} // Trimite id-ul pentru a șterge evenimentul
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </>
        ) : (
          // Dacă suntem în modul de editare, renderizăm formularul de editare
          <EditEventForm
            event={event}
            onClose={handleCloseForm} // Închide formularul după actualizare
            onUpdate={onUpdate} // Trimite funcția de actualizare pentru a modifica evenimentul
          />
        )}
      </div>
    </div>
  );
};

export default CustomEventCard;
