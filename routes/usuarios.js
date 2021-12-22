const { Router } = require("express");
const { check } = require("express-validator");
const { esRoleValido } = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener 6 carácteres al menos").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),

    //Verifica en la base de datos que coincida el rol.
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
