const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");

async function signIn(req, res) {
  const {
    firstName,
    lastName,
    email,
    birthDate,
    password,
    retryPassword,
    role,
  } = req.body;

  if (password !== retryPassword) {
    return res.status(400).json({ message: "Parolele nu se potrivesc!" });
  }

  try {
    const foundRole = await Role.findOne({
      where: { name: role },
    });
    console.log(foundRole);
    if (!foundRole) {
      return res.status(400).json({ message: "Rolul nu a fost găsit!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
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

async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Email-ul nu este înregistrat!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Parola este incorectă!" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, 
    );

    res.status(200).json({
      message: "Autentificare reușită!",
      token,
      user: { id: user.id, name: `${user.first_name} ${user.last_name}`, email: user.email } 
    });
  } catch (error) {
    console.error("Eroare la autentificare:", error);
    res.status(500).json({ message: "Eroare la autentificare!" });
  }
}

module.exports = { signIn, logIn };
