import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditEventForm from "../Organizator/EventForms/EditEventForm";
import { useNavigate } from "react-router-dom";

const CustomEventCard = ({ event, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleCloseForm = () => {
    setIsEditing(false); 
  };
  const handleViewDetails = () => {
    navigate(`/group/${event.idGroup}/event/${event.id}`);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
      <p className="text-gray-600">{" "}
      {new Date(event.startTime).toLocaleString()}
      </p>

      <div className="flex justify-between items-center mt-4">
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
                onClick={handleEditClick} 
              >
                <FaEdit className="mr-2" /> Edit
              </button>
              <button
                className="px-3 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 flex items-center"
                onClick={() => onDelete(event.id)} 
              >
                <FaTrash className="mr-2" /> Delete
              </button>
            </div>
          </>
        ) : (
          <EditEventForm
            event={event}
            onClose={handleCloseForm}
            onUpdate={onUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default CustomEventCard;
