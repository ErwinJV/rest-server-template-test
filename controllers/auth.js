const bcryptjs = require('bcryptjs')
const { response } = require("express");

const User = require("../models/user");
const { generateJWT } = require('../helpers/generateJWT')

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const user= await User.findOne({ email });
    if(!user){
          return res.status(400).json({
            msg:`The email ${email} is not registered`
          })
    }

    if(!user.status){
         return res.status(400).json({
            msg:'This user account is deactivate'
         })
    }

    const isValidPassword = bcryptjs.compareSync(password,user.password)

    if(!isValidPassword){
        return res.status(400).json({
            msg:'Wrong Password!'
         })   
    }

    const token = await generateJWT(user.id)
    return res.json({
        user,
        token
      });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "Contact the administrator server",
    });
  }

};

module.exports = {
  login,
};
