const BandList = require("./band-list");


class Sockets{

    constructor(io){

        this.io = io;

        this.listaDeBandas = new BandList();

        this.socketsEvents();
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', (clientSocket) => { 
            console.log('Dispositivo cliente conectado', clientSocket.id)

            // emitir al cliente conectado todas las banas actuales
            clientSocket.emit('bandas-actuales', this.listaDeBandas.getBandas());


         });
    }
}



module.exports = Sockets;