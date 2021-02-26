const OrderService = require('../../services/orderService')

module.exports = async function cancelOrder(req, res) {
    let orderDetails = { orderId: req.params.id, userId: req.body.userId }
    console.log('orderDetails', orderDetails);
    try {
        let order = await OrderService.cancelOrder(orderDetails);
        res.json(order);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}