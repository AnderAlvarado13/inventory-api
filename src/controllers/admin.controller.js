const adminService = require('../services/admin.service');

// Crear un nuevo producto
async function createProduct(req, res) {
  const { lotNumber, name, price, quantity, entryDate } = req.body;
  try {
    const product = await adminService.createProduct(lotNumber, name, price, quantity, entryDate);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Obtener todos los productos
async function getAllProducts(req, res) {
  try {
    const products = await adminService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Actualizar un producto
async function updateProduct(req, res) {
  const productId = req.params.id;
  const { lotNumber, name, price, quantity, entryDate } = req.body;
  try {
    const product = await adminService.updateProduct(productId, lotNumber, name, price, quantity, entryDate);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Eliminar un producto
async function deleteProduct(req, res) {
  const productId = req.params.id;
  try {
    await adminService.deleteProduct(productId);
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Obtener compras por cliente
async function getAllPurchases(req, res){
  try {
    const allPurchases = await adminService.getAllPurchases();
    res.status(200).json(allPurchases);
  } catch (error) {
    console.error('Error al obtener todas las compras:', error);
    res.status(500).json({ message: 'Hubo un error al obtener todas las compras realizadas por los clientes' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getAllPurchases,
};
