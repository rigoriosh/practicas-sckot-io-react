

class Sockets{

    constructor(io){

        this.io = io;
        this.socketsEvents()
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', (clientSocket) => { 
            console.log('Dispositivo cliente conectado', clientSocket.id)
            
            const payload = 'Bienvenido ....'
            clientSocket.emit('mensaje-prueba', payload);
        
            clientSocket.on('msg-test', (payload)=>{
                console.log('mi payload', payload)
            })
        
            clientSocket.on('msg-from-client', (data)=>{
                console.log(data);
                //clientSocket.emit('msg-from-server', data)//con clientSocket se envia a todos los dispositivios q estan conectados al server
                this.io.emit('msg-from-server', data)//con io se envia a todos los dispositivios q estan conectados al server
            })
         });
    }
}



module.exports = Sockets;