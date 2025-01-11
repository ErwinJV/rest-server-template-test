const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {
  constructor() {
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';
    this.productPath = '/api/products';
    this.mediaPath = '/api/media';
    this.categoryPath = '/api/categories';
    this.app = express();
    this.port = process.env['PORT'] || 3000;
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public'));
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usersPath, require('../routes/user'));
    this.app.use(this.productPath, require('../routes/product'));
    this.app.use(this.mediaPath, require('../routes/media'));
    this.app.use(this.categoryPath, require('../routes/category'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running at port ${this.port}`);
    });
  }
}

module.exports = Server;
