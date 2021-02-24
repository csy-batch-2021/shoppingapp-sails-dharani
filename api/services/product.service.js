const ProductDAO = require("../dao/product.dao");
const Products = require("../models/Products")
class ProductService {
    static async getAllProducts() {
        try {
            let products = await ProductDAO.getAllProducts();
            return products;
        } catch (err) {
            console.log(err);
            throw new Error("Not able to fetch the products");
        }
    }
    // to find and get particular order
    static async getProductDetails(productId) {
        try {
            var result = await ProductDAO.findOne(productId);
            if (!result) {
                throw new Error("Please enter valid Prodct Id");
            }
            return result;
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }

    static async searchProducts(brandNames) {
        try {
            let products = await ProductDAO.searchProducts(brandNames);
            return products;
        } catch (err) {
            console.log(err);
            throw new Error("Not able to fetch the products");
        }
    }
    // to get all products
    static async getActiveProduct(params) {
        try {
            var activeProduct = await ProductDAO.findActive();
            return activeProduct;
        } catch (err) {
            throw new Error("Not able to fetch active products");
        }
    }

}
module.exports = {
    getAllProducts: ProductService.getAllProducts,
    getProductDetails: ProductService.getProductDetails,
    searchProducts: ProductService.searchProducts,
    getActiveProduct: ProductService.getActiveProduct
}