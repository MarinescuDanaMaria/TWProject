import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrganizerDashboard = () => {
  const [eventGroups, setEventGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventGroups = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/organizer/event-groups",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setEventGroups(data);
      } catch (error) {
        console.error("Eroare la preluarea grupurilor de evenimente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventGroups();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard Organizator
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Bine ai venit, organizator! Ai la dispoziție opțiunile de mai jos pentru
        a gestiona evenimentele.
      </p>

      <div className="flex justify-center space-x-6">
        <Link
          to="/organizer/addEventGroup"
          className="px-6 py-3 bg-blue-600 text-white rounded-md font-medium transition-colors hover:bg-blue-700"
        >
          Adaugă Grup de evenimente
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Statistici Evenimente
        </h2>
        <ul className="text-gray-600">
          <li>
            - Număr total de evenimente organizate: <strong>10</strong>
          </li>
          <li>
            - Număr de evenimente în desfășurare: <strong>5</strong>
          </li>
          <li>
            - Număr de participanți înscriși: <strong>120</strong>
          </li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Grupuri de Evenimente
        </h2>
        {loading ? (
          <p>Se încarcă grupurile de evenimente...</p>
        ) : eventGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {eventGroups.map((group) => (
              <div
                key={group.id}
                className="p-4 border border-gray-200 rounded-md shadow-sm hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {group.name}
                </h3>
                <Link
                  to={`/organizer/event-group/${group.id}`}
                  className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Vizualizează Detalii
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            Nu există grupuri de evenimente disponibile.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
