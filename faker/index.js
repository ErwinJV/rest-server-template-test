require('dotenv').config();

const { dbConnection } = require('../database/config');

const { createProducts } = require('./products');
const { createCategories } = require('./category');
const { createMedias } = require('./media');
(async () => {
  await dbConnection();
  await createCategories(0);
  await createProducts(0);
  await createMedias(80);
})();
