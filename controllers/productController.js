const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
exports.putProduct = catchAsync(async (req, res) => {
  const {id}=req.params;
  const {_id, ...resto}=req.body
  const foundProduct= await Product.findByIdAndUpdate(id,resto);
  if(foundProduct){
    res.status(200).json({
      status:"Funcionando",
      
    });
  }else{
    res.status(404).json({
      status:"not found"
    });
  }
});
exports.deleteProduct = catchAsync(async (req, res) => {
  const {id}=req.params;
  const foundProduct= await Product.findByIdAndDelete(id);
  if(foundProduct){
    res.status(200).json({
      status:"funcionando",
      
    });
  }else{
    res.status(404).json({
      status:"not found"
    });
  }
});
