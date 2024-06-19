const app = require('./app');
const { sequelize } = require('./models');

// Sincronizar modelos con la base de datos (opcional)
sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos conectada y sincronizada');
    // Iniciar el servidor
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con la base de datos:', error);
  });