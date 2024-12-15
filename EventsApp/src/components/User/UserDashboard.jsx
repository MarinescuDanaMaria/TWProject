import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [eventGroups, setEventGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  // fct user 
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md mt-6">
       <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard Utilizator
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Bine ai venit, utilizator! Mai jos poți vedea evenimentele la care ești înregistrat.</p>
    </div>
  );
};

export default UserDashboard;
