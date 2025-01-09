const { faker } = require('@faker-js/faker');
const { randomRangeNumber } = require('../helpers/randomRangeNumber');

const Category = require('../models/category');
const Product = require('../models/product');

const createProduct = async () => {
  const categories = await Category.find().skip(0).limit(50);
  let categoriesID = [];
  categories.forEach((id) => {
    categoriesID = [...categoriesID, id._id.toString()];
  });

  const randomID = categoriesID[randomRangeNumber(0, categoriesID.length - 1)];
  const name = faker.word.noun();
  const description = faker.lorem.text();
  const thumbnail = faker.image.url(320, 240);

  const product = new Product({
    category: randomID,
    description,
    name,
    randomID,
    thumbnail,
  });

  await product.save();
  console.log(product);
};

const createProducts = async (cant = 1) => {
  for (let i = 1; i <= cant; i++) {
    await createProduct();
  }
};

module.exports = {
  createProducts,
};
