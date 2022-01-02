const { response, request } = require("express");
const bcrypjs = require("bcryptjs");
const Usuario = require("../models/usuario.js");

const usuariosGet = async (req = request, res = response) => {
  //From y to muestran desde y hasta que registro se pueden ver.
  //http://localhost:8080/api/usuarios?from=5&limit=10 (muestra resultados del 5 al 10)

  const { to = 5, from = 0 } = req.query;

  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(from)).limit(Number(to)),
  ]);

  res.json({ total, usuarios });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...rest } = req.body;

  //TODO validar contra base de datos

  if (password) {
    //Encriptar la contraseña
    const salt = bcrypjs.genSaltSync();
    rest.password = bcrypjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest);

  //Respuesta
  res.json(usuario);
};

const usuariosPost = async (req, res = response) => {
  //Recibe y muestra la información del JSON

  const { nombre, correo, password, rol, estado } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol, estado });

  //Encriptar la contraseña
  const salt = bcrypjs.genSaltSync();
  usuario.password = bcrypjs.hashSync(password, salt);

  //Guardar en Base de Datos
  usuario.save();

  res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {
  //No elimina físicamente un usuario sino que actualiza el estado a false.
  const { id } = req.params;
  const uid = req.uid;
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
