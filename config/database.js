const mongoose = require('mongoose');
require('dotenv').config();


//conexion a mongoDb con mongoose
const mongooseConnect = () => {
    mongoose.connect(process.env.DATABASE_REA);
}

module.exports = mongooseConnect;