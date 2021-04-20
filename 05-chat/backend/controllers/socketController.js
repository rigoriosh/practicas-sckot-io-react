const usuarioModel = require("../models/usuarioModel")

const usuarioConectado = async(uid) => {
    const usuario = await usuarioModel.findById(uid); // llamo al usuario de la DB segun uid
    usuario.online = true; // modifico una de esas propiedas
    await usuario.save(); // guardo los cambios del user en la DB
    return usuario; // devuelvo añ front el usuario
}

const disconnectUser = async(uid) => {
    const usuario = await usuarioModel.findById(uid); // llamo al usuario de la DB segun uid
    usuario.online = false; // modifico una de esas propiedas
    await usuario.save(); // guardo los cambios del user en la DB
    return usuario; // devuelvo añ front el usuario
}



module.exports = {
    usuarioConectado,
    disconnectUser
}