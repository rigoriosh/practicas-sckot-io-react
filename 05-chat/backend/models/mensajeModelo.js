/*  ya estando conectado con la DB se realiza un modelo que viene siendo la estructuración de una tabla.
    para cada tabla se debe crear un modelo.
    Estos modelo se utilizan en los controladores
 */
    const { Schema, model } = require("mongoose");


    const MensajeSchema = Schema({ // el schema es la representación un tabla dentro de la DB con sus columnas que llevara
        de:{ //columna de la coleccion y sus caracteristicas
            type: Schema.Types.ObjectId,
            ref: 'UsuarioSchema', //relación con la collection UsuarioSchema
            required: true
        },
        para:{ //columna de la coleccion y sus caracteristicas
            type: Schema.Types.ObjectId,
            ref: 'UsuarioSchema', //relación con la collection UsuarioSchema
            required: true
        },        
        mensaje: { //columna de la coleccion y sus caracteristicas
            type: String,
            required: true
        }
    },{
        timestamps: true // agrega la fecha de creación del registro
    });
    /* forma de modificar el nombre de los campos que retorna la db */
    MensajeSchema.method('toJSON', function () {
        const {__v, ...object} = this.toObject(); // retira del la respuesta la propiedad password, para q no sea retornada al usuario        
        return object;
    })
    /* 
        Modelo y creacion de la tabla en db, en este caso la tabla (o de ahora en adelante collection), se llama 'MensajeSchema'
     */
    module.exports=model('MensajeSchema', MensajeSchema); 