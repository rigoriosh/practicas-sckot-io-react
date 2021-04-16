const Ticket = require('./ticket');

class TicketList {
    
    constructor(){

        this.ultimoTicket = 0;
        this.pendientes = [];
        this.asginados = [];
    }

    get siguienteNumero(){
        this.ultimoTicket ++;
        return this.ultimoTicket; 
    }

    // retornar los ultimos 3 tickets q se veran en las tarjetas y los 10 en el historial

    get ultimos13(){
        return this.asginados.slice(0,13);
    }

    crearTicket(){
        const nuevoTicket = new Ticket(this.siguienteNumero);
        this.pendientes.push(nuevoTicket);
        return nuevoTicket;
    }

    asignarTicket(agente, escritorio){
        if(this.pendientes.length === 0) return null;
        
        const siguienteTicket = this.pendientes.shift(); // envia el ultimo elemento del array y lo elimina del array
        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;
        this.asginados.unshift(siguienteTicket);
        return siguienteTicket;
    }

}


module.exports = TicketList;