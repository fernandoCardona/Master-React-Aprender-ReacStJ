const mongoose =require('mongoose');
//0.-Creamos una conexion mediante mongoose a la ruta de nuestra base de datos creada.
const conection = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mi_blog')
        //Parametros dentro de un objeto-> solo en caso de aviso
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        //useCreateIndex: true

        console.log(' Conectado correctamente a la base de datos mi_blog');

    } catch (error) {
        console.log(error);
        throw new Error('No se ha podido conectar a la base de datos');
    }
}

module.exports = {
    conection
};