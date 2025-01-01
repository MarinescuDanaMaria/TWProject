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
import EventListDetails from "./components/Organizator/EventListDetails";
import WelcomeEventPage from "./components/User/WelcomeEventPage";

function App() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state

  // Load user role from localStorage on mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }

    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <Route
              path="/login"
              element={<LoginForm setUserRole={setUserRole} />}
            />
            <Route
              path="/user/dashboard"
              element={
                userRole === "USER" ? (
                  <UserDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/organizer/dashboard"
              element={
                userRole === "ORGANIZATOR" ? (
                  <OrganizerDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/organizer/add-event/:groupId"
              element={
                userRole === "ORGANIZATOR" ? (
                  <AddEventForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/organizer/addEventGroup"
              element={
                userRole === "ORGANIZATOR" ? (
                  <AddEventGroupForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/organizer/event-group/:id"
              element={
                userRole === "ORGANIZATOR" ? (
                  <EventGroupDetails />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/event-web/:id" element={<WebEventDetails />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route
              path="organizer/edit/event/:id"
              element={
                userRole === "ORGANIZATOR" ? (
                  <EditEventForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/group/:idGroup/event/:idEvent"
              element={<EventListDetails />}
            />
            <Route path="/welcome-event/:id" element={<WelcomeEventPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// function App() {
//   const checkUserRole = (neededRole) => {
//     const user = localStorage.getItem("user");
//     if (!user) return false; // If no user is in localStorage, deny access
//     const parsedUser = JSON.parse(user);
//     return parsedUser.role === neededRole; // Compare the role
//   };

//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         {/* Header */}
//         <Header />

//         {/* Main Content */}
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/sign-in" element={<SignInForm />} />
//             <Route path="/login" element={<LoginForm />} />
//             <Route
//               path="/user/dashboard"
//               element={
//                 checkUserRole("USER") ? (
//                   <UserDashboard />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/organizer/dashboard"
//               element={
//                 checkUserRole("ORGANIZATOR") ? (
//                   <OrganizerDashboard />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/organizer/add-event/:groupId"
//               element={<AddEventForm />}
//             />
//             <Route
//               path="/organizer/addEventGroup"
//               element={
//                 checkUserRole("ORGANIZATOR") ? (
//                   <AddEventGroupForm />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/organizer/event-group/:id"
//               element={
//                 checkUserRole("ORGANIZATOR") ? (
//                   <EventGroupDetails />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route path="/event-web/:id" element={<WebEventDetails />} />
//             <Route path="/event/:id" element={<EventDetails />} />
//             <Route
//               path="organizer/edit/event/:id"
//               element={<EditEventForm />}
//             />
//             <Route
//               path="/group/:idGroup/event/:idEvent"
//               element={<EventListDetails />}
//             />
//             <Route path="/welcome-event/:id" element={<WelcomeEventPage />} />
//           </Routes>
//         </main>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;
