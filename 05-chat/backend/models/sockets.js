const { usuarioConectado, disconnectUser } = require("../controllers/socketController");
const { comprobarJWT } = require("../helpers/jwt");


class Sockets{

    constructor(io){

        this.io = io;
        this.socketsEvents()
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', async(socket) => { 

            console.log(555555555)
            const token = socket.handshake.query['x-token'];
            const [valido , uid] = comprobarJWT(token);

            if (!valido) {
                console.log('Socket no identificado')
                return socket.disconnect();
            }

            const user = await usuarioConectado(uid);

            console.log('cliente conectado', uid)
            // TODO: Validar JWT
            // Si el token no es valido, desconectar


            // TODO: Saber que usuario esta activo mediante UID que vienen en el token

            // TODO: Emitir todos los usuarios conectados

            // TODO: Socket join 'unirse a una sala en particular'

            // TODO: escuchar cuando un cliente envia un mensaje
            // mensaje personal

            
            // TODO: emitir todos los usuarios conectados
            
            // TODO: Disconnect
            // Marcar en la DB que el usuario se desconecto
            socket.on('disconnect', ()=>{
                console.log('Cliente desconectado');

                disconnectUser(uid)
            })

            
         });
    }
}



module.exports = Sockets;