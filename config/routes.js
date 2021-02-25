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

  '/': { view: 'pages/homepage', layout: 'layouts/layout' },
  "get /products": { view: "pages/products" },
  "get /orders": { view: "pages/orders" },
  "get /login": { view: "pages/login" },
  "get /allProducts": { view: "pages/allProducts" },
  "get /myOrders": { view: "pages/myOrders" },
  "get /addProduct": { view: "pages/addProduct" },
  "get /userReport": { view: "pages/userReport" },
  "get /productReport": { view: "pages/productReport" },







  //REST API
  "GET /api/products": { action: "product/list" },
  "POST /api/addOrder": { action: "order/add-order" },
  "GET /api/orders": { action: "order/all-order" },
  "POST /api/changeorderstatus": { action: "order/change-order-status" },
  "PATCH /api/order/:id/cancel": { action: "order/cancel-order" },
  "GET /api/product/search": { action: "product/search-product" },
  "GET /api/getAllProducts": { action: "product/get-all-products" },
  "GET /api/myOrders": { action: "order/my-orders" },
  "GET /api/orderStatusCount": { action: "order/my-orders-count" },
  "POST /api/product/addRating": { action: "product/add-product-rating" },
  "PATCH /api/product/UpdateProduct": { action: "product/update-product" },
  "DELETE /api/product/delete/:productId": { action: "product/delete-product" },
  "PATCH /api/product/changeStatus": { action: "product/change-product-status" },
  "POST /api/product/addNew": { action: "product/add-new-product" },
  "GET /api/report/user": { action: "user/report" },
  "GET /api/report/product": { action: "product/report" }












  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
