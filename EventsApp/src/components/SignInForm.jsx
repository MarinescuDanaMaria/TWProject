// import React, { useState } from "react";

// function SignInForm() {
//   // State pentru a păstra valorile câmpurilor
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [birthDate, setBirthDate] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [retryPassword, setRetryPassword] = useState("");
//   const [role, setRole] = useState("user");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== retryPassword) {
//       alert("Parolele nu se potrivesc!");
//       return;
//     }

//     const userData = {
//       firstName,
//       lastName,
//       email,
//       birthDate,
//       password,
//       retryPassword,
//       role,
//     };

//     try {
//       const response = await fetch("http://localhost:8081/auth/sign-in", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });
// /////////
//       const data = await response.json(); // Verificăm răspunsul ca JSON
//       console.log("Backend response:", data); // Log pentru răspunsul backend
// //////////
//       if (response.ok) {
//         alert("Contul a fost creat cu succes!");
//       } else {
//         alert("Eroare la crearea contului!");
//       }
//     } catch (error) {
//       console.error("Eroare la trimiterea cererii:", error);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
//       <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
//       <form onSubmit={handleSubmit}>
//         {/* First Name */}
//         <div className="mb-4">
//           <label
//             htmlFor="firstName"
//             className="block text-sm font-medium text-gray-700"
//           >
//             First Name
//           </label>
//           <input
//             type="text"
//             id="firstName"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//           />
//         </div>

//         {/* Last Name */}
//         <div className="mb-4">
//           <label
//             htmlFor="lastName"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Last Name
//           </label>
//           <input
//             type="text"
//             id="lastName"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//           />
//         </div>
//         {/* Email */}
//         <div className="mb-4">
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Email
//           </label>
//           <input
//             type="text"
//             id="email"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         {/* Birth Date */}
//         <div className="mb-4">
//           <label
//             htmlFor="birthDate"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Birth Date
//           </label>
//           <input
//             type="date"
//             id="birthDate"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={birthDate}
//             onChange={(e) => setBirthDate(e.target.value)}
//             required
//           />
//         </div>

//         {/* Password */}
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         {/* Retry Password */}
//         <div className="mb-4">
//           <label
//             htmlFor="retryPassword"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Confirm Password
//           </label>
//           <input
//             type="password"
//             id="retryPassword"
//             className="mt-1 p-2 w-full border rounded-md"
//             value={retryPassword}
//             onChange={(e) => setRetryPassword(e.target.value)}
//             required
//           />
//         </div>

//         {/* Role selection */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Role
//           </label>
//           <div className="flex items-center">
//             <label className="mr-4">
//               <input
//                 type="radio"
//                 value="user"
//                 checked={role === "USER"}
//                 onChange={() => setRole("USER")}
//                 className="mr-2"
//               />
//               User
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 value="organizer"
//                 checked={role === "ORGANIZATOR"}
//                 onChange={() => setRole("ORGANIZATOR")}
//                 className="mr-2"
//               />
//               Organizer
//             </label>
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SignInForm;

import React, { useState } from "react";

function SignInForm() {
  // State pentru a păstra valorile câmpurilor
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [retryPassword, setRetryPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== retryPassword) {
      alert("Parolele nu se potrivesc!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      birthDate,
      password,
      retryPassword,
      role,
    };

    try {
      const response = await fetch("http://localhost:8081/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json(); // Verificăm răspunsul ca JSON
      console.log("Backend response:", data); // Log pentru răspunsul backend

      if (response.ok) {
        alert("Contul a fost creat cu succes!");
      } else {
        alert("Eroare la crearea contului!");
      }
    } catch (error) {
      console.error("Eroare la trimiterea cererii:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-lg w-1/2 mx-auto bg-white border border-gray-300 p-8 rounded-md shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Birth Date */}
          <div className="mb-4">
            <label
              htmlFor="birthDate"
              className="block text-sm font-medium text-gray-700"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birthDate"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Retry Password */}
          <div className="mb-4">
            <label
              htmlFor="retryPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="retryPassword"
              className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={retryPassword}
              onChange={(e) => setRetryPassword(e.target.value)}
              required
            />
          </div>

          {/* Role selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <div className="flex items-center">
              <label className="mr-4">
                <input
                  type="radio"
                  value="user"
                  checked={role === "USER"}
                  onChange={() => setRole("USER")}
                  className="mr-2"
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  value="organizer"
                  checked={role === "ORGANIZATOR"}
                  onChange={() => setRole("ORGANIZATOR")}
                  className="mr-2"
                />
                Organizer
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
