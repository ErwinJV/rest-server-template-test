const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env["SECRET_PRIVATE_KEY"],
      {
        expiresIn: "72h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Cannot generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
