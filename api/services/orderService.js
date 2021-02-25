const OrderDAO = require("../dao/order.dao");
const ProductDAO = require("../dao/product.dao");
const OrderValidator = require("../validator/orderValidator");
const ProductService = require("../services/product.service");
const UserValidator = require("../validator/userValidator");

class OrderService {
    // to add a new order
    static async addOrder(orderDetails) {
        try {
            await OrderValidator.validCheck(orderDetails);
            await OrderValidator.isValidId(orderDetails);
            let product = await ProductService.getProductDetails(orderDetails.productId);

            // console.log("product product", product)
            console.log("orderDetails", orderDetails.qty);

            orderDetails.totalAmount = orderDetails.qty * product.price;
            orderDetails.status = "ORDERED";
            orderDetails.created_date = new Date();
            orderDetails.modified_date = new Date();
            orderDetails.created_by = orderDetails.userId;
            orderDetails.modified_by = orderDetails.userId;
            // await OrderValidator.toCheckWalletBalance(orderDetails);
            await OrderDAO.save(orderDetails);
            return "Product Ordered sucessfully";
        } catch (err) {
            throw err;
        }
    }

    //get all orders
    static async getAllOrder() {
        try {
            let orders = await OrderDAO.findAll();
            return orders;
        } catch (err) {
            throw new Error("Not able to fetch the orders");
        }
    }

    // to change order status delivered
    static async changeOrderStatus(orderId, userId, status) {
        try {
            // await OrderValidator.statusValidCheck(orderId, status);
            await OrderValidator.isValidForDelivery(orderId, status);
            // await OrderValidator.toCheckValidOrderId(orderId);
            var result = await OrderDAO.findOneAndUpdate(orderId, status, userId);
            return result;
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

    // to cancel order
    static async cancelOrder(orderDetails) {
        try {

            let userId = orderDetails.userId;
            let orderId = orderDetails.orderId;
            await UserValidator.toCheckValidUserId(userId);
            // // await OrderValidator.isValidCheck(orderId);
            await OrderValidator.isExistOrderId(orderId);
            var result = await OrderDAO.cancelOrder(orderDetails);
            // await OrderValidator.walletBalanceRefund(orderDetails);
            console.log(result);
            return "Your Amount Has Successfully Refunded To Your Wallet"
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    // to find by order based on user id
    static async getMyOrder(userId) {
        let myOrder = await OrderDAO.findMyOrder(userId);
        return myOrder;
        // console.log(myOrder);
    }

    static async myOrderStatusCount(userId) {
        try {
            let orderValues = await OrderDAO.myOrdersStatusCount(userId);
            return orderValues;
        } catch (err) {
            throw new Error("Not able to fetch the orders");
        }
    }
    static async userOrderReport() {
        try {
            let reportValues = await OrderDAO.userOrderReport();
            // console.log("reportValues", reportValues);
            return reportValues;
        } catch (err) {
            throw new Error("Not able to fetch the Report");
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
    userOrderReport: OrderService.userOrderReport
}