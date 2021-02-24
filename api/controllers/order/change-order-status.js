const OrderService = require("../../services/orderService");
module.exports = async function changOrderStatus(req, res) {
    console.log(req.body);

    let orderId = req.body.orderId;
    let userId = req.body.loggedInUserId;
    let status = req.body.status;
    try {
        let order = await OrderService.changeOrderStatus(orderId, userId, status);
        res.json(order);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}
