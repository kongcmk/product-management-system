const express = require('express');
const router = express.Router();
const productsControllers = require('../controllers/productsControllers.js');

// Define product-related routes
router.get('/', productsControllers.getAllProducts);
router.get('/id/:Id', productsControllers.getProductById);
router.get('/search', productsControllers.getProductByTitle);
router.post('/', productsControllers.createProduct);
router.put('/id/:Id', productsControllers.updateProduct);
router.delete('/id/:Id', productsControllers.deleteProductById)
//don't forget export module
module.exports = router;
