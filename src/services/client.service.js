const sequelize = require('../config/db.config');
const Purchase = require('../models/purchase.model');
const PurchaseItem = require('../models/purchaseItem.model');
const Product = require('../models/product.model');

async function createPurchase(userId, items) {
  const transaction = await sequelize.transaction();

  try {
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product || product.quantity < item.quantity) {
        throw new Error(`Producto no disponible o cantidad insuficiente para el producto ID: ${item.productId}`);
      }

      totalPrice += product.price * item.quantity;
    }

    const purchase = await Purchase.create({ userId, totalPrice }, { transaction });

    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      await PurchaseItem.create({
        purchaseId: purchase.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      }, { transaction });

      product.quantity -= item.quantity;
      await product.save({ transaction });
    }

    await transaction.commit();
    return purchase;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

async function getPurchases(userId) {
  return Purchase.findAll({ where: { userId }, include: [PurchaseItem] });
}

async function getPurchaseDetails(purchaseId) {
  return Purchase.findByPk(purchaseId, { include: [PurchaseItem] });
}

async function getPurchaseHistory(userId){
  const purchases = await Purchase.findAll({
    where: { userId },
    include: [
      {
        model: PurchaseItem,
        include: [Product],
      },
    ],
  });

  const history = purchases.map(purchase => ({
    purchaseId: purchase.id,
    date: purchase.createdAt,
    items: purchase.PurchaseItems.map(item => ({
      productId: item.productId,
      productName: item.Product.name,
      quantity: item.quantity,
      price: item.price,
    })),
  }));

  return history;
};

module.exports = {
  createPurchase,
  getPurchases,
  getPurchaseDetails,
  getPurchaseHistory,

};