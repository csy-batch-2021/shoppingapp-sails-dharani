const UserValidator = require("../../validator/userValidator");
const OrderService = require("../../services/orderService");

module.exports = async function myOrdersCount(req, res) {
    let userId = req.query.userId;
    try {
        UserValidator.toCheckValidUserId(userId)
        // console.log("userId try block");
        let myOrders = await OrderService.myOrderStatusCount(userId);
        // const myOrdersList = myOrders.sort(
        //   (a, b) => b.created_date - a.created_date
        // );
        // console.table(myOrders);
        res.json(myOrders);
    } catch (err) {
        // console.log(err.message);
        res.status(404).json({ message: err.message });
    }
}