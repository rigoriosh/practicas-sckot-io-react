const {v4: uuidv4} = require('uuid');

class Banda{

    constructor(name){

        this.id     = uuidv4();
        this.name   = name;
        this.votos  = 0;

    }
}

module.exports = Banda;