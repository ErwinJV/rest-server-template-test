const { request, response } = require("express");

const validateRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "The role is being verified without validating the token first",
    });
  }
  const { name, role } = req.user;
  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `User ${name} is not authorized for this request`,
    });
  }
  //next();
};

const haveRole = (...roles) => {
     return (req,res = response,next) => {
        if(!req.user){
             return res.status(500).json({
                 msg:'The role is being verified without validating the token first'
             })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`The request requires one of this roles ${roles}, not ${req.user.role}`
            })
        }
         next()
     }
}

module.exports = {
  validateRole,
  haveRole
};
