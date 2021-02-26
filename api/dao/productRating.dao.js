
class ProductRatingDAO {
    static async save(productRatingsDetails) {
        let params = [
            productRatingsDetails.userId,
            productRatingsDetails.productId,
            productRatingsDetails.rating,
            productRatingsDetails.created_by,
            productRatingsDetails.modified_by,
        ];
        let ds = await sails.getDatastore();
        const sql =
            'INSERT INTO product_ratings(user_id,product_id,rating,created_by,modified_by) VALUES($1,$2,$3,$4,$5)';
        const result = await ds.sendNativeQuery(sql, params);
        return result.rows;
    }
}
module.exports = {
    save: ProductRatingDAO.save
}