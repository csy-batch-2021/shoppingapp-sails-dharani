
const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
class OrderRepository {
    // add new order
    static async  save(orderDetails) {
        try {
            let result = await axios.request({
                url: "/orders",
                method: "post",
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: orderDetails
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    // find all orders
    static async findAll() {
        try {
            let response = await axios.request({
                url: '/orders/_design/orders/_view/order-list-view',
                method: 'get',
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: null,
            });
            let data = response.data.rows;
            let orderList = data.map(obj => obj.value);
            return orderList;

        } catch (err) {
            throw err;
        }
    }
    // find one order and update status
    static async findOneAndUpdate(orderDetails) {
        try {
            let response = await axios.request({
                url: '/orders/' + orderDetails._id + "?rev=" + orderDetails._rev,
                method: 'put',
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: orderDetails,
            });
            return response.data;
        } catch (err) {
            console.log("error", err);
            throw err;
        }

    }
    // find one order
    static async findOne(id) {
        let response = await axios.request({
            url: '/orders/' + id,
            method: 'get',
            baseURL: DB_URL,
            auth: {
                username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                password: '53fcbf5faa893817605b85afaf7af46f',
            },
            data: null
        });
        let myOrder = response.data;
        return myOrder;
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
    // cancel the order
    static async cancelOrder(orderDetails) {
        orderDetails.status = "CANCELLED";
        console.log("Cancelorder details", orderDetails);

        try {
            let response = await axios.request({
                url: '/orders/' + orderDetails._id + "?rev=" + orderDetails._rev,
                method: 'put',
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: orderDetails,
            });
            return response.data;
        } catch (err) {
            console.log("error", err);
            throw err;
            // throw new Error('Please Enter Valid  User Id');
        }

    }
    //get my order
    static async findMyOrder(userId) {
        let requestedData = {
            selector: {
                userId: parseInt(userId)
            }
        };
        let response = await axios.request({
            url: '/orders/_find',
            method: 'post',
            baseURL: DB_URL,
            auth: {
                username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                password: '53fcbf5faa893817605b85afaf7af46f',
            },
            data: requestedData
        });
        let myOrderList = response.data.docs;
        return myOrderList;
    }
    // get my orders status count
    static async myOrdersStatusCount(userId) {

    }
    // get user ordered report
    static async userOrderReport() {

    }
    //get all ordered status count
    static async orderStatusReport() {
        try {
            let response = await axios.request({
                url: 'orders/_design/orders-status/_view/status-count?group_level=1',
                method: 'get',
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: null,
            });
            let data = response.data.rows;
            return data;

        } catch (err) {
            throw err;
        }
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