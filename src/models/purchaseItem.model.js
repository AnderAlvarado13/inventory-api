const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Product = require('./product.model');
const Purchase = require('./purchase.model');

const PurchaseItem = sequelize.define('PurchaseItem', {
  purchaseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Purchase,
      key: 'id'
    }
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

module.exports = PurchaseItem;