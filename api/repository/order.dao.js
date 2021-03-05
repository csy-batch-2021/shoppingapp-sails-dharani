
const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
const DAOUtil = require('./dao.util');
class OrderRepository {
    /**
     * 
     * @param {*to add new order based on orderDetails} orderDetails 
     */
    static async  save(orderDetails) {
        return DAOUtil.insert('/orders', orderDetails);
    }
    /**
     * get all orders details
     */
    static async findAll() {
        return DAOUtil.getView('/orders/_design/orders/_view/order-list-view');
    }

    /**
     * 
     * @param {*find one order and update status} orderDetails 
     */
    static async findOneAndUpdate(orderDetails) {
        return DAOUtil.findAndUpdate('/orders/' + orderDetails._id + "?rev=" + orderDetails._rev, orderDetails);
    }
    /**
     * 
     * @param {*find one order based on id} id 
     */
    static async findOne(id) {
        return DAOUtil.findOne('/orders/' + id);
    }
    // find product id is or not
    static async findProductId(productId) {

    }
    /**
     * Check if product is ordered in orders table
     * @param {*} productId 
     */
    static async isProductOrdered(productId) {

    }
    /**
     * 
     * @param {*cancel the order} orderDetails 
     */
    static async cancelOrder(orderDetails) {
        return DAOUtil.findAndUpdate('/orders/' + orderDetails._id + "?rev=" + orderDetails._rev, orderDetails);
    }
    /**
     * 
     * @param {*get userId based user orders} userId 
     */
    static async findMyOrder(userId) {
        let requestedData = {
            selector: {
                userId: parseInt(userId)
            }
        };
        return DAOUtil.findBySubArray('/orders/_find', requestedData);
    }
    // get my orders status count
    static async myOrdersStatusCount(userId) {

    }
    // get user ordered report
    static async userOrderReport() {

    }
    /**
     * count ordered count based on status
     */
    static async orderStatusReport() {
        return DAOUtil.report('orders/_design/orders-status/_view/status-count?group_level=1');
    }
}
module.exports = {
    save: OrderRepository.save,
    findAll: OrderRepository.findAll,
    findOneAndUpdate: OrderRepository.findOneAndUpdate,
    findOne: OrderRepository.findOne,
    cancelOrder: OrderRepository.cancelOrder,
    findMyOrder: OrderRepository.findMyOrder,
    // myOrdersStatusCount: OrderDAO.myOrdersStatusCount,
    // findProductId: OrderDAO.findProductId,
    // isProductOrdered: OrderDAO.isProductOrdered,
    // userOrderReport: OrderDAO.userOrderReport,
    orderStatusReport: OrderRepository.orderStatusReport
}