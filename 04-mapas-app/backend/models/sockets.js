const MarcadoresList = require("./marcadoresList");


class Sockets{

    constructor(io){

        this.io = io;
        this.marcadores = new MarcadoresList();
        this.socketsEvents()
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', (clientSocket) => { 
            //console.log('Dispositivo cliente conectado', clientSocket.id)

            // TODO: marcadores-activos
            clientSocket.emit('marcadoresActivos', this.marcadores.activos);

            // TODO: marcador-nuevo
            clientSocket.on('marcadorNuevo', (marcador)=>{

                this.marcadores.agregarMarcador(marcador);
                /* 
                    ahora enviar el marcador a los demas clientes para que se
                    actualicen, para eso se usa el broadcast
                 */
                clientSocket.broadcast.emit('marcadorNuevo', marcador); 
            });

            // TODO: marcador-actualizado
            clientSocket.on('updateMarcador', (markador)=>{
                this.marcadores.updateMarcador(markador)
                clientSocket.broadcast.emit('updateMarcador', markador);
            });
            
        });
    }
}



module.exports = Sockets;