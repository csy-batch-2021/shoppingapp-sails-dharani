const OrderService = require("../../services/orderService")

module.exports = async function cancelOrder(req, res) {
    let orderId = req.body.orderId;

    try {
        let order = await OrderService.cancelOrder(req.body);
        res.json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}