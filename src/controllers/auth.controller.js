const authService = require('../services/auth.service');

// Registro de usuario
async function register(req, res) {
  const { username, password, role } = req.body;
  try {
    const user = await authService.registerUser(username, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Login de usuario
async function login(req, res) {
  const { username, password } = req.body;
  try {
    const token = await authService.loginUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
