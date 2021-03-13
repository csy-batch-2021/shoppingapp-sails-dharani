
const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
const DAOUtil = require('./dao.util');
class OrderRepository {
    /**
     * to insert the values
     * @param {object} orderDetails
     */
    static async save(orderDetails) {
        return DAOUtil.insert('/orders', orderDetails);
    }
    /**
     * get all details
     */
    static async findAll() {
        return DAOUtil.getView('/orders/_design/orders/_view/order-list-view');
    }
    /**
     * find one data ana update the values 
     * @param {object} orderDetails
     */
    static async findOneAndUpdate(orderDetails) {
        return DAOUtil.findAndUpdate('/orders/' + orderDetails._id + "?rev=" + orderDetails._rev, orderDetails);
    }
    // /**
    //  * 
    //  * @param {*find one order based on id} id 
    //  */
    // static async findOne(id) {
    //     // try {
    //     let promiseObj = new Promise((reject, resolve) => {
    //         DAOUtil.findOne('/orders/' + id).then(result => {
    //             resolve(result);
    //         }, err => {
    //             reject(err);
    //         });
    //     });
    //     console.log('findOne promiseObj', promiseObj);
    //     return promiseObj;
    //     // } catch (err) {
    //     //     throw err;
    //     // }
    // }
    /**
     * find the one values to using id
     * @param {string} id 
     */
    static async findOne(id) {
        try {
            let result = await DAOUtil.findOne('/orders/' + id);
            console.log('order finde one ', result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * cancel the order based on user details
     * @param {object} orderDetails
     */
    static async cancelOrder(orderDetails) {
        return DAOUtil.findAndUpdate('/orders/' + orderDetails._id + "?rev=" + orderDetails._rev, orderDetails);
    }
    /**
      * cancel the order based on user details
      * @param {object} orderDetails
      */
    static async cancelOrderOld(orderDetails) {
        let promiseObj = new Promise((reject, resolve) => {
            DAOUtil.findAndUpdate('/orders/' + orderDetails._id + "?rev=" + orderDetails._rev, orderDetails).then(result => {
                resolve(result);
            }, err => {
                reject(err);
            });
        });
        return promiseObj;
    }
    /**
     * find userId based get the order details
     * @param {string} userId
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
     * get order status report
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