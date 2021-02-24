const OrderService = require("../../services/orderService")

module.exports = async function cancelOrder(req, res) {
    // let orderId = req.body.orderId;
    // console.log(req.params);
    // console.log(req.body);
    let orderId = req.params.id;
    let userId = req.body.userId;
    let orderDetails = { orderId: req.params.id, userId: req.body.userId }

    try {
        let order = await OrderService.cancelOrder(orderDetails);
        res.json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}