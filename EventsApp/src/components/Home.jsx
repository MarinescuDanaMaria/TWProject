import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganizer, setSelectedOrganizer] = useState("All");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/event-groups/grouped-by-organizer"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching events:", error.message,error.stack);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOrganizerChange = (e) => {
    setSelectedOrganizer(e.target.value);
    setSearchQuery("");
  };

  // Filtrarea datelor pe baza organizatorului selectat și a interogării de căutare
  const filteredData = data
    .filter((userData) => {
      if (selectedOrganizer === "All") return true;
      return userData.user.id === selectedOrganizer;
    })
    .map((userData) => ({
      ...userData,
      eventGroups: userData.eventGroups
        .map((eventGroup) => ({
          ...eventGroup,
          events: eventGroup.events.filter((event) =>
            event.name.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((eventGroup) => eventGroup.events.length > 0), // Păstrează doar grupurile cu evenimente care se potrivesc
    }))
    .filter((userData) => userData.eventGroups.length > 0); // Păstrează doar organizatorii cu grupuri relevante

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-r from-gray-200 to-indigo-200 min-h-screen">
      <div className="container mx-auto p-6">
       <h1 className="text-2xl font-bold text-center mb-4">Bine ai venit!</h1>
       <p className="text-lg text-center mb-10">
     Iată o listă cu evenimentele existente:
       </p>
      </div>

      <div className="container mx-auto p-6">
        {/* Secțiunea de căutare și filtrare */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Căutare */}
          <input
            type="text"
            placeholder="Caută eveniment..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md w-1/2"
          />

          {/* Dropdown Organizator */}
          <select
            value={selectedOrganizer}
            onChange={handleOrganizerChange}
            className="p-2 border rounded-md"
          >
            <option value="All">Toți Organizatorii</option>
            {data.map((userData) => (
              <option key={userData.user.id} value={userData.user.id}>
                {userData.user.first_name} {userData.user.last_name}
              </option>
            ))}
          </select>
        </div>

        {/* Afișare Evenimente */}
        {filteredData.length > 0 ? (
          filteredData.map((userData, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Organizator: {userData.user.first_name} {userData.user.last_name}
              </h2>
              {userData.eventGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Grup: {group.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.events.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white shadow-md rounded-lg p-4"
                      >
                        <h4 className="text-lg font-bold">{event.name}</h4>
                        <p className="text-gray-600">{event.description}</p>
                        <p className="text-sm text-gray-500">
                          Start: {new Date(event.startTime).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          End: {new Date(event.endTime).toLocaleString()}
                        </p>
                        <p
                          className={`mt-2 font-semibold ${
                            event.status === "OPEN"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {event.status}
                        </p>
                        <Link
                          to={`/event-web/${event.id}`}
                          className="text-blue-500 mt-2 block"
                        >
                          View Details
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-10">Nu există evenimente disponibile.</div>
        )}
      </div>
    </div>
  );
}

export default Home;

