const express = require('express');
const app = express();

// Importing DB object
const connectdatabase = require('./config/connectDatabase.js')

// CORS object
const cors = require('cors');

// Import Path lib
const path = require('path')

// Access environment files
const dotenv = require('dotenv')
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') })

// running database
connectdatabase();

// importing routes
const products = require('./routes/products')
const orders = require('./routes/orders');
const connectDatabase = require('./config/connectDatabase');

app.use(express.json())
app.use(cors())
// base url
app.use('/api/v1/', products)
app.use('/api/v1/', orders)



// Ensure the port is running or not
app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT} in ${process.env.NODE_ENV}`)
})