const mensajeModelo = require("../models/mensajeModelo");
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

const getUsuarios = async() => {
    const usuarios = await usuarioModel.find().sort('-online');
    return usuarios;
}

const grabarMensaje = async(payload) => {

    try {
        const mensaje = new mensajeModelo(payload);
        await mensaje.save();
        return mensaje;
    } catch (error) {
        //console.log(error);
        return false;
    }
}



module.exports = {
    usuarioConectado,
    disconnectUser,
    getUsuarios,
    grabarMensaje
}