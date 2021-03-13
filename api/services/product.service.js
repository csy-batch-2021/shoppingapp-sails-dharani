const ProductDAO = require('../dao/product.dao');
const Products = require('../models/Products');
const UserValidator = require('../validator/userValidator');
const ProductValidator = require('../validator/productValidator');
const ProductRatingDAO = require('../dao/productRating.dao');
const UserDAO = require('../dao/user.dao');
const ProductRepository = require('../repository/product.dao');
class ProductService {
    /**
     * to get all products
     */
    static async getAllProducts() {
        try {
            // return await ProductDAO.getAllProducts();
            return await ProductRepository.getAllProducts();
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the products');
        }
    }
    /**
     * get one product details based on productId
     * @param {string} productId 
     */
    static async getProductDetails(productId) {
        try {
            // var result = await ProductDAO.findOne(productId);
            var result = await ProductRepository.findOne(productId);

            if (!result) {
                throw new Error('Please enter valid Prodct Id');
            }
            return result;
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
    /**
     * to ger a brandName name based get product details
     * @param {array} brandNames
     */
    static async searchProducts(brandNames) {
        try {
            return await ProductRepository.searchProducts(brandNames);
            // return await ProductDAO.searchProducts(brandNames);
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch the products');
        }
    }
    /**
     * to get all active products
     */
    static async getActiveProduct() {
        try {
            return await ProductRepository.findActive();
            // return await ProductDAO.findActive();
        } catch (err) {
            console.log(err);
            throw new Error('Not able to fetch active products');
        }
    }
    /**
     * add product rating for one product
     * @param {object} productRatingDetails 
     */
    static async addProductRating(productRatingDetails) {
        try {
            await UserValidator.toCheckValidUserId(productRatingDetails.userId);
            await ProductValidator.isProductRated(productRatingDetails.productId, productRatingDetails.userId);
            ProductValidator.toCheckValidProductId(
                productRatingDetails.productId
            ).then(result => {
                console.log('addProductRating', result);
            });
            productRatingDetails.created_by = productRatingDetails.userId;
            productRatingDetails.modified_by = productRatingDetails.userId;
            return await ProductRatingDAO.save(productRatingDetails);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * update product price
     * @param {object} productValues 
     */
    static async updateProductOld(productValues) {
        try {
            let productDetails = await ProductValidator.toCheckValidProductId(productValues.productId);
            productDetails.price = productValues.amount;
            // await ProductDAO.findOneAndUpdate(productValues);
            await ProductRepository.findOneAndUpdate(productDetails);

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
       * update product price
       * @param {object} productValues 
       */
    static async updateProduct(productValues) {
        try {
            // let productDetails = await
            ProductValidator.toCheckValidProductId(productValues.productId).then(response => {
                console.log('updateProduct', response);
                response.price = productValues.amount;
                ProductRepository.findOneAndUpdate(response).then(response => {
                    return response;
                }, err => {
                    console.log('err', err);
                    throw err;
                })
            }, err => {
                console.log('err', err);
                throw err;
            });
            // await ProductDAO.findOneAndUpdate(productValues);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
     * if product not ordered product will be delete otherwise status will be changes active to inactive
     * @param {string} productId 
     */
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
    /**
     * to add a new product
     * @param {object} product 
     */
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
                return await ProductRepository.save(product);
            } else {
                throw new Error('You Are Not Authorized');
            }
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    }
    /**
     * to change product status to be active or inactive
     * @param {string} productId 
     * @param {string} status 
     */
    static async changeStatusOld(productId, status) {
        try {
            var result = await ProductRepository.findOne(productId);
            console.log('result', result);
            if (result) {
                let isActive = result.active === true;
                console.log("isActive", isActive);
                if (status === isActive) {
                    throw new Error(
                        'Already record is ' + (isActive ? 'Active' : 'Inactive')
                    );
                }
                result.active = !result.active;
                // await ProductRepository.updateProductStatus(result.id, !result.active);
                await ProductRepository.updateProductStatus(result);

            } else {
                throw new Error('Please Enter valid Product ID');
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    /**
       * to change product status to be active or inactive
        * @param {string} productId 
        * @param {string} status 
        */
    static async changeStatus(productId, status) {
        ProductRepository.findOne(productId).then(result => {
            console.log('result', result);
            if (result) {
                let isActive = result.active === true;
                console.log("isActive", isActive);
                if (status === isActive) {
                    throw new Error(
                        'Already record is ' + (isActive ? 'Active' : 'Inactive')
                    );
                }
                result.active = !result.active;
                // await ProductRepository.updateProductStatus(result.id, !result.active);
                ProductRepository.updateProductStatus(result).then(response => {
                    return response;
                }, err => {
                    console.log('err', err);
                    throw err;
                });
            } else {
                throw new Error('Please Enter valid Product ID');
            }
        }, err => {
            console.log('err', err);
            throw err;
        });
    }
    /**
     * product based report
     */
    static async productReport() {
        try {
            let productCount = await ProductRepository.productReport();
            let productId = productCount.map(obj => obj.key);
            let productIdBasedValues = await ProductRepository.searchProductsById(productId);
            let productSales = [];
            for (let p of productIdBasedValues) {
                p.count = productCount.find(obj => obj.key == p._id).value;
                productSales.push(p);
            }
            return productSales;
        } catch (err) {
            console.log(err);
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