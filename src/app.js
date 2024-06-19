const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const clientRoutes = require('./routes/client.routes');
const { errorHandler } = require('./middleware/error.middleware');

// Configuración de bodyParser para parsear solicitudes JSON
app.use(bodyParser.json());

// Configuración de Morgan para logging de solicitudes HTTP
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);

// Middleware para manejar errores
app.use(errorHandler);

module.exports = app;
