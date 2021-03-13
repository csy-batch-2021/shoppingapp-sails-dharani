const OrderDAO = require('../dao/order.dao');
const ProductDAO = require('../dao/product.dao');
const OrderValidator = require('../validator/orderValidator');
const ProductService = require('../services/product.service');
const UserValidator = require('../validator/userValidator');
const OrderRepository = require('../repository/order.dao');
class OrderService {
    /**
     * add a new order
     * @param {Object} orderDetails 
     */
    static async addOrderNew(orderDetails) {
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
    /**
     * add a new order
     * @param {Object} orderDetails 
     */
    static async addOrder(orderDetails) {
        try {
            OrderValidator.validCheck(orderDetails).then(success => {
                OrderValidator.isValidIdNew(orderDetails).then(success => {
                    ProductService.getProductDetails(orderDetails.productId).then(product => {
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
                        OrderRepository.save(orderDetails).then(success => {
                            return 'Product Ordered sucessfully';
                        }, err => {
                            throw err;
                        });
                    });
                }, err => {
                    console.log(err);
                });

            }, err => {
                console.log(err);
            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * get all orders
     */
    static async getAllOrder() {
        try {
            // return await OrderDAO.findAll();
            return await OrderRepository.findAll();

        } catch (err) {
            throw new Error('Not able to fetch the orders');
        }
    }

    /**
     * change order status to be ordered into delivered
     * @param {string} orderId 
     * @param {string} userId 
     * @param {string}status 
     */
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
    /**
     * to cancel the order 
     * @param {obejct} orderDetails 
     *  
     */
    static async cancelOrderOld(orderDetails) {
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

    /**
     * to cancel the order using promise 
     * @param {obejct} orderDetails 
     *  
     */
    static async cancelOrder(orderDetails) {
        try {
            let userId = orderDetails.userId;
            let orderId = orderDetails.orderId;
            OrderValidator.isExistOrderId(orderId).then(response => {
                response.status = "CANCELLED";
                OrderRepository.cancelOrder(response).then(response => {
                    return 'Your Amount Has Successfully Refunded To Your Wallet';
                }, err => {
                    console.log('err', err);
                    throw err;
                });
            }, err => {
                console.log('err', err);
                throw err;
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * get myOrder based on userId
     * @param {string} userId 
     */
    static async getMyOrder(userId) {
        try {
            return await OrderRepository.findMyOrder(userId);
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the orders');
        }
    }
    /**
     * count the ordered status based
     * @param {string} userId 
     */
    static async myOrderStatusCount(userId) {
        try {
            return await OrderDAO.myOrdersStatusCount(userId);
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the orders');
        }
    }
    /**
     * user Ordered product report
     */
    static async userOrderReport() {
        try {
            var result = await OrderDAO.userOrderReport();
            // console.log(result);
            return result;

        } catch (err) {
            throw new Error('Not able to fetch the Report');
        }
    }
    /**
     * ordered product based status wise count
     */
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
    addOrderNew: OrderService.addOrderNew,
    getAllOrder: OrderService.getAllOrder,
    changeOrderStatus: OrderService.changeOrderStatus,
    cancelOrder: OrderService.cancelOrder,
    getMyOrder: OrderService.getMyOrder,
    myOrderStatusCount: OrderService.myOrderStatusCount,
    userOrderReport: OrderService.userOrderReport,
    orderStatusReport: OrderService.orderStatusReport
}