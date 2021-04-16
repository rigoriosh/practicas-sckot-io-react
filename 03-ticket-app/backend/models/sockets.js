const TicketList = require("./ticket-list");


class Sockets{

    constructor(io){

        this.io = io;
        this.ticketList = new TicketList();
        this.socketsEvents()
    }

    socketsEvents(){
    
        // on connection
        this.io.on('connection', (clientSocket) => { 
            //console.log('Dispositivo cliente conectado', clientSocket.id)
            
        
            clientSocket.on('crearTicket', (payload, callback)=>{
                const nuevoTicket = this.ticketList.crearTicket();
                callback(nuevoTicket);
            })

            clientSocket.on('asignarTicket', (usuarioLocalStorage, callback)=>{
                
                const {agente, escritorio } = usuarioLocalStorage;
                const siguienteTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(siguienteTicket);

                this.io.emit('ultimos13', this.ticketList.ultimos13);
            })
        
            /* clientSocket.on('msg-from-client', (data)=>{
                console.log(data);
                //clientSocket.emit('msg-from-server', data)//con clientSocket se envia a todos los dispositivios q estan conectados al server
                this.io.emit('msg-from-server', data)//con io se envia a todos los dispositivios q estan conectados al server
            }) */
         });
    }
}



module.exports = Sockets;