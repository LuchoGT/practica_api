const express = require('express');
const { check} = require('express-validator');
const router = express.Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt');



router.post('/register',
[
  //middlewares
  check('username', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser de 6 caracteres').isLength({min:6}),
  validarCampos
],
  crearUsuario
);
router.post('/',
[
  check("username", "El usuario es obligatorio").not().isEmpty(),
  check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
  validarCampos
],
  loginUsuario
);
router.get('/renew',
validatJWT,
 revalidarToken
);


module.exports = router;
