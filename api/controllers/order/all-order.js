
const OrderService = require('../../services/orderService');

module.exports = async function allOrders(req, res) {
    console.log(req.me);
    try {
        let orders = await OrderService.getAllOrder();
        // const allOrdersList = orders.sort((a, b) => b.created_date - a.created_date);
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}