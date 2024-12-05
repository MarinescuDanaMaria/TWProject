// import React from "react";
// import { Link } from "react-router-dom";

// const OrganizerDashboard = () => {
//   return (
//     <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Dashboard Organizator</h1>
//       <p className="text-lg text-center text-gray-600 mb-8">
//         Bine ai venit, organizator! Ai la dispoziție opțiunile de mai jos pentru a gestiona evenimentele.
//       </p>

//       <div className="flex justify-center space-x-6">
//         {/* Link pentru adăugarea unui eveniment */}
//         <Link
//           to="/organizer/add-event"
//           className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
//         >
//           Adaugă Eveniment
//         </Link>

//         {/* Link pentru vizualizarea listei de evenimente */}
//         <Link
//           to="/organizer/events"
//           className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-300"
//         >
//           Vizualizează Evenimente
//         </Link>
//       </div>

//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistici Evenimente</h2>
//         <ul className="text-gray-600">
//           <li>- Număr total de evenimente organizate: <strong>10</strong></li>
//           <li>- Număr de evenimente în desfășurare: <strong>5</strong></li>
//           <li>- Număr de participanți înscriși: <strong>120</strong></li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default OrganizerDashboard;

import React from "react";
import { Link } from "react-router-dom";
//import AddEventGroupForm from "./AddEventGroupForm";
//import EventGroupList from "./EventGroupList";


const OrganizerDashboard = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard Organizator</h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Bine ai venit, organizator! Ai la dispoziție opțiunile de mai jos pentru a gestiona evenimentele.
      </p>

      <div className="flex justify-center space-x-6">
        {/* Link pentru adăugarea unui eveniment */}
        <Link
          to="/organizer/add-event"
          className="px-6 py-3"
          style={{
            backgroundColor: "#2471A3", // Turcoaz pastel
            color: "white",
            borderRadius: "0.375rem",
            fontWeight: "500",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#30C1B8")} // Nuanță mai închisă
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2471A3")}
        >
          Adaugă Eveniment
        </Link>

        <Link
          to="/organizer/addEventGroup"
          className="px-6 py-3"
          style={{
            backgroundColor: "#2471A3", 
            color: "white",
            borderRadius: "0.375rem",
            fontWeight: "500",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#30C1B8")} // Nuanță mai închisă
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2471A3")}
        >
          Adaugă Grup de evenimente 
        </Link>


        {/* Link pentru vizualizarea listei de evenimente */}
        <Link
          to="/organizer/events"
          className="px-6 py-3"
          style={{
            backgroundColor: "#2471A3", 
            color: "white",
            borderRadius: "0.375rem",
            fontWeight: "500",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#5499C7")} 
          onMouseOut={(e) => (e.target.style.backgroundColor = "#2471A3")}
        >
          Vizualizează Evenimente
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistici Evenimente</h2>
        <ul className="text-gray-600">
          <li>- Număr total de evenimente organizate: <strong>10</strong></li>
          <li>- Număr de evenimente în desfășurare: <strong>5</strong></li>
          <li>- Număr de participanți înscriși: <strong>120</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
