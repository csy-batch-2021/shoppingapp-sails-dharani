const axios = require('axios');
const DB_URL = 'https://6a5a0e85-6282-465b-b46d-364a80e1b15d-bluemix.cloudantnosqldb.appdomain.cloud';
class DAOUtil {

    /**
  * 
  * @param {*to add new order based on orderDetails} orderDetails 
  */
    static async  insert(url, requestedData) {
        try {
            let result = await axios.request({
                url: url,
                method: "post",
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: requestedData
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * 
     * @param {*get one order based on id} id 
     */
    static async findOne(url) {
        try {
            let response = await axios.request({
                url: url,
                method: 'get',
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: null,
            });
            return response.data;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
    * get all products
    */
    static async getView(url) {
        let response = await axios.request({
            url: url,
            method: 'get',
            baseURL: DB_URL,
            auth: {
                username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                password: '53fcbf5faa893817605b85afaf7af46f',
            },
            data: null,
        });
        let data = response.data.rows;
        // console.log("fetch product", data);
        let productList = data.map(obj => obj.value);
        return productList;
    }
    /**
    * 
    * @param {*to search the products based on user product filter brandName} brandNames 
    */
    static async search(url, requestedData) {
        let response = await axios.request({
            url: url,
            method: 'post',
            baseURL: DB_URL,
            auth: {
                username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                password: '53fcbf5faa893817605b85afaf7af46f',
            },
            data: requestedData
        });
        let productList = response.data.docs;
        return productList;
    }
    /**
 * 
 * @param {*find one product and update product details} productValues 
 */
    static async findAndUpdate(url, requestedData) {
        try {
            let response = await axios.request({
                url: url,
                method: 'put',
                baseURL: DB_URL,
                auth: {
                    username: 'apikey-v2-1zry8ajgypo2q14hzjvdwuemmaiixcz9dhmtedvr14ck',
                    password: '53fcbf5faa893817605b85afaf7af46f',
                },
                data: requestedData,
            });
            return response.data;
        } catch (err) {
            console.log("error", err);
            throw err;
        }
    }
    /**
    * get pruduct based ordered count
    */
    static async report(url) {
        try {
            let response = await axios.request({
                url: url,
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
    /**
    * 
    * @param {*get userId based user orders} userId 
    */
    static async findBySubArray(url, requestedData) {
        let response = await axios.request({
            url: url,
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

}
module.exports = {
    findOne: DAOUtil.findOne,
    getView: DAOUtil.getView,
    search: DAOUtil.search,
    findAndUpdate: DAOUtil.findAndUpdate,
    report: DAOUtil.report,
    insert: DAOUtil.insert,
    findBySubArray: DAOUtil.findBySubArray
}
