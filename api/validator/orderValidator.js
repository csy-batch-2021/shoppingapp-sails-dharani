
const UserDAO = require('../dao/user.dao');
const ProductDAO = require('../dao/product.dao');
const OrderDAO = require('../dao/order.dao');
const ProductRepository = require('../repository/product.dao');
const OrderRepository = require('../repository/order.dao');
class OrderValidator {
    /**
     * to check is valid number or not
     * @param {string} input 
     * @param {string} message 
     */
    static isValidNumber(input, message) {
        if (input === null || input <= 0) {
            throw new Error(message);
        }
    }
    /**
     * valid check 
     * @param {object} orderDetails 
     */
    static async validCheck(orderDetails) {
        this.isValidNumber(orderDetails.userId, 'Please Enter Valid User ID');
        this.isValidNumber(orderDetails.productId, 'Please Enter Valid Product Id');
        this.isValidNumber(orderDetails.qty, 'Please Enter Valid Quantity');
    }
    /**
     * to check is valid or not 
     * @param {object} orderDetails 
     */
    static async isValidId(orderDetails) {
        var userResult = await UserDAO.findOne(orderDetails.userId);
        // var productResult = await ProductDAO.findOne(orderDetails.productId);
        var productResult = await ProductRepository.findOne(orderDetails.productId);

        if (userResult === null) {
            throw new Error('Please Check UserID');
        } else if (productResult === null) {
            throw new Error('Please Check ProductID');
        }
    }
    /**
        * to check is valid or not 
        * @param {object} orderDetails 
        */
    static async isValidIdNew(orderDetails) {
        let promiseObj = new Promise((resolve, reject) => {
            var userResult = UserDAO.findOne(orderDetails.userId);
            // var productResult = await ProductDAO.findOne(orderDetails.productId);
            var productResult = ProductRepository.findOne(orderDetails.productId);

            if (userResult === null) {
                reject('Please Check UserID');
            } else if (productResult === null) {
                reject('Please Check ProductID');
            } else {
                resolve();
            }
        });
        return promiseObj;
    }
    /**
     * to check is valid for change delivered status
     * @param {string} orderId 
     * @param {string} status 
     */
    static async isValidForDelivery(orderId, status) {
        var result = await OrderRepository.findOne(orderId);
        var statusText = ['ORDERED', 'DELIVERED', 'CANCELLED'];
        var statusCheck = statusText.includes(status);
        if (!result) {
            throw new Error('Please Entered Valid OrderId');
        } else if (!statusCheck) {
            throw new Error('Please Enter Valid Status');
        } else if (result.status === 'DELIVERED') {
            throw new Error('Delivered Product cannot be Delivered');
        } else if (result.status === 'CANCELLED') {
            throw new Error('Already Order Product has been Cancelled');
        }
        return result;
    }
    /**
     * to check orderId based is valid order id and is status is Ordered
     * @param {string} orderId 
     */
    static async isExistOrderIdOld(orderId) {
        // var result = await OrderDAO.findOne(orderId);
        var result = await OrderRepository.findOne(orderId);

        if (!result) {
            throw new Error('Please Entered Valid OrderId');
        } else if (result.status === 'DELIVERED') {
            throw new Error('Delivered Product cannot be cancelled');
        } else if (result.status === 'CANCELLED') {
            throw new Error('Already Order Product has been Cancelled');
        }
        return result;
    }
    /**
   * to check orderId based is valid order id and is status is Ordered
   * @param {string} orderId 
   */
    static async isExistOrderId(orderId) {
        let promiseObj = new Promise((resolve, reject) => {
            OrderRepository.findOne(orderId).then(result => {
                // await OrderRepository.findOne(orderId);
                console.log('isExistOrderId', result);
                if (!result) {
                    reject('Please Entered Valid OrderId');
                } else if (result.status === 'DELIVERED') {
                    reject('Delivered Product cannot be cancelled');
                } else if (result.status === 'CANCELLED') {
                    reject('Already Order Product has been Cancelled');
                }
                console.log('else', result);
                resolve(result);
            });
        });
        console.log('promiseObj', promiseObj)
        return promiseObj;
    }
}
module.exports = {
    isValidNumber: OrderValidator.isValidNumber,
    validCheck: OrderValidator.validCheck,
    isValidId: OrderValidator.isValidId,
    isValidForDelivery: OrderValidator.isValidForDelivery,
    isExistOrderId: OrderValidator.isExistOrderId,
    isValidIdNew: OrderValidator.isValidIdNew
}