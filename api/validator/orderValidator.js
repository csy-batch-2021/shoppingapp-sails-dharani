
const UserDAO = require("../dao/user.dao");
const ProductDAO = require("../dao/product.dao");
const OrderDAO = require("../dao/order.dao");
class OrderValidator {
    static isValidNumber(input, message) {
        let valid = true;
        if (input == null || input <= 0) {
            // valid = false;
            throw new Error(message);
        }
        // return valid;
    }
    static async validCheck(orderDetails) {
        this.isValidNumber(orderDetails.userId, "Please Enter Valid User ID");
        this.isValidNumber(orderDetails.productId, "Please Enter Valid Product Id");
        this.isValidNumber(orderDetails.qty, "Please Enter Valid Quantity");

    }
    static async isValidId(orderDetails) {
        var userResult = await UserDAO.findOne(orderDetails.userId);
        var productResult = await ProductDAO.findOne(orderDetails.productId);
        if (userResult == null) {
            throw new Error("Please Check UserID");
        } else if (productResult == null) {
            throw new Error("Please Check ProductID");
        }
    }
    static async isValidForDelivery(orderId, status) {
        var result = await OrderDAO.findOne(orderId);
        var statusText = ["ORDERED", "DELIVERED", "CANCELLED"];
        var statusCheck = statusText.includes(status);
        if (!result) {
            throw new Error("Please Entered Valid OrderId");
        } else if (!statusCheck) {
            throw new Error("Please Enter Valid Status");
        } else if (result.status == "DELIVERED") {
            throw new Error("Delivered Product cannot be Delivered");
        } else if (result.status == "CANCELLED") {
            throw new Error("Already Order Product has been Cancelled");
        }
    }
    static async isExistOrderId(orderId) {
        // console.log("orderId", orderId);
        var result = await OrderDAO.findOne(orderId);
        if (!result) {
            throw new Error("Please Entered Valid OrderId");
        } else if (result.status == "DELIVERED") {
            throw new Error("Delivered Product cannot be cancelled");
        } else if (result.status == "CANCELLED") {
            throw new Error("Already Order Product has been Cancelled");
        }
    }
}

module.exports = {
    isValidNumber: OrderValidator.isValidNumber,
    validCheck: OrderValidator.validCheck,
    isValidId: OrderValidator.isValidId,
    isValidForDelivery: OrderValidator.isValidForDelivery,
    isExistOrderId: OrderValidator.isExistOrderId
}