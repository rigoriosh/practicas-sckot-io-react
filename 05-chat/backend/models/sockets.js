const { usuarioConectado, disconnectUser, getUsuarios, grabarMensaje } = require("../controllers/socketController");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets{

    constructor(io){

        this.io = io;
        this.socketsEvents()
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', async(socketCliente) => { 

            //console.log('Nuevo cliente socket conectado')
            const token = socketCliente.handshake.query['x-token'];
            const [valido , uid] = comprobarJWT(token);

            if (!valido) {
                //console.log('Socket no identificado')
                return socketCliente.disconnect();
            }

            const user = await usuarioConectado(uid);

            
            // TODO: Socket join 'unirse a una sala en particular'
            //crear una sala y agrego el usuario a esa sala
            socketCliente.join(uid)

            //console.log('cliente conectado', uid)
            // TODO: Validar JWT
            // Si el token no es valido, desconectar


            // TODO: Saber que usuario esta activo mediante UID que vienen en el token

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios())


            // TODO: escuchar cuando un cliente envia un mensaje
            // mensaje personal
            socketCliente.on('mensaje-personal', async(payload) => {
                const mensaje = await grabarMensaje(payload);
                // enviar al remitente el mensaje despues de averlo guardo en DB
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            });
            
            // TODO: emitir todos los usuarios conectados
            
            // TODO: Disconnect
            // Marcar en la DB que el usuario se desconecto
            socketCliente.on('disconnect', async()=>{
                //console.log('Cliente desconectado');

                await disconnectUser(uid)
                this.io.emit('lista-usuarios', await getUsuarios())
            })

            
         });
    }
}



module.exports = Sockets;