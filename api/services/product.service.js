const ProductDAO = require("../dao/product.dao");
const Products = require("../models/Products");
const UserValidator = require("../validator/userValidator");
const ProductValidator = require("../validator/productValidator");
const ProductRatingDAO = require("../dao/productRating.dao");
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
    static async addProductRating(productRatingDetails) {
        console.log("productRatingDetails", productRatingDetails);

        try {
            await UserValidator.toCheckValidUserId(productRatingDetails.userId);
            await ProductValidator.toCheckValidProductId(
                productRatingDetails.productId
            );
            productRatingDetails.created_by = productRatingDetails.userId;
            productRatingDetails.modified_by = productRatingDetails.userId;
            // productRatingsDetails.
            let result = await ProductRatingDAO.save(productRatingDetails);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async updateProduct(productValues) {
        try {
            await ProductValidator.toCheckValidProductId(productValues.productId);
            var result = await ProductDAO.findOneAndUpdate(productValues);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async deleteProduct(productId) {
        try {
            await ProductValidator.toCheckOrderedProduct(productId);
            let productResult = await ProductDAO.deleteProduct(productId);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

}
module.exports = {
    getAllProducts: ProductService.getAllProducts,
    getProductDetails: ProductService.getProductDetails,
    searchProducts: ProductService.searchProducts,
    getActiveProduct: ProductService.getActiveProduct,
    addProductRating: ProductService.addProductRating,
    updateProduct: ProductService.updateProduct,
    deleteProduct: ProductService.deleteProduct
}