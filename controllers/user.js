const bcryptjs = require("bcryptjs");
const { response, request } = require("express");

const User = require("../models/user");

const regex = /^[0-9]*$/;

const usersGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  const isLimitANumber = regex.test(limit);
  const isFromANumber = regex.test(from);
  if (!isLimitANumber) {
    return res.status(400).json({
      msg: `limit value "${limit}" is not a number`,
    });
  }

  if (!isFromANumber) {
    return res.status(400).json({
      msg: `from value "${from}" is not a number`,
    });
  }

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

 return  res.json({
    total,
    users,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, google, password, role } = req.body;

  const salt = bcryptjs.genSaltSync();

  const crypt = bcryptjs.hashSync(password, salt);
  const user = new User({
    email,
    google,
    name,
    password: crypt,
    role,
  });

  await user.save();

 return res.json({
    msg: "post API ~ controller",
    user,
  });
};

const usersDelete = async (req = request, res = response) => {
  const { id } = req.params;
  // const user = await User.findByIdAndDelete(id)
 // const uid = req.uid;

  const userAuth = req.user
  const [user]= await Promise.all([
    User.findByIdAndUpdate(id, { status: false }),
   
  ]);
 
   return res.json({
    user,
    userAuth
  });

 
};

const usersPut = async (req, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...rest } = req.body;
  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
    const user = await User.findByIdAndUpdate(id, rest);
   return res.json({
      msg: "put API ~ controller",
      user,
    });
  }
};

module.exports = {
  usersGet,
  usersDelete,
  usersPut,
  usersPost,
};
