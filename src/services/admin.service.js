const Product = require('../models/product.model');

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

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
