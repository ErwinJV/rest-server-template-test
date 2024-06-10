const jwt = require('jsonwebtoken');
const { response, request } = require('express');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: 'Undefined token in the request ',
    });
  }
  console.log('Token: ', token);

  try {
    const { uid } = jwt.verify(token, process.env['SECRET_PRIVATE_KEY']);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'This user is not registered',
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'This user account is deactivated',
      });
    }
    req.uid = uid;
    console.log(uid);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: error,
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
