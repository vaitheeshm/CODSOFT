// Import DB model
const productmodel = require('../models/productsmodel')

// writing controllers in express
// created GET products API - API/v1/products
exports.getProducts = async (req, res, next) => {

    const Query =req.query.keyword?{ name: {
        $regex: req.query.keyword,
        $options: 'i'
    }}:{}

    const products = await productmodel.find(Query);

    // method name - getProducts , next - middleware
    res.json({
        success: true,
        products
    })
}

// created GET products API - API/v1/product/:id
exports.getSingleProducts = async (req, res, next) => {
    try {
        const Products = await productmodel.findById(req.params.id)
        res.json({
            success: true,
            Products
        })
    }catch (error){
        res.status(404).json({
            success: false,
            message:'URL not found'
        })
    }
}