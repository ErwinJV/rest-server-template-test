const { response, request } = require('express');

const Product = require('../models/product');

const regexNumber = /^[0-9]*$/;

const isProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    return false;
  }

  return true;
};

const getProducts = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const isLimitANumber = regexNumber.test(limit);
  const isFromANumber = regexNumber.test(from);

  if (!isLimitANumber) {
    return res.status(400).json({
      msg: `limit value "${limit} is not a number"`,
    });
  }

  if (!isFromANumber) {
    return res.status(400).json({
      msg: `limit value "${from} is not a number"`,
    });
  }

  const [total, products] = await Promise.all([
    Product.countDocuments(),
    Product.find().skip(Number(from)).limit(Number(limit)),
  ]);

  return res.json({
    total,
    products,
  });
};

const productsPost = async (req = request, res = response) => {
  const { name, description, category, thumbnail } = req.body;
  const product = new Product({
    name,
    description,
    category,
    thumbnail,
  });

  await product.save();

  return res.json({
    product,
  });
};

const deleteProducts = async (req = request, res = response) => {
  const { id } = req.params;

  const productExists = await isProduct();
  if (!productExists) {
    return res.status(404).json({
      msg: 'Product not exists',
    });
  }
  await Product.findByIdAndDelete(id);
  return res.json({
    msg: 'Product deleted',
  });
};

const productsPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...rest } = req.body;
  const productExists = await isProduct();
  if (!productExists) {
    return res.status(404).json({
      msg: 'Product not exists',
    });
  }

  const product = await Product.findByIdAndUpdate(id, rest);

  return res.json({
    product,
  });
};

module.exports = {
  deleteProducts,
  getProducts,
  productsPost,
  productsPut,
};
