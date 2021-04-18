const { response } = require("express");
const { validationResult } = require("express-validator");


const validarCampos = (req, res = response, next) => {

    // manejo de errores
    // esta funcion captura cualquier error que sucedio en los anteriores milddwares y realiza la respuesta
    const errors = validationResult(req);    
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();
}

module.exports = {
    validarCampos
}