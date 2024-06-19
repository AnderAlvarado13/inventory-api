const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { secretKey } = require('../config/auth.config');
console.log('Clave secreta:', secretKey);

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
}

// Middleware para verificar el rol de administrador
async function verifyAdmin(req, res, next) {
  try {
    const user = await User.findByPk(req.userId);
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// Middleware para verificar el rol de cliente
async function verifyClient(req, res, next) {
  try {
    const user = await User.findByPk(req.userId);
    if (!user || user.role !== 'client') {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de cliente.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  verifyToken,
  verifyAdmin,
  verifyClient,
};
