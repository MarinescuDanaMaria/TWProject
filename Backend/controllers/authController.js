// controller => gestioneaza logica pt sign in si login 

const bcrypt = require("bcryptjs"); // pt criptare parole 
// const User = require("../models/User");
//const Role = require("../models/role");
const { User } = require("../models");
const { Role } = require("../models");


const jwt = require("jsonwebtoken"); // pt generare token-uri autentificare 

async function signIn(req, res) 
{
  const // extrage datele din cererea HTTP printr-o cerere POST 
  {
    firstName,
    lastName,
    email,
    birthDate,
    password,
    retryPassword,
    role,
  } = req.body;

  if (password !== retryPassword) // verif daca parolele coincid
  {
    return res.status(400).json({ message: "Parolele nu se potrivesc!" });
  }

  try
   {

    // cauta rolul in baza de date 
    const foundRole = await Role.findOne({
      where: { name: role },
    });
    console.log(foundRole);
    if (!foundRole) {
      return res.status(400).json({ message: "Rolul nu a fost găsit!" });
    }

    /////////

    console.log("Body primit:", req.body);
console.log("Rol găsit:", foundRole);

/////////////

    const hashedPassword = await bcrypt.hash(password, 10); // cripteaza parola 

    const user = await User.create({ // creeaza utilizatorul in baza de date 
      first_name: firstName,
      last_name: lastName,
      datebirth: birthDate,
      email: email,
      password: hashedPassword,
      role_id: foundRole.id,
    });

    return res.status(201).json({
      message: "Utilizator creat cu succes!",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "A apărut o eroare la salvarea utilizatorului!" });
  }
}

async function logIn(req, res) { // extrage datele din cererea HTTP printr-o cerere POST 
  const { email, password } = req.body;

  try { 
    ////
    console.log("Model User:", User);
//
    
    // cauta utilizatorul in baza de date 
    const user = await User.findOne({
      where: { email }, // cauta dupa email 
      include: { // include rolul asociat ( denumire ) , in sign in avem doar id 
        model: Role,
        as: "role",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Email-ul nu este înregistrat!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // compara parola trimisa cu cea criptata in bd 
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Parola este incorectă!" });
    }

    const token = jwt.sign( // genereaza un token JWT care contine id,email,rol
      { userId: user.id, email: user.email, role: user.role.name },
      process.env.JWT_SECRET // fol cheia privata din variabila de mediu jwt_secret 
    );
    // bazat pe acest token, unde verif autenticitatea id,email,rol , se garanteaza accesul sau nu 

    res.status(200).json({ // returneaza tokenul si datele utilizatorului
      message: "Autentificare reușită!",
      token,
      user: {
        id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Eroare la autentificare:", error);
    res.status(500).json({ message: "Eroare la autentificare!" });
  }
}

module.exports = { signIn, logIn }; // exporta functiile 
