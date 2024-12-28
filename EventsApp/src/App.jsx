import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import SignInForm from "./components/SignInForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/User/UserDashboard";
import OrganizerDashboard from "./components/Organizator/OrganizatorDashboard";
import AddEventForm from "./components//Organizator/EventForms/AddEventForm";
import AddEventGroupForm from "./components/Organizator/EventForms/AddEventGroupForm";
import EventGroupDetails from "./components/Organizator/EventGroupDetails";
import EventDetails from "./components/Organizator/EventDetails";
import EditEventForm from "./components/Organizator/EventForms/EditEventForm";
import WebEventDetails from "./components/WebEventDetails";
import EventListDetails from "./components/Organizator/EventListDetails"

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser({ role: decodedToken.role });
    }
  }, []);

  return (
    <Router>
  <div className="flex flex-col min-h-screen">
    {/* Header */}
    <Header />

    {/* Main Content */}
    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/user/dashboard"
          element={user && user.role === "USER" ? <UserDashboard /> : <Navigate to="/login" />}
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
        <Route path="/organizer/add-event/:groupId" element={<AddEventForm />} />
        <Route
          path="/organizer/addEventGroup"
          element={
            user && user.role === "ORGANIZATOR" ? <AddEventGroupForm /> : <Navigate to="/login" />
          }
        />
        <Route path="/organizer/event-group/:id" element={<EventGroupDetails />} />
        <Route path="/event-web/:id" element={<WebEventDetails />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="organizer/edit/event/:id" element={<EditEventForm />} />
        <Route path="/group/:idGroup/event/:idEvent" element={<EventListDetails />} />
      </Routes>
    </main>

    {/* Footer */}
    <Footer />
  </div>
</Router>
  );
}

export default App;
