const OrderService = require('../../services/orderService');
const OrderValidator = require('../../validator/orderValidator');

module.exports = async function myOrders(req, res) {
    console.log(req.query);
    let userId = req.query.userId;
    try {
        OrderValidator.isValidNumber(userId, 'Please Enter Valid User ID');
        let myOrdersResult = await OrderService.getMyOrder(userId);
        // const myOrdersList = myOrdersResult.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
        res.json(myOrdersResult);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}