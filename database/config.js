const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env["MONGODB_CNN"]);

    console.log("Database is online");

  } catch (error) {
    console.log(error);
    throw new Error("Error with database connection");
  }
};

module.exports = {
  dbConnection,
};
