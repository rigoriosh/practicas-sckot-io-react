

class MarcadoresList{

    constructor(){
        this.activos = {};
    }
    agregarMarcador(marcador){
        this.activos[marcador.id] = marcador;
        return marcador;
    }

    removeMarcador(id){
        delete this.activos[id];
    }

    updateMarcador(marcador){
        this.activos[marcador.id] = marcador;
    }
}

module.exports = MarcadoresList