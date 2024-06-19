const Sequelize = require('sequelize');

const sequelize = new Sequelize('inventory_db', 'anderson', '123456.', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;