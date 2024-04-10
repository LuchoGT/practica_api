const { response } = require('express');
const Usuario = require("../models/user.model");
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/jwt')


const crearUsuario = async(req, res = response) => {

  const { username, password } = req.body;

  try {

    let usuario = await Usuario.findOne({username});

    if (usuario) {
      res.status(400).json({
        ok: false,
        msg: 'Ya existe un usuario con ese nombre',
      });
    }
    usuario = new Usuario(req.body);


    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();

    const token = await generarJWT(usuario.id, usuario.username);


    res.status(201).json({
      ok: true,
      uid:usuario.id,
      username:usuario.username,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Pls hable con el admin',
    });
  }


};

const loginUsuario = async(req, res = response) => {

  const { username, password } = req.body;

  try {
    let usuario = await Usuario.findOne({username});

    if (!usuario) {
      res.status(400).json({
        ok: false,
        msg: 'El usuario y password no existen',
      });
    }

    const validarPassword = bcrypt.compareSync(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok:false,
        msg: "Password incorrecto",
      })
    }

    const token = await generarJWT(usuario.id, usuario.username);


    res.status(200).json({
      ok: true,
      msg: 'login',
      uid:usuario.id,
      username: usuario.username,
      token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: 'Pls hable con el admin',
    });
  }

};

const revalidarToken = async(req, res = response) => {

  // const uid = req.uid;
  // const username= req.name;

  const {uid,name} = req;

  //Generar un nuevo JWT y retornarlo en esta peticion

  const token = await generarJWT(uid,name);

  res.json({
      ok:true,
      // uid,name,
      token,
  })
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
