const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
    const {q,nombre = 'No name',apikey,page="1",limit="20"} = req.query
  res.json({
    msg: "get API ~ controller",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usersPost = (req, res = response) => {
    const body = req.body
  res.json({
    msg: "post API ~ controller",
    body 
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API ~ controller",
  });
};

const usersPut = (req, res = response) => {
    const id = req.params.id
  res.json({
    msg: "put API ~ controller",
    id
  });
};

module.exports = {
  usersGet,
  usersDelete,
  usersPut,
  usersPost,
};
