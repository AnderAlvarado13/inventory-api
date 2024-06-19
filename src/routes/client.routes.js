const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware para verificar el rol de cliente
router.use(authMiddleware.verifyClient);

// Rutas protegidas para clientes
router.post('/purchase', clientController.purchase);
router.get('/purchases', clientController.getPurchases);
router.get('/purchases/:purchaseId', clientController.getPurchaseDetails);

module.exports = router;
