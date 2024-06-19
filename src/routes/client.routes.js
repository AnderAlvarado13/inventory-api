/**
 * @api {post} /api/client/purchase Realizar Compra
 * @apiName PurchaseProduct
 * @apiGroup Client
 * @apiPermission client
 *
 * @apiHeader {String} Authorization JWT Token de autenticación.
 *
 * @apiParam {Object[]} items Productos a comprar
 * @apiParam {Number} items.productId ID del producto a comprar
 * @apiParam {Number} items.quantity Cantidad del producto a comprar
 *
 * @apiSuccess (201) {Object} purchase Detalles de la compra realizada
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 201 OK
 *    {
 *      "id": 1,
 *      "userId": 1,
 *      "totalPrice": 50.95,
 *      "date": "2024-06-20T12:00:00.000Z",
 *      "PurchaseItems": [
 *        {
 *          "id": 1,
 *          "purchaseId": 1,
 *          "productId": 101,
 *          "quantity": 3,
 *          "price": 15.99,
 *          "Product": {
 *            "id": 101,
 *            "name": "Producto Ejemplo"
 *          }
 *        }
 *      ]
 *    }
 *
 * @apiError (400) {String} message Mensaje de error si falla la compra
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "Error al realizar la compra: Producto no disponible"
 *    }
 */

/**
 * @api {get} /api/client/purchases Obtener Compras del Cliente
 * @apiName GetPurchases
 * @apiGroup Client
 * @apiPermission client
 *
 * @apiHeader {String} Authorization JWT Token de autenticación.
 *
 * @apiSuccess (200) {Object[]} purchases Lista de compras del cliente
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "purchaseId": 1,
 *        "date": "2024-06-20T12:00:00.000Z",
 *        "items": [
 *          {
 *            "productId": 101,
 *            "productName": "Producto Ejemplo",
 *            "quantity": 3,
 *            "price": 15.99
 *          }
 *        ]
 *      }
 *    ]
 *
 * @apiError (401) {String} message Mensaje de error si falla la autenticación
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "message": "Acceso denegado. Token no proporcionado."
 *    }
 */

/**
 * @api {get} /api/client/purchases/:purchaseId Obtener Detalles de Compra
 * @apiName GetPurchaseDetails
 * @apiGroup Client
 * @apiPermission client
 *
 * @apiHeader {String} Authorization JWT Token de autenticación.
 *
 * @apiParam {Number} purchaseId ID de la compra
 *
 * @apiSuccess (200) {Object} purchase Detalles de la compra
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "userId": 1,
 *      "totalPrice": 50.95,
 *      "date": "2024-06-20T12:00:00.000Z",
 *      "PurchaseItems": [
 *        {
 *          "id": 1,
 *          "purchaseId": 1,
 *          "productId": 101,
 *          "quantity": 3,
 *          "price": 15.99,
 *          "Product": {
 *            "id": 101,
 *            "name": "Producto Ejemplo"
 *          }
 *        }
 *      ]
 *    }
 *
 * @apiError (401) {String} message Mensaje de error si falla la autenticación
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "message": "Acceso denegado. Token no proporcionado."
 *    }
 */

/**
 * @api {get} /api/client/purchase-history Obtener Historial de Compras del Cliente
 * @apiName GetPurchaseHistory
 * @apiGroup Client
 * @apiPermission client
 *
 * @apiHeader {String} Authorization JWT Token de autenticación.
 *
 * @apiSuccess (200) {Object[]} history Historial de compras del cliente
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "purchaseId": 1,
 *        "date": "2024-06-20T12:00:00.000Z",
 *        "items": [
 *          {
 *            "productId": 101,
 *            "productName": "Producto Ejemplo",
 *            "quantity": 3,
 *            "price": 15.99
 *          }
 *        ]
 *      }
 *    ]
 *
 * @apiError (401) {String} message Mensaje de error si falla la autenticación
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "message": "Acceso denegado. Token no proporcionado."
 *    }
 */

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Middleware para verificar el token
router.use(authMiddleware.verifyToken);

// Middleware para verificar el rol de cliente
router.use(authMiddleware.verifyClient);

// Rutas protegidas para clientes
router.post('/purchase', clientController.purchase);
router.get('/purchases', clientController.getPurchases);
router.get('/purchases/:purchaseId', clientController.getPurchaseDetails);
router.get('/purchase-history', clientController.getPurchaseHistory);

module.exports = router;
