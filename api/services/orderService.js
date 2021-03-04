const OrderDAO = require('../dao/order.dao');
const ProductDAO = require('../dao/product.dao');
const OrderValidator = require('../validator/orderValidator');
const ProductService = require('../services/product.service');
const UserValidator = require('../validator/userValidator');
const OrderRepository = require('../repository/order.dao');
class OrderService {
    // to add a new order
    static async addOrder(orderDetails) {
        try {
            await OrderValidator.validCheck(orderDetails);
            await OrderValidator.isValidId(orderDetails);
            let product = await ProductService.getProductDetails(orderDetails.productId);
            console.log("add order product details", product);
            orderDetails.total_amount = orderDetails.qty * product.price;
            orderDetails.status = 'ORDERED';
            orderDetails.created_date = new Date();
            orderDetails.modified_date = new Date();
            orderDetails.created_by = orderDetails.userId;
            orderDetails.modified_by = orderDetails.userId;
            orderDetails.name = product.name;
            orderDetails.price = product.price;
            orderDetails.user_name = orderDetails.userName;
            // await OrderDAO.save(orderDetails);
            await OrderRepository.save(orderDetails);

            return 'Product Ordered sucessfully';
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    //get all orders
    static async getAllOrder() {
        try {
            // return await OrderDAO.findAll();
            return await OrderRepository.findAll();

        } catch (err) {
            throw new Error('Not able to fetch the orders');
        }
    }
    // to change order status delivered
    static async changeOrderStatus(orderId, userId, status) {
        try {
            let orderDetails = await OrderValidator.isValidForDelivery(orderId, status);
            orderDetails.status = "DELIVERED";
            return await OrderRepository.findOneAndUpdate(orderDetails);
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
    // to cancel order
    static async cancelOrder(orderDetails) {
        try {
            console.log(orderDetails)
            let userId = orderDetails.userId;
            let orderId = orderDetails.orderId;
            // await UserValidator.toCheckValidUserId(userId);
            var orderResult = await OrderValidator.isExistOrderId(orderId);
            orderResult.status = "CANCELLED";
            var result = await OrderRepository.cancelOrder(orderResult);
            return 'Your Amount Has Successfully Refunded To Your Wallet'
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    // to find by order based on user id
    static async getMyOrder(userId) {
        try {
            return await OrderRepository.findMyOrder(userId);
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the orders');
        }
    }
    // to get my order counts
    static async myOrderStatusCount(userId) {
        try {
            return await OrderDAO.myOrdersStatusCount(userId);
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the orders');
        }
    }
    //get User Order Report
    static async userOrderReport() {
        try {
            var result = await OrderDAO.userOrderReport();
            // console.log(result);
            return result;

        } catch (err) {
            throw new Error('Not able to fetch the Report');
        }
    }
    // get Ordered Status Report
    static async orderStatusReport() {
        try {
            // return await OrderDAO.orderStatusReport();
            return await OrderRepository.orderStatusReport();

        } catch (err) {
            throw new Error('Not able to fetch the Report');
        }
    }
}
module.exports = {
    addOrder: OrderService.addOrder,
    getAllOrder: OrderService.getAllOrder,
    changeOrderStatus: OrderService.changeOrderStatus,
    cancelOrder: OrderService.cancelOrder,
    getMyOrder: OrderService.getMyOrder,
    myOrderStatusCount: OrderService.myOrderStatusCount,
    userOrderReport: OrderService.userOrderReport,
    orderStatusReport: OrderService.orderStatusReport
}