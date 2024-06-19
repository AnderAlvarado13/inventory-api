/**
 * @api {post} /api/admin/products Crear Producto
 * @apiName CreateProduct
 * @apiGroup Admin
 * @apiPermission admin
 *
 * @apiHeader {String} Authorization JWT Token de autenticación.
 *
 * @apiParam {String} lotNumber Número de lote del producto
 * @apiParam {String} name Nombre del producto
 * @apiParam {Number} price Precio del producto
 * @apiParam {Number} quantity Cantidad disponible del producto
 * @apiParam {Date} entryDate Fecha de entrada del producto
 *
 * @apiSuccess (201) {Object} product Producto creado
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 201 OK
 *    {
 *      "id": 1,
 *      "lotNumber": "L001",
 *      "name": "Producto de Ejemplo",
 *      "price": 10.99,
 *      "quantity": 100,
 *      "entryDate": "2024-06-20T12:00:00.000Z"
 *    }
 *
 * @apiError (400) {String} message Mensaje de error si falla la creación del producto
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "Error al crear el producto: Nombre de producto ya existente"
 *    }
 */

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
router.get('/purchases', authMiddleware.verifyAdmin, adminController.getAllPurchases);

module.exports = router;
