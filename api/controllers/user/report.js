const OrderService = require('../../services/orderService');

module.exports =
    async function userOrderReport(req, res) {
        try {
            let orderReport = await OrderService.userOrderReport();
            res.json(orderReport);
        } catch (err) {
            console.log(err);
            res.status(404).json({ message: err.message });
        }
    }