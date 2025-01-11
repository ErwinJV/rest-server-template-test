const { faker } = require('@faker-js/faker');

const Product = require('../models/product');
const User = require('../models/user');
const Media = require('../models/media');

const { randomRangeNumber } = require('../helpers/randomRangeNumber');

const createMedia = async () => {
  const countProducts = await Product.countDocuments();
  const randomSkipProd = randomRangeNumber(1, countProducts - 10);
  const products = await Product.find().skip(randomSkipProd).limit(10).select({ _id: 1 });
  let productsTypeID = [];
  products.forEach((product) => {
    productsTypeID = [...productsTypeID, [product._id.toString(), 'product']];
  });

  const countUsers = await User.countDocuments();
  const randomSkipUser = randomRangeNumber(1, countUsers - 10);
  const users = await User.find().skip(randomSkipUser).limit(10).select({ _id: 1 });
  let usersTypeID = [];
  users.forEach((user) => {
    usersTypeID = [...usersTypeID, [user._id.toString(), 'user']];
  });

  const typesIDs = productsTypeID.concat(usersTypeID);
  const typeID = typesIDs[randomRangeNumber(0, typesIDs.length - 1)];

  const url = faker.image.url(320, 240);
  const type = typeID[1];
  const type_id = typeID[0];
  const excerpt = faker.lorem.words({ min: 3, max: 5 });

  const media = new Media({
    url,
    type,
    type_id,
    excerpt,
  });

  await media.save();

  console.log(media);
};

const createMedias = async (cant = 1) => {
  for (let i = 0; i <= cant; i++) {
    await createMedia();
  }
};

module.exports = {
  createMedias,
};
