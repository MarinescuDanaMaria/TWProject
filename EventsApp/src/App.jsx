import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/User/UserDashboard";
import OrganizerDashboard from "./components/Organizator/OrganizatorDashboard";
import AddEventForm from "./components/AddEventForm";
import EventList from "./components/Organizator/EventList";
import AddEventGroupForm from "./components/AddEventGroupForm";
import EventGroupDetails from "./components/Organizator/EventGroupDetails";
import EventDetails from "./components/Organizator/EventDetails";
import EditEventForm from "./components/EditEventForm";
import WebEventDetails from "./components/WebEventDetails";

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
      <div>
        <Header />
        <h1>My React App</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/user/dashboard"
            element={user && user.role === "USER" ? <UserDashboard /> : null}
          />
          <Route
            path="/organizer/dashboard"
            element={
              user && user.role === "ORGANIZATOR" ? (
                <OrganizerDashboard />
              ) : null
            }
          />
          <Route
            path="/organizer/add-event/:groupId"
            element={<AddEventForm />}
          />
          <Route
            path="/organizer/addEventGroup"
            element={
              user && user.role === "ORGANIZATOR" ? <AddEventGroupForm /> : null
            }
          />
          {/* <Route
            path="/organizer/events"
            element={user && user.role === "ORGANIZATOR" ? <EventList /> : null}
          /> */}
          <Route
            path="/organizer/event-group/:id"
            element={<EventGroupDetails />}
          />
           <Route path="/event-web/:id" element={<WebEventDetails/>} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="organizer/edit/event/:id" element={<EditEventForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
