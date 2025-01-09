const { Schema, model } = require('mongoose');

const MediaSchema = Schema({
  type: {
    type: String,
    required: [true, 'The type is required'],
  },
  type_id: {
    type: String,
    required: [true, 'The type id is required'],
  },
  url: {
    type: String,
    required: [true, 'The url is required'],
  },
  excerpt: {
    type: String,
    required: [true, 'The excerpt is required'],
  },
});

module.exports = model('Media', MediaSchema);
