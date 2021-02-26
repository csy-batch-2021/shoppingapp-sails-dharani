const OrderService = require("../../services/orderService");
const OrderValidator = require("../../validator/orderValidator")
module.exports = async function myOrders(req, res) {
    let userId = req.query.userId;
    try {
        OrderValidator.isValidNumber(userId, "Please Enter Valid User ID");
        let myOrders = await OrderService.getMyOrder(userId);
        const myOrdersList = myOrders.sort(
            (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );

        res.json(myOrdersList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}