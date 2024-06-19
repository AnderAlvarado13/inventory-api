const Product = require('../models/product.model');
const User = require('../models/user.model');
const Purchase = require('../models/purchase.model');
const PurchaseItem = require('../models/purchaseItem.model');

// Función para crear un nuevo producto
async function createProduct(lotNumber, name, price, quantity, entryDate) {
  return await Product.create({ lotNumber, name, price, quantity, entryDate });
}

// Función para obtener todos los productos
async function getAllProducts() {
  return await Product.findAll();
}

// Función para actualizar un producto
async function updateProduct(id, lotNumber, name, price, quantity, entryDate) {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  product.lotNumber = lotNumber;
  product.name = name;
  product.price = price;
  product.quantity = quantity;
  product.entryDate = entryDate;

  await product.save();
  return product;
}

// Función para eliminar un producto
async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  await product.destroy();
}

// Función para visualizar compras por clientes
async function getAllPurchases(){
  try {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: PurchaseItem,
          include: {
            model: Product,
            attributes: ['id', 'name', 'price'], // Ajusta los atributos según necesites
          },
          attributes: ['productId', 'quantity', 'price'], // Ajusta los atributos según necesites
        },
        {
          model: User,
          attributes: ['id', 'username'], // Ajusta los atributos según necesites
        }
      ],
      attributes: ['id', 'totalPrice', 'date'], // Ajusta los atributos según necesites
    });

    return purchases.map(purchase => ({
      id: purchase.id,
      date: purchase.date,
      client: {
        id: purchase.User.id,
        username: purchase.User.username,
      },
      products: purchase.PurchaseItems.map(item => ({
        productId: item.productId,
        productName: item.Product.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice: purchase.totalPrice,
    }));
  } catch (error) {
    throw new Error(`Error al obtener todas las compras: ${error.message}`);
  }
};



module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllPurchases,
};
