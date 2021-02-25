/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  "product/list": "isLoggedin",
  // "user/login": true,

  "order/all-order": "isAdmin",
  "product/get-all-products": "isAdmin",
  "product/add-new-product": "isAdmin",
  // "order/all-order": "isAdmin",
  // "product/get-all-products": "isAdmin",


  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': true,

};
