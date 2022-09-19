const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllusers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "funcionando",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
exports.getUserById = catchAsync(async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  if (foundUser) {
    res.status(200).json({
      status: "funcionando",
      data: {
        foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});
exports.putUser = catchAsync(async (req, res) => {
  const {id}=req.params;
  const {_id,password, ...resto}=req.body
  req.body.password=crypto
  .createHash('sha256')
  .update(req.body.password)
 .digest("hex");
  
  const foudUsers=await User.findByIdAndUpdate(id,resto);
  if(foudUsers){  
    res.status(200).json({
      status:"funcionando",   
    });
  }else{
    res.status(404).json({
      status:"not found"
    });
  }
});
exports.deleteUser = catchAsync(async (req, res) => {
  const {id}=req.params;
  const foundUsers=await User.findByIdAndDelete(id);
  if(foundUsers){
    res.status(200).json({
      status:"funcionando", 
    });
  }else{
    res.status(404).json({
      status:"not found"
    });
  }
});
