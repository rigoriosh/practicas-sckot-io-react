const {response} = require('express');
const bcryptjs = require('bcryptjs');
const UsuarioModels = require('../models/usuarioModel');
const { errorAdmin, errorNotEmail, errorExisteEmail, wrongPassword } = require('../helpers/msgErrors');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async(req, res = response) => {
    //console.log('loginUsuario')
    const {email, password} = req.body
    try {
        /* verificar si el email no existe en la db */
        let usuarioModel = await UsuarioModels.findOne({email: email})
        if (!usuarioModel) return errorNotEmail(email, res);

        /* confirmar los passwords */
        const validaPassword = bcryptjs.compareSync(password, usuarioModel.password);
        if (!validaPassword) return wrongPassword(res);

        // generar jwt
        const token = await generarJWT(usuarioModel._id, usuarioModel.nombre);

        //res.json({ok: true, usuario: 'abc', place: 'login'})
        res.status(200).json({
            ok: true,
            usuario:{
                uid: usuarioModel._id,
                nombre: usuarioModel.nombre,
                online: usuarioModel.online,
            },
            token
        })
    } catch (error) {
        errorAdmin(error, res);
    }
}

const crearUsuario = async(req, res = response) => {    
    //console.log('crearUsuario')
    const {nombre, email, password} = req.body
    //console.log(req.body)
    try {
        /* verificar si el email no existe en la db */
        const existeEmail = await UsuarioModels.findOne({email});
        if (existeEmail)  return errorExisteEmail(email, res);
        
        const usuarioModel = new UsuarioModels(req.body);// instancia la coleccion de mongo
        
        //encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        usuarioModel.password = bcryptjs.hashSync(password, salt);

        await usuarioModel.save(); //guarda en la DB

        // generar jwt
        //console.log({usuarioModel})
        const token = await generarJWT(usuarioModel._id, usuarioModel.nombre);
    
        res.status(201).json({
            ok: true,
            uid: usuarioModel.id,
            user: {nombre, email},
            token
        })
        //res.json({ok: true, usuario: 'abc', place: 'crearUsuario'})
    } catch (error) {
        errorAdmin(error, res);
    }
}

const revalidarToken = async(req, res = response) => {
    //console.log('revalidarToken')
    const {uid, name} = req.payloadJWT;   
    /* generar nuevo token */
    const token = await generarJWT(uid, name);

    // Obtener el usuario por ID
    const usuario = await UsuarioModels.findById(uid);
    res.json({
        ok: true,
        token,
        usuario
    })
    //res.json({ok: true, usuario: 'abc', place: 'revalidarToken'})
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}