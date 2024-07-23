const express = require('express');
const router = express.Router();
const AdminOrderController = require('../Controller/AdminOrderController');
const {authenticate} = require('../MiddleWare/Authenticate');

router.get("/", authenticate, AdminOrderController.getAllOrder);
router.put("/:orderId/confirmed", authenticate, AdminOrderController.confirmOrder);
router.put("/:orderId/ship", authenticate, AdminOrderController.shippedOrder);
router.put("/:orderId/deliver", authenticate, AdminOrderController.deliverOrder);
router.put("/:orderId/cancel", authenticate, AdminOrderController.cancelledOrder);
router.delete("/:orderId/delete", authenticate, AdminOrderController.deleteOrder);

module.exports = router;
