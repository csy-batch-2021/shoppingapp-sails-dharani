
class OrderDAO {
    static async  save(orders) {
        let params = [
            orders.userId,
            orders.productId,
            orders.qty,
            orders.totalAmount,
            orders.status,
            orders.created_date,
            orders.modified_date,
            orders.created_by,
            orders.modified_by,
        ];
        let ds = await sails.getDatastore();
        const sql = 'INSERT INTO orders (user_id,product_id,qty,total_amount,status,created_date,modified_date,created_by,modified_by) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)';
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    static async findAll() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            'SELECT o.id,u.user_name,p.name,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date FROM users u, products p,orders o WHERE o.user_id=u.id AND o.product_id=p.id'
        );
        return result.rows;
    }
    static async findOneAndUpdate(orderId, status, userId) {
        let params = [status, userId, orderId];
        const sql =
            'UPDATE orders SET status=$1,modified_by=$2,modified_date=Now() WHERE id=$3';
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    static async findOne(id) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT * FROM orders WHERE id=$1', [id]);
        let data = result.rows;
        return data.length > 0 ? data[0] : null;
    }
    static async findProductId(productId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT * FROM orders WHERE product_id=$1', [productId]);
        return result.rows;
    }
    /**
     * Check if product is ordered in orders table
     * @param {*} productId 
     */
    static async isProductOrdered(productId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECE 1 FROM orders WHERE product_id=$1', [productId]);
        let data = result.rows;
        return data.length > 0;
    }
    static async cancelOrder(orderDetails) {
        let params = ['CANCELLED', orderDetails.userId, orderDetails.orderId];
        const sql =
            'UPDATE orders SET status=$1,modified_by=$2,modified_date=now() WHERE id=$3';
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    static async findMyOrder(userId) {
        let params = [userId];
        const sql = "SELECT o.id,u.user_name,p.name,(p.id)AS product_id,p.brand_name,p.price,o.qty,o.total_amount,o.status,o.created_date,o.modified_date FROM users u, products p,orders o WHERE o.user_id=u.id AND o.product_id=p.id AND o.user_id=$1";
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    static async myOrdersStatusCount(userId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            'SELECT status,COUNT(*) AS count FROM users u, products p,orders o WHERE o.user_id=u.id AND o.product_id=p.id AND o.user_id=$1 GROUP BY status',
            [userId]
        );
        return result.rows;
    }
    static async userOrderReport() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT  *,COUNT(*)AS countValues,SUM(o.total_amount)AS total FROM orders o,users u ,products p WHERE  p.id=o.product_id and u.id=o.user_id GROUP BY o.user_id');
        return result.rows;
    }
    static async orderStatusReport() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT  status,COUNT(*)AS count FROM orders GROUP BY status');
        return result.rows;
    }
}
module.exports = {
    save: OrderDAO.save,
    findAll: OrderDAO.findAll,
    findOneAndUpdate: OrderDAO.findOneAndUpdate,
    findOne: OrderDAO.findOne,
    cancelOrder: OrderDAO.cancelOrder,
    findMyOrder: OrderDAO.findMyOrder,
    myOrdersStatusCount: OrderDAO.myOrdersStatusCount,
    findProductId: OrderDAO.findProductId,
    isProductOrdered: OrderDAO.isProductOrdered,
    userOrderReport: OrderDAO.userOrderReport,
    orderStatusReport: OrderDAO.orderStatusReport
}