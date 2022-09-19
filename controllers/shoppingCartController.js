const catchAsync = require("../utils/catchAsync");
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const addProductToShoppingCart = async (product) => {
    const newProductOnCart = await Cart.updateOne({$push:{products:product}})
    return newProductOnCart
  }
  
  const checkProducts = async (product)=>{
      const thereIsProductDB = await Product.findOne(product)
      if(thereIsProductDB){
        const addProductOnCart = addProductToShoppingCart(thereIsProductDB)
        return addProductOnCart
      }
      return message = "Agregar Producto..." 
  }
  const checkProductsOnCart = async (product, user) =>{
    const userAunthenticated = await User.find(user)
    if(userAunthenticated){
      const checkingCar = await Cart.findOne(product)
      return checkingCar.products.find(prod => prod.productName == product.productName)
    }
  }
  const createShoppingCart = async (user, product) => {
    const createCart = await Cart.create({user:user.userName, status:"pending", products:product})
    return createCart
  }
  const existShoppingCart = async (user, product)=>{
    const foundShoppingCart = await Cart.find({a:1})
    if(foundShoppingCart == ''){
      return createShoppingCart(user, product)
    }else{
      return checkProductsOnCart(product, user)
    }
  }

  exports.deleteShoppingCart = catchAsync(async (req, res) => {
    const id = req.params.id
    const {userName} = req.user
    const product = await searchProduct(id)
  
    if(typeof(product) == String){
      res.status(200).json({
        message: product,
        status: "success",
        user: userName,
      });  
    }else{
      const statusCart = await Cart.find().select('status')
      const eraseFile = await Cart.updateOne({$pull: {products: product}})
      const {acknowledged, modifiedCount} = eraseFile
      res.status(200).json({
        status: "success",
        user: userName,
        statusCart:statusCart[0].status,
        data: {
          acknowledged,
          modifiedCount
        },
      });    
    }
  });