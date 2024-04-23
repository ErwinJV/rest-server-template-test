const express = require("express");
const cors = require("cors");
class Server {
   
  constructor() {
    this.usersPath = "/api/users";
    this.app = express();
    this.port = process.env["PORT"];
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
    this.app.use(express.json())
   
    
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at port ${this.port}`);
    });
  }
}

module.exports = Server;
