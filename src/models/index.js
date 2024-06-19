const sequelize = require('../config/db.config');
const User = require('./user.model');
const Product = require('./product.model');
const Purchase = require('./purchase.model');
const PurchaseItem = require('./purchaseItem.model');

// Definir asociaciones
User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

Purchase.hasMany(PurchaseItem, { foreignKey: 'purchaseId' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId' });

Product.hasMany(PurchaseItem, { foreignKey: 'productId' });
PurchaseItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  Product,
  Purchase,
  PurchaseItem,
};
