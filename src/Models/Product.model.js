const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    discountedPrice: {
        type: Number
    },
    discountPersent: {
        type: Number
    },
    quantity: {
        type: Number
    },
    brand: {
        type: String
    },
    color: {
        type: String, // Updated to match the provided data
        required: true
    },
    sizes: [sizeSchema], // Updated to use the sizeSchema
    imageUrl: {
        type: String
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratings"
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews"
    }],
    numRatings: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    createdAt: {
        type: Date,
        default: Date.now // Updated to use default instead of required
    }
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
