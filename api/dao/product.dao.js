class ProductDAO {
    //find one product by id
    static async findOne(id) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT * FROM products WHERE id=$1', [id]);
        let data = result.rows;
        return data.length > 0 ? data[0] : null;
    }
    // get all products
    static async getAllProducts() {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery('SELECT * FROM products');
        return result.rows;
    }
    // to search the products based on user product filter
    static async searchProducts(brandName) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT * FROM products WHERE brand_name IN($1)', [brandName]);
        return result.rows;
    }
    // get all active products
    static async findActive() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            'SELECT p.*,(SELECT round(avg(r.rating)) FROM  product_ratings r WHERE product_id=p.id)AS rating FROM products p  WHERE active=1',
        );
        return result.rows;
    }
    // to fine ond and update product
    static async findOneAndUpdate(productValues) {
        let params = [productValues.productId, productValues.amount]
        let sql = 'UPDATE products set price=$2 WHERE id=$1';
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    // update product status active and inactive
    static async updateProductStatus(productId, status) {
        let params = [status, productId];
        let ds = await sails.getDatastore();
        const sql = 'UPDATE products SET active=$1 WHERE id=$2';
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    // to delete products
    static async deleteProduct(productId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('delete FROM products WHERE id=$1', [productId]);
        return result.rows;
    }
    // get one product based on brandName
    static async findOneUsingName(product) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            'SELECT 1 FROM products WHERE name=$1 AND brand_name=$2',
            [product.name, product.brandName]
        );
        let data = result.rows;
        return data.length != 0;
    }
    // add new products
    static async save(product) {
        let params = [
            product.name,
            product.brandName,
            product.ram,
            product.price,
            product.created_date,
            product.modified_date,
            product.created_by,
            product.modified_by,
        ];
        let ds = await sails.getDatastore();
        const sql =
            'INSERT INTO products(name,brand_name,ram,price,active,created_date,modified_date,created_by,modified_by) VALUES($1,$2,$3,$4,1,$5,$6,$7,$8)';
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
    // get product report
    static async productReport() {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery('SELECT * ,COUNT(*)AS count FROM orders o ,products p  WHERE p.id=o.product_id group by p.id');
        return result.rows;
    }
}
module.exports = {
    getAllProducts: ProductDAO.getAllProducts,
    findOne: ProductDAO.findOne,
    searchProducts: ProductDAO.searchProducts,
    findActive: ProductDAO.findActive,
    findOneAndUpdate: ProductDAO.findOneAndUpdate,
    deleteProduct: ProductDAO.deleteProduct,
    updateProductStatus: ProductDAO.updateProductStatus,
    findOneUsingName: ProductDAO.findOneUsingName,
    save: ProductDAO.save,
    productReport: ProductDAO.productReport

}
