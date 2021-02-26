const OrderService = require("../../services/orderService");

module.exports = async function orderStatusReport(req, res) {
    try {
        let orderStatusReport = await OrderService.orderStatusReport();
        res.json(orderStatusReport);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}