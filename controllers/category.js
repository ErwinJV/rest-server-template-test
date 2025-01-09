const { request, response } = require('express');

const Category = require('../models/category');

const regexNumber = /^[0-9]*$/;

const getCategories = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.params;

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
  const [total, categories] = await Promise.all([
    Category.countDocuments(),
    Category.find().skip(Number(from)).limit(Number(limit)),
  ]);

  return res.json({
    total,
    categories,
  });
};

const postCategory = async (req = request, res = response) => {
  const { name } = req.body;
  const category = new Category({
    name,
  });

  await category.save();

  return res.json({
    category,
  });
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;

  await Category.findByIdAndDelete(id);

  return res.json({
    msg: 'Category deleted',
  });
};

module.exports = {
  deleteCategory,
  getCategories,
  postCategory,
};
