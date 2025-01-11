const { faker } = require('@faker-js/faker');

const Category = require('../models/category');

const createCategory = async () => {
  const name = faker.word.adjective();
  const category = new Category({
    name,
  });

  await category.save();

  console.log(category);
};

const createCategories = async (cant = 1) => {
  for (let i = 1; i <= cant; i++) {
    await createCategory();
  }
};

module.exports = {
  createCategories,
};
