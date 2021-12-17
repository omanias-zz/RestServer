const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apiKey, page = 1, limit } = req.query;
  res.json({
    msg: "get API - controlador",
    q,
    nombre,
    apiKey,
    page,
    limit,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = (req, res = response) => {
  //Recibe y muestra la información del JSON
  const { nombre, edad } = req.body;

  res.json({
    msg: "post API - controlador",
    nombre,
    edad,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    msg: "delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
