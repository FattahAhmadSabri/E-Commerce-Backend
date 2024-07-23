const Cart = require('../Models/Cart');
const CartItem = require('../Models/CartItem.model');
const Product = require('../Models/Product.model');


async function createCart(userId) {
    try {
        const cart = new Cart({ user: userId });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
}

const findUserCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate('cartItems');
        if (!cart) {
            throw new Error("Cart not found");
        }

        const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price * cartItem.quantity;
            totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItem = totalItem;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.discount = totalPrice - totalDiscountedPrice;

        await cart.save();

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
}

const addCartItem = async (userId, reqBody) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await Product.findById(reqBody.productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const query = {
            cart: cart._id,
            product: product._id,
            userId: userId
        };

        if (reqBody.size) {
            query.size = reqBody.size;
        }

        if (reqBody.color) {
            query.color = reqBody.color;
        }

        let cartItem = await CartItem.findOne(query);

        if (!cartItem) {
            cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                userId: userId,
                quantity: 1,
                price: product.price,
                size: reqBody.size,
                color: reqBody.color,
                discountedPrice: product.discountedPrice
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem._id);
        } else {
            cartItem.quantity += 1;
            await cartItem.save();
        }

        await cart.save();
        return "Item added to cart";
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createCart, findUserCart, addCartItem };

