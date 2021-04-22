/* config mongoDb */
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        //console.log('Db online')
    } catch (error) {
        //console.log(error);
        throw new Error('Error in data base see logs')
    }
}

module.exports = {
    dbConnection
}