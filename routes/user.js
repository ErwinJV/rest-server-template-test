
const { Router } = require("express");
const { check } = require('express-validator')
const { isValidRole, isEmailExists, isUserExistsById} = require('../helpers/dbValidator')

const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/user");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.get("/", usersGet);

router.put("/:id",[
  check('id','Is not a valid id').isMongoId(),
  check('id').custom(isUserExistsById),
  check('role').custom(isValidRole), 
  validateFields
], usersPut);

router.post("/",[
  check('name', 'The name is required').not().isEmpty(),
  check('password', 'The passsword is required').not().isEmpty(),
  check('password', 'The password must be at least 6 characters').isLength(6),
  check('email','The email is not valid').isEmail(),
  check('email').custom(isEmailExists),
  check('role').custom(isValidRole),
  validateFields
], usersPost);

router.delete("/:id", [
  check('id','Is not a valid id').isMongoId(),
  check('id').custom(isUserExistsById),
  validateFields
],usersDelete);

module.exports = router;
