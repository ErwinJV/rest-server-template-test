const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, isEmailExists, isUserExistsById } = require('../helpers/dbValidator');

const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/user');

const { haveRole, validateFields, validateJWT, validateRole } = require('../middlewares');

const router = Router();

router.get('/', [validateJWT, validateRole], usersGet);

router.put(
  '/:id',
  [
    validateJWT,
    validateRole,
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(isUserExistsById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  usersPut,
);

router.post(
  '/',
  [
    validateJWT,
    validateRole,
    check('name', 'The name is required').not().isEmpty(),
    check('password', 'The passsword is required').not().isEmpty(),
    check('password', 'The password must be at least 6 characters').isLength(6),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(isEmailExists),
    check('role').custom(isValidRole),

    validateFields,
  ],
  usersPost,
);

router.delete(
  '/:id',
  [
    validateJWT,
    validateRole,
    haveRole(['SALES_ROLE', 'USER_ROLE']),
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(isUserExistsById),

    validateFields,
  ],
  usersDelete,
);

module.exports = router;
