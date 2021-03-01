const ProductDAO = require('../dao/product.dao');
const Products = require('../models/Products');
const UserValidator = require('../validator/userValidator');
const ProductValidator = require('../validator/productValidator');
const ProductRatingDAO = require('../dao/productRating.dao');
const UserDAO = require('../dao/user.dao');
class ProductService {
    // to get All Products 
    static async getAllProducts() {
        try {
            return await ProductDAO.getAllProducts();
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the products');
        }
    }
    // to find and get particular order
    static async getProductDetails(productId) {
        try {
            var result = await ProductDAO.findOne(productId);
            if (!result) {
                throw new Error('Please enter valid Prodct Id');
            }
            return result;
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
    // search the products to using filter
    static async searchProducts(brandNames) {
        try {
            return await ProductDAO.searchProducts(brandNames);
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the products');
        }
    }
    // to get all products
    static async getActiveProduct(params) {
        try {
            return await ProductDAO.findActive();

        } catch (err) {
            throw new Error('Not able to fetch active products');
        }
    }
    // to add rating for products
    static async addProductRating(productRatingDetails) {
        try {
            await UserValidator.toCheckValidUserId(productRatingDetails.userId);
            await ProductValidator.isProductRated(productRatingDetails.productId, productRatingDetails.userId);
            await ProductValidator.toCheckValidProductId(
                productRatingDetails.productId
            );
            productRatingDetails.created_by = productRatingDetails.userId;
            productRatingDetails.modified_by = productRatingDetails.userId;
            return await ProductRatingDAO.save(productRatingDetails);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    // to update product price
    static async updateProduct(productValues) {
        try {
            await ProductValidator.toCheckValidProductId(productValues.productId);
            await ProductDAO.findOneAndUpdate(productValues);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    // to change product status inActive
    static async deleteProduct(productId) {
        try {

            let isProductOrdered = await ProductValidator.toCheckOrderedProduct(productId);
            if (isProductOrdered) {
                let active = false;
                await ProductDAO.updateProductStatus(productId, active);  //disable product (active =0)         
                return "Already Ordered Product,So for that,Product Status Changed";
            }
            else {
                await ProductDAO.deleteProduct(productId);
                return "Product Successfully Deleted";
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
            if (userResult.role === 'ADMIN') {
                ProductValidator.validateNewProduct(product); //to check validate the products details
                let exists = await ProductDAO.findOneUsingName(product); //to find and if same product and brandname product is there in db
                if (exists) {
                    throw new Error('This Product already Exists in the given brand');
                }
                product.created_date = new Date();
                product.modified_date = new Date();
                product.created_by = product.userId;
                product.modified_by = product.userId;
                return await ProductDAO.save(product);
            } else {
                throw new Error('You Are Not Authorized');
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
                let isActive = result.active === 1;
                if (status === isActive) {
                    throw new Error(
                        'Already record is ' + (isActive ? 'Active' : 'Inactive')
                    );
                }
                await ProductDAO.updateProductStatus(result.id, !result.active);
            } else {
                throw new Error('Please Enter valid Product ID');
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    //to count the ordered product 
    static async productReport() {
        try {
            return await ProductDAO.productReport();
        } catch (err) {
            throw new Error('Not able to fetch Product Report');
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