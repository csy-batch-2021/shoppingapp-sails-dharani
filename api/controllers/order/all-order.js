
const OrderService = require('../../services/orderService');

module.exports = async function allOrders(req, res) {
    console.log(req.me);
    try {
        let orders = await OrderService.getAllOrder();
        console.log('orders', orders);
        const allOrdersList = orders.sort(
            (a, b) => b.created_date - a.created_date
        );
        res.json(allOrdersList);
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: err.message });
    }
}