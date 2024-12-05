// restricitoneaza accseul pe baza rolului 

// const roleMiddleware = (requiredRole) => { // primeste rolul necesar ca parametru
//   return (req, res, next) => {
//     const userRole = req.user.role; // extrage rolul din req.user ( adaugat anterior de authMiddleware)

//     if (userRole !== requiredRole) {
//       return res
//         .status(403)
//         .json({ message: "Acces interzis. Rol necorespunzător." });
//     }

//     next(); // daca rolul e corect, cererea continua
//   };
// };

// module.exports = roleMiddleware;


////

const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    console.log("Utilizatorul autentificat:", req.user);
    const userRole = req.user?.role; // Verifică dacă req.user este definit
    console.log("Rolul utilizatorului:", userRole);
    console.log("Rolul cerut:", requiredRole);

    if (userRole !== requiredRole) {
      console.log("Acces interzis: Rol necorespunzător.");
      return res
        .status(403)
        .json({ message: "Acces interzis. Rol necorespunzător." });
    }

    next(); // Dacă rolul este corect, cererea continuă
  };
};

module.exports = roleMiddleware;
