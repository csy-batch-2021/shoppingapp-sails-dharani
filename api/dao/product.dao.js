


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

    static async updateProductStatus(productId, status) {
        let params = [status, productId];
        let ds = await sails.getDatastore();
        const sql = "UPDATE products SET active=$1 where id=$2";
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }

    static async deleteProduct(productId) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery("delete from products where id=$1", [productId]);
        let data = result.rows;
        return data;
    }

    static async findOneUsingName(product) {
        // const param
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery(
            "select 1 from products where name=$1 AND brand_name=$2",
            [product.name, product.brandName]
        );
        let data = result.rows;
        return data.length != 0;
    }
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
            "insert into products(name,brand_name,ram,price,active,created_date,modified_date,created_by,modified_by) values($1,$2,$3,$4,1,$5,$6,$7,$8)";
        const result = await ds.sendNativeQuery(sql, params);
        let data = result.rows;
        return data;
    }


    static async productReport() {
        let ds = await sails.getDatastore();

        const result = await ds.sendNativeQuery("select * ,count(*)as count from orders o ,products p  where p.id=o.product_id group by p.id");
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
    deleteProduct: ProductDAO.deleteProduct,
    updateProductStatus: ProductDAO.updateProductStatus,
    findOneUsingName: ProductDAO.findOneUsingName,
    save: ProductDAO.save,
    productReport: ProductDAO.productReport

}
