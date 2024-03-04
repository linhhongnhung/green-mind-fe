import {
  signup,
  login,
  getCustomerByUsername,
  getAdminByUsername,
  updateCustomer,
  updateCustomerWithNewUsername,
  getAllUsernames,
} from "./account";

import {
  createProduct,
  getAllProducts,
  getAllProductsWithCategories,
  getProductById,
  getProductImageUrl,
  searchProduct,
} from "./product";

import { getCategoriesByIds, getAllCategories } from "./category";

import {
  getCart,
  addToCart,
  removeCartItemByProductId,
  updateCartProductQuantity,
} from "./cart";

import {
  createOrder,
  getOrdersByCustomerId,
  getOrderById,
  createOrderAfterPayment,
  generateVnpayUrl,
  getOrdersByDate,
} from "./order";

export {
  signup,
  login,
  getCustomerByUsername,
  getAdminByUsername,
  updateCustomer,
  updateCustomerWithNewUsername,
  getAllUsernames,
  createProduct,
  getAllProducts,
  getAllProductsWithCategories,
  getProductById,
  getProductImageUrl,
  searchProduct,
  getCategoriesByIds,
  getAllCategories,
  getCart,
  addToCart,
  removeCartItemByProductId,
  updateCartProductQuantity,
  createOrder,
  getOrdersByCustomerId,
  getOrderById,
  createOrderAfterPayment,
  generateVnpayUrl,
  getOrdersByDate,
};
