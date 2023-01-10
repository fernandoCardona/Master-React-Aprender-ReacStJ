const express = require('express');
const cors = require('cors');
const { conection } = require('./dataBase/conection');
//1.-Inicializar app:
console.log('Hola que tal?');
//2.-Conectar a la base de datos:
conection();
//3.-Crear servidor node con express:
const app = express();
const puerto = 3900;
//4.-Configuracion de cors:
app.use(cors());
//5.-Convertir body a un objeto js:
app.use(express.json()); //para recibir datos json
app.use(express.urlencoded({extended: true})); //para recibir datos de formulario
//6.-Crear rutas:
const routes_article = require('./routes/articleRoute');
//6.1-Cargamos las routes:
app.use('/api', routes_article);



app.get('/', (req,res) => {
    console.log('se ha ejecutado el ENPOINT /probando');
    return res.status(200).send(`
        <div>
            <h1>Probando rutas '/'</h1>
        </div>
    `)
    
});

//7.-Crear servidor y escuchar peticiones en un puerto concreto:
app.listen(puerto, () =>{
    console.log('servidor funcionando en el puerto: ' + puerto);
});