const { response, request } = require("express");
const bcrypjs = require("bcryptjs");
const Usuario = require("../models/usuario.js");

const usuariosGet = (req = request, res = response) => {
  const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  res.json({
    msg: "Get",
    q,
    nombre,
    apikey,
    page,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put API - controlador",
    id,
  });
};

const usuariosPost = async (req, res = response) => {
  //Recibe y muestra la información del JSON

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Verificar si el correo existe

  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(400).json({
      msg: "Ese correo ya está registrado",
    });
  }

  //Encriptar la contraseña
  const salt = bcrypjs.genSaltSync();
  usuario.password = bcrypjs.hashSync(password, salt);

  //Guardar en Base de Datos
  usuario.save();

  res.json({
    usuario,
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
