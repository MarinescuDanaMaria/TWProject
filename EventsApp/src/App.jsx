import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/User/UserDashboard";
import OrganizerDashboard from "./components/Organizator/OrganizatorDashboard";
import AddEventGroupForm from "./components/AddEventGroupForm"; 
import EventGroupList from "./components/Organizator/EventGroupList"; // Importă componenta
import AddEventForm from "./components/AddEventForm";



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      setUser({ role: decodedToken.role }); 
    }
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <h1>My React App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/user/dashboard"
            element={
              user && user.role === "USER" ? (
                <UserDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/organizer/dashboard"
            element={
              user && user.role === "ORGANIZATOR" ? (
                <OrganizerDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/organizer/addEventGroup"
            element={
              user && user.role === "ORGANIZATOR" ? (
                <AddEventGroupForm />
              ):null
            }
          />
          <Route
           path="/organizer/getEventGroupList"
           element={
           user && user.role === "ORGANIZATOR" ? (
             <EventGroupList />
             ) : null
            }
          />
          {/*  rutele pentru AddEventForm si EventList */}
          <Route
            path="/organizer/addEvent"
            element={
              user && user.role === "ORGANIZATOR" ? (
                <AddEventForm />
              ) : null
            }
          /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

