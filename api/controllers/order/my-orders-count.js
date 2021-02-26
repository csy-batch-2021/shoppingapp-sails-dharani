const UserValidator = require('../../validator/userValidator');
const OrderService = require('../../services/orderService');

module.exports = async function myOrdersCount(req, res) {
    console.log(req.query);
    let userId = req.query.userId;
    try {
        UserValidator.toCheckValidUserId(userId)
        let myOrders = await OrderService.myOrderStatusCount(userId);
        res.json(myOrders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}