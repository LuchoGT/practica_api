const  mongoose = require('mongoose');

const dbConnection =  async()=>{

    try {
        mongoose.connect(process.env.DB_CNN)

        console.log('DB Practica Online');
    } catch (error) {
        console.log(error);
        throw new error('Error pipipi')
    }
}


module.exports={
    dbConnection
}
