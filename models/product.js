const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
  },
  category: {
    type: String,
    required: [true, 'The category is required'],
  },
  description: {
    type: String,
    required: [true, 'The Description is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'The thumbnail is required'],
  },
});

module.exports = model('Product', ProductSchema);
