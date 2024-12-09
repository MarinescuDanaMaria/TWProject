import React, { useEffect, useState } from "react";
import AddEventForm from "../AddEventForm";

function EventGroupList() {
  const [eventGroups, setGroups] = useState([]);
  const [groupedEvents, setGroupedEvents] = useState({}); 
  const [selectedGroup, setSelectedGroup] = useState(null); 


  const fetchGroupsAndEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8081/organizer/get/event-groups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const groups = data.eventGroups || [];

      setGroups(groups);
   
      for (const group of groups) {
        await fetchEventsForGroup(group.id);
      }
    } catch (error) {
      console.error("Eroare la obținerea grupurilor și evenimentelor:", error);
    }
  };


  const fetchEventsForGroup = async (groupId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token-ul nu este disponibil.");
        return;
      }

      const response = await fetch(`http://localhost:8081/organizer/get/events/${groupId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGroupedEvents((prev) => ({
          ...prev,
          [groupId]: data.events, 
        }));
      } else {
        console.error(`Eroare la obținerea evenimentelor pentru grupul ${groupId}`);
      }
    } catch (error) {
      console.error("Eroare la conectarea cu backend-ul:", error);
    }
  };

  useEffect(() => {
    fetchGroupsAndEvents();
  }, []);

  const handleAddEventClick = (groupId) => {
    const group = eventGroups.find((eventGroup) => eventGroup.id === groupId);
    setSelectedGroup(group); 
  };

  return (
    <div className="max-w-6xl mx-auto p-4 flex">
      {/* Lista grupurilor */}
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-semibold mb-4">Lista Grupuri de Evenimente</h2>
        {eventGroups.length > 0 ? (
          eventGroups.map((eventGroup) => (
            <div key={eventGroup.id} className="border p-4 mb-4 rounded shadow">
              <h3 className="text-lg font-medium">{eventGroup.name}</h3>

              {/* Lista de evenimente pentru acest grup */}
              {groupedEvents[eventGroup.id] ? (
                <div className="mt-4">
                  <h4 className="text-md font-semibold">Evenimente:</h4>
                  <ul>
                    {groupedEvents[eventGroup.id].map((event) => (
                      <li key={event.id} className="mb-2">
                        <p><strong>Nume:</strong> {event.name}</p>
                        <p><strong>Descriere:</strong> {event.description}</p>
                        <p><strong>Start:</strong> {new Date(event.startTime).toLocaleString()}</p>
                        {event.endTime && (
                          <p><strong>End:</strong> {new Date(event.endTime).toLocaleString()}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Nu există evenimente pentru acest grup.</p>
              )}

              {/* Buton pentru adăugarea unui eveniment */}
              <button
                onClick={() => handleAddEventClick(eventGroup.id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Adaugă Eveniment
              </button>
            </div>
          ))
        ) : (
          <p>Nu există grupuri de evenimente disponibile.</p>
        )}
      </div>

      {/* Formularul AddEventForm */}
      <div className="w-1/2 pl-4">
        {selectedGroup && (
          <div>
            <div className="text-center mb-4">
              <h3 className="text-xl font-medium">
                Adaugă Eveniment pentru Grupul {selectedGroup.name}
              </h3>
            </div>
            <AddEventForm
              groupId={selectedGroup.id}
              onEventAdded={() => fetchEventsForGroup(selectedGroup.id)} // Actualizează evenimentele grupului după adăugare
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventGroupList;

