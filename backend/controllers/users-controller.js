// users-controller.js

const uuid = require('uuid'); // Assurez-vous d'avoir la bibliothèque 'uuid'.

let DUMMY_USERS = [
  // Ceci est un tableau d'essai pour simuler une base de données d'utilisateurs
  {
    id: 'u1',
    name: 'Utilisateur Test',
    email: 'test@example.com',
    password: 'testers',
    image: 'path/to/image.jpg',
    role: 'normal',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = DUMMY_USERS.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json({ message: 'Utilisateur non trouvé.' });
  } else {
    res.json({ user });
  }
};

const registerUser = (req, res, next) => {
  const { name, email, password, image, role } = req.body;
  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    res.status(422).json({ message: 'Cet email est déjà utilisé.' });
    return;
  }
  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password, // À noter : En pratique, le mot de passe devrait être encrypté avant d'être stocké.
    image,
    role,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!identifiedUser) {
    res
      .status(401)
      .json({ message: 'Identification échouée, vérifiez vos identifiants.' });
  } else {
    res.json({ message: 'Connexion réussie.' });
  }
};

const updateUserById = (req, res, next) => {
  const userId = req.params.uid;
  const { name, email, password, image, role } = req.body;
  const userIndex = DUMMY_USERS.findIndex((u) => u.id === userId);
  const updatedUser = {
    ...DUMMY_USERS[userIndex],
    name,
    email,
    password,
    image,
    role,
  };
  DUMMY_USERS[userIndex] = updatedUser;
  res.status(200).json({ user: updatedUser });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.registerUser = registerUser;
exports.login = login;
exports.updateUserById = updateUserById;
