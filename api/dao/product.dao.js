


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
}


module.exports = {
    getAllProducts: ProductDAO.getAllProducts,
    findOne: ProductDAO.findOne,

}
