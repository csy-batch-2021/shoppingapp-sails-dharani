const OrderService = require("../../services/orderService");

module.exports = async function orderStatusReport(req, res) {
    try {
        let orderStatusResult = await OrderService.orderStatusReport();
        res.json(orderStatusResult);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}