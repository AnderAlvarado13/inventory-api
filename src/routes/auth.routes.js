/**
 * @api {post} /api/auth/register Registro de Usuario
 * @apiName RegisterUser
 * @apiGroup Auth
 *
 * @apiParam {String} username Nombre de usuario
 * @apiParam {String} password Contraseña
 * @apiParam {String} role Rol del usuario ('admin' o 'client')
 *
 * @apiSuccess (201) {Object} user Usuario registrado
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 201 OK
 *    {
 *      "id": 1,
 *      "username": "usuarioejemplo",
 *      "role": "client"
 *    }
 *
 * @apiError (400) {String} message Mensaje de error si falla el registro
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 400 Bad Request
 *    {
 *      "message": "Error al registrar usuario: El nombre de usuario ya está en uso"
 *    }
 */

/**
 * @api {post} /api/auth/login Login de Usuario
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiParam {String} username Nombre de usuario
 * @apiParam {String} password Contraseña
 *
 * @apiSuccess (200) {String} token Token de autenticación JWT
 * @apiSuccessExample {json} Respuesta de Ejemplo:
 *    HTTP/1.1 200 OK
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoibWFoZXN0ZXIiLCJyb2xlIjoiYWRtaW4ifQ.tLW2iGnZVvN7FsXp0CG65tKz3rQkLRJ9sGxPdZ1X6hw"
 *    }
 *
 * @apiError (401) {String} message Mensaje de error si falla el inicio de sesión
 * @apiErrorExample {json} Respuesta de Error:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "message": "Credenciales inválidas"
 *    }
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
