const clientService = require('../services/client.service');
const { Purchase, PurchaseItem, Product } = require('../models');

const purchase = async (req, res) => {
  try {
    const userId = req.userId;
    const items = req.body.items;

    const purchase = await clientService.createPurchase(userId, items);
    res.status(200).json({ message: 'Compra realizada con éxito', purchase });
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    res.status(500).json({ 
      message: 'Hubo un error al procesar la compra.', error: error.message
     });
  }
};

const getPurchases = async (req, res) => {
  try {
    const userId = req.userId;
    const purchases = await clientService.getPurchases(userId);
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ 
      message: 'Hubo un error al obtener las compras del cliente', error: error.message
     });
  }
};

const getPurchaseDetails = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await Purchase.findByPk(purchaseId, {
      include: [
        {
          model: PurchaseItem,
          include: {
            model: Product,
            attributes: ['id', 'name', 'price'],
          },
          attributes: ['productId', 'quantity', 'price'],
        },
      ],
      attributes: ['id', 'totalPrice', 'date'],
    });

    if (!purchase) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    // Construir la respuesta con los detalles de la compra
    const purchaseDetails = {
      id: purchase.id,
      date: purchase.date,
      products: purchase.PurchaseItems.map(item => ({
        productId: item.productId,
        productName: item.Product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: purchase.totalPrice,
    };

    res.status(200).json(purchaseDetails);
  } catch (error) {
    console.error('Error al obtener los detalles de la compra:', error);
    res.status(500).json({ message: 'Hubo un error al obtener los detalles de la compra' });
  }
};

const getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const purchaseHistory = await clientService.getPurchaseHistory(userId);
    res.status(200).json(purchaseHistory);
  } catch (error) {
    console.error('Error al obtener el historial de compras:', error.message);
    res.status(500).json({ message: 'Hubo un error al obtener el historial de compras', error: error.message });
  }
};

module.exports = {
  purchase,
  getPurchases,
  getPurchaseDetails,
  getPurchaseHistory,
};