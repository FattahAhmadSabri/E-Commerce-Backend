const Cart = require("../Models/Cart");
const Order = require("../Models/Order.model");
const Address = require("../Models/address.model");
const cartService = require("../Service/Cart.service");
const OrderItem = require("../Models/OrderItems");

const createOrder = async (user, shippedAddress) => {
    let address;
    if (shippedAddress._id) {
        address = await Address.findById(shippedAddress._id);
    } else {
        address = new Address(shippedAddress);
        address.user = user._id;
        await address.save();

        if (!user.addresses) {
            user.addresses = [];
        }
        user.addresses.push(address._id);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems = [];

    for (const item of cart.cartItems) {
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice
        });
        const createdOrderItem = await orderItem.save();
        orderItems.push(createdOrderItem);
    }

    const createdOrder = new Order({
        user: user._id,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippedAddress: address._id
    });

    const savedOrder = await createdOrder.save();
    return savedOrder;
};

const placeOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "Placed";
    order.paymentStatus = "Completed";
    return await order.save();
};

const confirmedOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "Confirmed";
    return await order.save();
};

const shippedOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "Shipped";
    return await order.save();
};

const deliveredOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "Delivered";
    return await order.save();
};

const canceledOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    order.orderStatus = "Cancelled";
    return await order.save();
};

const findOrderById = async (orderId) => {
    const order = await Order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippedAddress");
    return order;
};

const userOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "Placed" })
            .populate({ path: "orderItems", populate: { path: "product" } })
            .lean();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};

const allOrders = async () => {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } })
        .lean();
};

const deleteOrder = async (orderId) => {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
    return order;
};

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    canceledOrder,
    findOrderById,
    userOrderHistory,
    allOrders,
    deleteOrder
};
