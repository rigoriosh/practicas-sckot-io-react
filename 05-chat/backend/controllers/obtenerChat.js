const { response, request } = require("express");
const { idInvalidError, errorAdmin } = require("../helpers/msgErrors");
const mensajeModelo = require("../models/mensajeModelo");
const UsuarioModel = require("../models/usuarioModel");


const getMensajes = async(req = request, res = response) => {

    try {
        
        const {uid, name} = req.payloadJWT;   
        const mensajesDe = req.params.de
        /* console.log({mensajesDe})
        console.log({uid}) */
        // Obtener el usuario por ID
        const usuario = await UsuarioModel.findById(uid);
        //console.log({usuario})
        if (!usuario) return idInvalidError(res)
    
        const ultimos30Mensajes = await mensajeModelo.find({
            $or: [ // condicion de tipo or que coincida con el primer o segundo objeto
                {
                    de: uid, 
                    para: mensajesDe
                },
                {
                    de: mensajesDe,
                    para: uid
                }
            ]
        })
        .sort({createAt: 'desc'}) // los ordena de forma ascendente
        .limit(30); // y trae maximo 30 registros
    
        res.status(200).json({
            ok: true,
            mensaje: 'hi',
            mensajesDe,
            payloadJWT: {uid, name},
            ultimos30Mensajes
        });
    } catch (error) {
        errorAdmin(error, res);
    }

}


module.exports = {
    getMensajes
}

