const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then( (con) => {
        console.log("Mongoose is connected on host:"+con.connection.host)
    })
};

module.exports = connectDatabase;