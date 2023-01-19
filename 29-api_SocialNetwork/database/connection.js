const mongoose =require('mongoose');

//1.1.1- Creamos una funcion async de conexion:
const connection = async() => {
    try {

        //Primer parametro es String de conexion - Segundo parametro opcional para las opciones de conexion:
        await mongoose.connect( 'mongodb://127.0.0.1:27017/my_socialNetwork' );
        console.log('Conectado correctamente a la db: my_social_network');

    } catch (error) {

        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');

    }
}

module.exports =  {
    connection
}