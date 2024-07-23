const CartItem = require("../Models/CartItem.model");
// const { findById } = require("../Models/UserModels");
const userService = require('./User.service')

const updateCartItem = async (userId, cartItemId, cartItemData) => {
    console.log(userId, cartItemId, cartItemData)
    try {
        const item = await CartItem.findById(cartItemId).populate('product');

        if (!item) {
            throw new Error(`Item not found: ${cartItemId}`);
        }

        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice;
            const updatedCartItem = await item.save();
            return updatedCartItem;
        } else {
            throw new Error("Cannot update this cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}




const RemoveCartItem = async (userId, cartItemId) => {
    try {
        const cartItem = await CartItem.findById(cartItemId);
        if (!cartItem) {
            throw new Error(`Cart item not found for ID: ${cartItemId}`);
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            throw new Error(`User not found for ID: ${userId}`);
        }

        if (user._id.toString() === cartItem.userId.toString()) {
            await CartItem.findByIdAndDelete(cartItemId);
            return { message: "Cart item removed successfully" };
        } else {
            throw new Error("Unauthorized: You cannot remove this cart item");
        }
    } catch (error) {
        throw new Error(error.message || error);
    }
};

const findCartItemById= async (cartItemId)=>{
     const cartItem = await findById(cartItemId)
     if(cartItem){
        cartItem
     }else{
        throw new Error(`cart item not found with this id ${cartItemId}`)
     }
}

module.exports = {updateCartItem,RemoveCartItem,findCartItemById}