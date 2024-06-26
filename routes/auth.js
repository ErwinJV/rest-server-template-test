const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validateFields");

const router = Router();

router.post("/login",[
    check('email','Invalid email format').isEmail(),
    check('email','The email is required').not().isEmpty(),
    check('password','The password is required').not().isEmpty(),
    validateFields
] ,login);


module.exports = router;
