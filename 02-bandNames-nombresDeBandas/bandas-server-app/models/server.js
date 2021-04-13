const express   = require('express');
const http      = require('http');
const socketio  = require('socket.io')
const path      = require('path');
const Sockets   = require('./sockets');
const cors      = require('cors');

class Server {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);

        this.io = socketio(this.server,{/* configuraciones pendientes */}); // Configuración del socket server
    }

    middlewares(){
        //desplega directorio publico
        this.app.use(express.static(path.resolve(__dirname, '../public')));

        //CORS
        this.app.use(cors())
    }

    configuracionSockets(){
        new Sockets(this.io);
    }

    execute(){        
        
        // Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.configuracionSockets()

        // Inicializar server
        this.server.listen(this.port, () => {console.log(`Servidor corriendo en el puerto ${this.port}`)});
    }
}

module.exports = Server;