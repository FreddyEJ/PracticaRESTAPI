const express = require("express");
const userController = require("./../controllers/userController");
const userRouter = express.Router();
const authController = require('../controllers/authController')
//routes
userRouter
  .route("/")
  //.get(productController.getAllProducts)
  .all(authController.protect)
  .get(userController.getAllusers)
  .post(userController.addUser);
//productRouter.route("/:id").get(productController.getProductById);
  userRouter.route("/:id")
  .all(authController.protect)
  .get(userController.getUserById)
  .put(userController.putUser)
  .delete(userController.deleteUser);
module.exports = userRouter;
