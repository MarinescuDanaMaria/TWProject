// gestioneaza accesul - verif daca cererea HTTP contine un token valid

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // obtine token-ul din antetul auth 

  //////
///console.log("Utilizator autentificat:", req.user);
/////////

  if (!token) { // verif daca token-ul exista 
    return res.status(401).json({ message: "Token-ul nu a fost furnizat." });
  }

  try {  // verif daca e valid token-ul ( sa nu fie fals / expirat )
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // al 2 lea param = cheie secreta 
    // ezxtrage inf codif si le stocheaza in var decoded ( decod token-ul )
    req.user = decoded;  
    next();  // cererea continua daca totul e valid
  } catch (error) {
    return res.status(401).json({ message: "Token invalid." });
  }
};

module.exports = authMiddleware;
