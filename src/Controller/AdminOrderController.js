const OrderService = require("../Service/OrderService");

const getAllOrder = async (req, res) => {
    try {
        const orders = await OrderService.getAllOrder();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const confirmOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.confirmOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const shippedOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.shippedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deliverOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.deliverOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const cancelledOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.cancelledOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        const orders = await OrderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = { getAllOrder, confirmOrder, shippedOrder, deliverOrder, cancelledOrder, deleteOrder };
