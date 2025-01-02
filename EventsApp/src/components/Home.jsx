import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrganizer, setSelectedOrganizer] = useState("All");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchEvents = async (query = "", organizer = "All") => {
    setLoading(true); 
    setErrorMessage(""); 
    try {
      const response = await fetch(
        `http://localhost:8081/event-groups/grouped-by-organizer?organizerId=${organizer}&searchQuery=${query}`
      );
      const result = await response.json();

      if (response.ok && result.success === true) {
        setData(result.objects);
      } else if (result.success === false) {
        setData([]); 
        setErrorMessage(result.message); 
      } else {
        setData([]);
        setErrorMessage("Eroare necunoscută!");
      }
    } catch (error) {
      console.error("Error fetching events:", error.message);
      setErrorMessage("A apărut o eroare la conectarea cu serverul!");
    } finally {
      setLoading(false); 
    }
  };

  const debouncedSearch = useCallback(
    debounce((query, organizer) => {
      fetchEvents(query, organizer);
    }, 500),
    []
  );

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query, selectedOrganizer);
  };

  const handleOrganizerChange = (e) => {
    const organizer = e.target.value;
    setSelectedOrganizer(organizer);
    setSearchQuery("");
    fetchEvents("", organizer); 
  };

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
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Caută eveniment..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border rounded-md w-1/2"
          />

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
        {errorMessage ? (
          <div className="text-center text-red-500 py-10">{errorMessage}</div>
        ) : data.length > 0 ? (
          data.map((userData, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Organizator: {userData.user.first_name}{" "}
                {userData.user.last_name}
              </h2>
              {userData.eventGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Grup: {group.name}
                  </h3>
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
                          className={`mt-2 font-semibold ${(() => {
                            if (event.status === "CLOSED") {
                              return "text-red-500";
                            }
                            if (event.status === "SCHEDULED") {
                              return "text-blue-500";
                            }
                            return "text-green-500";
                          })()}`}
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
          <div className="text-center py-10">
            Nu există evenimente disponibile.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
