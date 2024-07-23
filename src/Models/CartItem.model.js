const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },
    size: {
        type: String
    },
    color: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;