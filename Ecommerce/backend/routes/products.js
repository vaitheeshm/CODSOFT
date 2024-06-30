const express = require('express');
const { getProducts, getSingleProducts } = require('../controllers/productControllers');
const router = express.Router();

// Going to receive routes , so GET method(Handler methods)
router.route('/products').get(getProducts)
router.route('/products/:id').get(getSingleProducts)

module.exports = router;