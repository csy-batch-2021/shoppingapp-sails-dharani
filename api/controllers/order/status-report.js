const OrderService = require('../../services/orderService');

module.exports = async function orderStatusReport(req, res) {
    try {
        let orderStatusResult = await OrderService.orderStatusReport();
        res.json(orderStatusResult);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}