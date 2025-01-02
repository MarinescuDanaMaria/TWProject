import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setUserRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success === true) {
        alert("Autentificare reușită!");
        localStorage.setItem("token", data.token);
        const decodedToken = JSON.parse(atob(data.token.split(".")[1]));
        const userRole = decodedToken.role;
        const userData = {
          name: decodedToken.name,
          role: userRole,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUserRole(userRole); // Update state with the role
        redirectToSpecificRole(userRole);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Eroare la autentificare:", error);
    }
  };

  const redirectToSpecificRole = (role) => {
    if (role === "USER") {
      navigate("/user/dashboard");
    } else if (role === "ORGANIZATOR") {
      navigate("/organizer/dashboard");
    } else {
      alert("test");
    }
  };

  const handleNavigateToSignUp = () => {
    navigate("/sign-in");
  };

  return (
    <div className="max-w-lg w-1/2 mx-auto bg-white border border-gray-300 p-8 rounded-md shadow-xl mt-32 ">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Parola
          </label>
          <input
            type="password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300 mr-4"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleNavigateToSignUp}
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
          >
            Not an account yet?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
