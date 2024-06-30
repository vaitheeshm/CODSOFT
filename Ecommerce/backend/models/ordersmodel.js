const mongoose = require('mongoose');

const ordersSchema =new mongoose.Schema({
    cartItems: Array,
    totalAmt: String,
    status: String,
    createdAt: Date
})

const ordersModel = mongoose.model('orders',ordersSchema);

module.exports = ordersModel;