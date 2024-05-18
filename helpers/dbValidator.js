const Role = require('../models/role')

const User = require('../models/user')


const isValidRole = async(role= '')=>{
    const roleExists = await Role.findOne({role})
    if(!roleExists){
      throw new Error(`The role ${role} is not registered in the database `)
    }
  }

const isEmailExists  = async (email = '')=> {
      const emailExists = await User.findOne({email})

      if(emailExists){
         throw new Error(`The email ${email} is already registered`)
      }
}

const isUserExistsById = async (id = '')=> {
    const userIdExists = await User.findById(id)

    if(!userIdExists){
       throw new Error(`The id ${id} is not exists`)
    }
}

  module.exports = {
    isValidRole,
    isEmailExists,
    isUserExistsById
  }