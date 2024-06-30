const express = require('express');
const { createOrders } = require('../controllers/ordersControllers');
const router = express.Router();

// Going to receive routes , so POST method(Handler methods)
router.route('/orders').post(createOrders)

module.exports = router;