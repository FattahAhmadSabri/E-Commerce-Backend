const mongoose = require("mongoose");
const User = require('../Models/UserModels')
require('dotenv').config();

const mongoDBUrl = process.env.MONGODB_URL;





const connectDB = async () => {
    try {
        await mongoose.connect(mongoDBUrl, {
        });
        
        console.log("DB is connected");
    } catch (error) {
        console.error("DB connection failed:", error);
       
    }
};

module.exports = { connectDB };
