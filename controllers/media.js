const { response, request } = require('express');

const Media = require('../models/media');

const regexNumber = /^[0-9]*$/;

const getMedia = async (req = request, res = response) => {
  const { type, type_id } = req.params;
  const media = await Media.find({ type: type, type_id: type_id });
  return res.json({
    media,
  });
};

const postMedia = async (req = request, res = response) => {
  const { url, type, type_id } = req.body;
  const media = new Media({
    type,
    type_id,
    url,
  });

  await media.save();

  return res.json({
    media,
  });
};

const deleteMedia = async (req = request, res = response) => {
  const { id } = req.params;
  // TODO: delete media from cloud service before
  await Media.findByIdAndDelete(id);

  return res.json({
    msg: 'Media has deleted',
  });
};

module.exports = {
  deleteMedia,
  getMedia,
  postMedia,
};
