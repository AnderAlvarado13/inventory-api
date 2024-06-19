const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware para verificar el token
router.use(authMiddleware.verifyToken);

// Rutas protegidas para administradores
router.post('/products', authMiddleware.verifyAdmin, adminController.createProduct);
router.get('/products', adminController.getAllProducts);
router.put('/products/:id', authMiddleware.verifyAdmin, adminController.updateProduct);
router.delete('/products/:id', authMiddleware.verifyAdmin, adminController.deleteProduct);

module.exports = router;
