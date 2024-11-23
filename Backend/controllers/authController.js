const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Role = require('../models/Role');  

async function signIn(req, res) {
    console.log('da');
  const { firstName, lastName, birthDate, password, retryPassword, role } = req.body;

  console.log('here');

  if (password !== retryPassword) {
    return res.status(400).json({ message: "Parolele nu se potrivesc!" });
  }

  try {
    const foundRole = await Role.findOne({
      where: { name: role }  
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
        password: hashedPassword,
        role_id: foundRole.id, 
    });


    return res.status(201).json({
      message: "Utilizator creat cu succes!",

    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "A apărut o eroare la salvarea utilizatorului!" });
  }
}

module.exports = { signIn };
