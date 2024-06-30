// Import DB model
const ordersmodel = require('../models/ordersmodel')
const productmodel = require('../models/productsmodel')

// Request handler
exports.createOrders = async (req, res, next) => {
    // console.log(req.body,'DATA')
    const cartitems = req.body;

    // Reduce(callback,init)
    const amount = Number(cartitems.reduce((acc, item) => (acc + item.product.price * item.Qty), 0)).toFixed(2);
    const status = "pending"
    console.log(amount, 'AMOUNT')

    const order = await ordersmodel.create({ cartItems: cartitems, totalAmt: amount, status: status })


    // Updating product stock
    cartitems.forEach(async (item) => {
        const product = await productmodel.findByID(item.product._id);
        product.stock = product.stock - item.count;
        await product.save();
    })



    // method name - getOrders , next - middleware
    res.json({
        success: true,
        order
    })
}
