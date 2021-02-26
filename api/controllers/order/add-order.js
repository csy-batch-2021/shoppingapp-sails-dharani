const OrderService = require('../../services/orderService');

module.exports = async function (req, res) {
    try {
        let orderDetails = req.body;
        console.log('orderDetails', orderDetails);
        let orderedProduct = await OrderService.addOrder(orderDetails);
        res.json(orderedProduct);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }

}