const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user.model');
const { secretKey } = require('../config/auth.config');

// Función para registrar un nuevo usuario
async function registerUser(username, password, role) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await User.create({ username, password: hashedPassword, role });
}

// Función para realizar el login
async function loginUser(username, password) {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
  return token;
}

module.exports = {
  registerUser,
  loginUser,
};
