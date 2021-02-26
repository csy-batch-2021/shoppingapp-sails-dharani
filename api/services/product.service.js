const ProductDAO = require("../dao/product.dao");
const Products = require("../models/Products");
const UserValidator = require("../validator/userValidator");
const ProductValidator = require("../validator/productValidator");
const ProductRatingDAO = require("../dao/productRating.dao");
const UserDAO = require("../dao/user.dao");
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
            let isProductOrdered = await ProductValidator.toCheckOrderedProduct(productId);
            if (isProductOrdered) {
                let active = false;
                //disable product (active =0)
                await ProductDAO.updateProductStatus(productId, active);
            }
            else {
                let productResult = await ProductDAO.deleteProduct(productId);
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }


    // to add a new product
    static async addProducts(product) {
        try {
            await UserValidator.toCheckValidUserId(product.userId);
            var userResult = await UserDAO.findOne(product.userId);

            console.log("userResult", userResult.role);
            if (userResult.role == "ADMIN") {

                ProductValidator.validateNewProduct(product); //to check validate the products details
                let exists = await ProductDAO.findOneUsingName(product); //to find and if same product and brandname product is there in db

                if (exists) {
                    throw new Error("This Product already Exists in the given brand");
                }
                product.created_date = new Date();
                product.modified_date = new Date();
                product.created_by = product.userId;
                product.modified_by = product.userId;
                return await ProductDAO.save(product);
            } else {
                throw new Error("You Are Not Authorized");
            }
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }


    // too change the product status active and inactive
    static async changeStatus(productId, status) {
        try {
            var result = await ProductDAO.findOne(productId);
            console.log(result);

            if (result) {
                let isActive = result.active == 1;
                if (status == isActive) {
                    throw new Error(
                        "Already record is " + (isActive ? "Active" : "Inactive")
                    );
                }
                await ProductDAO.updateProductStatus(result.id, !result.active);

            } else {
                throw new Error("Please Enter valid Product ID");
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async productReport() {
        try {
            var productResult = await ProductDAO.productReport();
            return productResult;
        } catch (err) {
            throw new Error("Not able to fetch Product Report");
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
    deleteProduct: ProductService.deleteProduct,
    changeStatus: ProductService.changeStatus,
    addProducts: ProductService.addProducts,
    productReport: ProductService.productReport
}