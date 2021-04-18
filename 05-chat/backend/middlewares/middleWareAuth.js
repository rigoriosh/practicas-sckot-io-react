const { check } = require("express-validator");
const { validarCampos } = require("./validar-campos");


const middlewaresLogin = [    
    check('email', `El 'email' es obligatorio`).isEmail(),
    check('password', `El campo 'password' es obligatorio y > a 6 caracteres`).isLength({min:6}),
    validarCampos
];

const middlewaresCrearUsuario = [
    check('nombre', `El campo 'nombre' es obligatorio`).not().isEmpty(),
    check('email', `El 'email' es obligatorio`).isEmail(),
    check('password', `El campo 'password' es obligatorio y > a 6 caracteres`).isLength({min:6}),
    validarCampos
];


module.exports = {
    middlewaresLogin,
    middlewaresCrearUsuario
}