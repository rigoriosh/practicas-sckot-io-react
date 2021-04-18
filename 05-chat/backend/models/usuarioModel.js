/*  ya estando conectado con la DB se realiza un modelo que viene siendo la estructuración de una tabla.
    para cada tabla se debe crear un modelo.
    Estos modelo se utilizan en los controladores
 */
    const { Schema, model } = require("mongoose");


    const UsuarioSchema = Schema({ // el schema es la representación un tabla dentro de la DB con sus columnas que llevara
        nombre:{ //columna de la coleccion y sus caracteristicas
            type: String,
            required: true
        },
        email:{ //columna de la coleccion y sus caracteristicas
            type: String,
            required: true,
            unique: true
        },
        password: { //columna de la coleccion y sus caracteristicas
            type: String,
            required: true
        },
        online:{
            type: Boolean,
            default: false
        }
    });
    /* forma de modificar el nombre de los campos que retorna la db */
    UsuarioSchema.method('toJSON', function () {
        const {__v, _id, password, ...object} = this.toObject(); // retira del la respuesta la propiedad password, para q no sea retornada al usuario
        object.idRegisro = _id; //agrega el campo idRegistro en el obj
        return object;
    })
    /* 
        Modelo y creacion de la tabla en db, en este caso la tabla (o de ahora en adelante collection), se llama 'UsuarioSchema'
     */
    module.exports=model('UsuarioSchema', UsuarioSchema); 