const Banda = require("./band");

class BandList{

    constructor(){
        this.bandas = [
            new Banda('Metallica'),
            new Banda('Heroes del silencio'),
            new Banda('Bon Jovi'),
            new Banda('Breaking Bnejamin'),
        ]
    }

    addBanda(name){
        const newBanda = new Banda(name);
        this.bandas.push(newBanda);
        return this.bandas;
    }

    removeBanda(idBanda){
        this.bandas = this.bandas.filter(band => band.id !== idBanda);
        return this.bandas;
    }

    getBandas(){
        return this.bandas;
    }

    increaseVotes(idBanda){
       
        this.bandas = this.bandas.map(band =>{
            if(band.id === idBanda) band.votos += 1;

            return band
        });
        
        return this.bandas;
    }

    changeNameBanda(idBanda, newName){
        this.bandas = this.bandas.map(band =>{
            if(band.id === idBanda) band.name = newName;

            return band
        });
        return this.bandas;
    }
}


module.exports = BandList;