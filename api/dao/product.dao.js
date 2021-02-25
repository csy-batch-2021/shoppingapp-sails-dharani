


class ProductDAO {
    static async findOne(id) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery("select * from products where id=$1", [id]);
        let data = result.rows;
        let products = data.length > 0 ? data[0] : null;
        return products;

    }
    static async getAllProducts() {
        let ds = await sails.getDatastore();
        let result = await ds.sendNativeQuery("select * from products");
        let data = result.rows;
        return data;
    }
    static async searchProducts(brandName) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery("select * from products where brand_name IN($1)", [brandName]);
        let data = result.rows;
        return data;

    }
    static async findActive() {
        let ds = await sails.getDatastore();

        const result = await ds.sendNativeQuery(
            "select p.*,(select round(avg(r.rating)) from  product_ratings r where product_id=p.id)as rating from products p  where active=1",
        );
        let data = result.rows;
        return data;
    }
    static async findOneAndUpdate(productValues) {
        console.log("productValuesDAO", productValues);
        let params = [productValues.productId, productValues.amount]
        let sql = "UPDATE products set price=$2 where id=$1";
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(sql, params);
        let data = result.rows;
        return data;

    }
    static async deleteProduct(productId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery("delete from products where id=$1", [productId]);
        let data = result.rows;
        return data;
    }
}


module.exports = {
    getAllProducts: ProductDAO.getAllProducts,
    findOne: ProductDAO.findOne,
    searchProducts: ProductDAO.searchProducts,
    findActive: ProductDAO.findActive,
    findOneAndUpdate: ProductDAO.findOneAndUpdate,
    deleteProduct: ProductDAO.deleteProduct

}
