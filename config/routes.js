/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  
  /**
   * This api used home page of the application
   */
  '/': { view: 'pages/homepage', layout: 'layouts/layout' },
  /**
   * This api used to product page of the User
   */
  'get /products': { view: 'pages/products' },
  /**
   * This api used to all orders page of the Admin
   */
  'get /orders': { view: 'pages/orders' },
  /**
   * This api used to login page of the application
   */
  'get /login': { view: 'pages/login' },
  /**
   * This api used to show all prodcuts(Active and Inactive) in Admin
   */
  'get /allProducts': { view: 'pages/allProducts' },
  /**
   * This api used to show all loggedin user orders only in user
   */
  'get /myOrders': { view: 'pages/myOrders' },
  /**
   * This api used to add a new product page in Admin
   */
  'get /addProduct': { view: 'pages/addProduct' },
  /**
   * This api used to show users based ordered count in Admin
   */
  'get /userReport': { view: 'pages/userReport' },
  /**
   * This api used to show product based ordered count in Admin
   */
  'get /productReport': { view: 'pages/productReport' },
  /**
   * This api used to show status based ordered count in Admin
   */
  'get /statusReport': { view: 'pages/statusReport' },








  //REST API
  /**
   * This api used to getting all the active product list in User login
   */
  'GET /api/products': { action: 'product/list' },
  /**
   * This api is used to add a order,based on userId,productId and quantity.
   */
  'POST /api/addOrder': { action: 'order/add-order' },
  /**
   * This api to getting all orders based on all existing users in admin login
   */
  'GET /api/orders': { action: 'order/all-order' },
  /**
   * This api to change order status Ordered to Delivered in admin login
   */
  'POST /api/changeorderstatus': { action: 'order/change-order-status' },
  /**
   * This api to used cancel the particular user orders, it's using both User and Admin login
   */
  'PATCH /api/order/:id/cancel': { action: 'order/cancel-order' },
  /**
   * This is api to getting the product values based on user choosing values in user login
   */
  'GET /api/product/search': { action: 'product/search-product' },
  /**
   * This api to getting all Active and Inactive products in product table in admin login
   */
  'GET /api/getAllProducts': { action: 'product/get-all-products' },
  /**
   * This api used to getting users id based placed orders list in user login
   */
  'GET /api/myOrders': { action: 'order/my-orders' },
  /**
   * This Api used to calculate the Product status based getting values count in admin login
   */
  'GET /api/orderStatusCount': { action: 'order/my-orders-count' },
  /**
   * This api to add rating for particular product based on user
   */
  'POST /api/product/addRating': { action: 'product/add-product-rating' },
  /**
   * This api used to update product price in admin login
   */
  'PATCH /api/product/UpdateProduct': { action: 'product/update-product' },
  /**
   * This api used to delete product based on product ,if given product is already ordered for any user's, in that case it's changes status to Inactive
   */
  'DELETE /api/product/delete/:productId': { action: 'product/delete-product' },
  /**
   * This api used to change product status Active or Inactive based on product in admin login
   */
  'PATCH /api/product/changeStatus': { action: 'product/change-product-status' },
  /**
   * This api used to add a new product, it's handled validation in admin login
   */
  'POST /api/product/addNew': { action: 'product/add-new-product' },
  /**
   * This api used to count the users based count the ordered and also total amount of order in admin login
   */
  'GET /api/report/user': { action: 'user/report' },
  /**
   * This api used to count the product based ordered count in admin login
   */
  'GET /api/report/product': { action: 'product/report' },
  /**
   * This api used to count the ordered status based ordered count in admin login
   */
  'GET /api/report/orderedStatus': { action: 'order/status-report' },












  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against 'shadow routes' (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
