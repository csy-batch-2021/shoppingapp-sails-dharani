
const OrderService = require("../../services/orderService");
module.exports = async function allOrders(req, res) {
    try {
        let orders = await OrderService.getAllOrder();
        const allOrdersList = orders.sort(
            (a, b) => b.created_date - a.created_date
        );

        res.json(allOrdersList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}