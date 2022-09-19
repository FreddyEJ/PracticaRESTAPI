const express = require("express");
const shoppingCartController = require("./../controllers/shoppingCartController.js");
const authController = require("./../controllers/authController");
const shoppingCartRouter = express.Router();

//routes
shoppingCartRouter
    .all('/', authController.protect)
    .post('/product', authController.protect, shoppingCartController.addProductToShoppingCart)
    .post('/pay', authController.protect, shoppingCartController.payShoppingCart)
    .delete('/product/:id', authController.protect, shoppingCartController.deleteShoppingCart);

module.exports = shoppingCartRouter;