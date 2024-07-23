const mongoose = require("mongoose");
const User = require('../Models/UserModels')



const mongoDBUrl = "mongodb+srv://fassabri1:QTNgZwGSKiDpudSx@cluster0.gzkbxn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
