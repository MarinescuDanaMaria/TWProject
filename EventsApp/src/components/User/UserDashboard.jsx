import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [eventGroups, setEventGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/user/unconfirmed-events",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user events.");
        }

        const data = await response.json();
        setEventGroups(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserEvents();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard Utilizator
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Bine ai venit, utilizator! Mai jos poți vedea evenimentele la care ești
        înregistrat și nu au fost încă confirmate.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Evenimentele tale:</h2>

      {eventGroups.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {eventGroups.map((event) => (
            <div
              key={event.id}
              className="bg-gray-100 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-2">{event.name}</h3>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Start: {new Date(event.startTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                End: {new Date(event.endTime).toLocaleString()}
              </p>

              {event.qrCode && (
                <div className="mb-4 text-center">
                  <img
                    src={`http://localhost:8081${event.qrCode.image_url}`}
                    alt="QR Code"
                    className="mx-auto w-32 h-32"
                  />
                </div>
              )}

              <p className="text-gray-800 font-semibold mb-2">
                Text generat automat:{" "}
                <span className="text-blue-600">{event.autoGeneratedText}</span>
              </p>

              <Link
                to={`/event-web/${event.id}`}
                className="text-blue-500 hover:underline"
              >
                Vezi detalii eveniment
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          Nu ai niciun eveniment activ și neconfirmat.
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
