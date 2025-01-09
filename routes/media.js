const { Router } = require('express');
const { check } = require('express-validator');

const { deleteMedia, getMedia, postMedia } = require('../controllers/media');

const router = Router();

router.get('/:type_id/:type', [], getMedia);

router.post('/', [], postMedia);

router.delete('/:id', [], deleteMedia);

module.exports = router;
