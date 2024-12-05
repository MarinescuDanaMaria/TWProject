import React, { useEffect, useState } from "react";
import AddEventForm from "./AddEventForm";

function EventGroupList() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Fetch groups from the backend
  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/organizer/event-groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setGroups(data.groups || []); // Assume backend sends `groups`
    } catch (error) {
      console.error("Eroare la obținerea grupurilor:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleAddEventClick = (groupId) => {
    setSelectedGroup(groupId);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Lista Grupuri de Evenimente</h2>
      {groups.length > 0 ? (
        groups.map((group) => (
          <div key={group.id} className="border p-4 mb-4 rounded shadow">
            <h3 className="text-lg font-medium">{group.name}</h3>
            <button
              onClick={() => handleAddEventClick(group.id)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Adaugă Eveniment
            </button>
          </div>
        ))
      ) : (
        <p>Nu există grupuri de evenimente disponibile.</p>
      )}

      {/* Add Event Form */}
      {selectedGroup && (
        <div className="mt-6">
          <AddEventForm groupId={selectedGroup} onEventAdded={fetchGroups} />
        </div>
      )}
    </div>
  );
}

export default EventGroupList;
