//0-Iportar dependencias:
const { connection } = require('./database/connection');
const express = require('express');
const cors = require('cors');

//1.1-Conexion base de datos:
connection();
//1.2-Crear servidor node:
const app = express();
const port = 3900;

//1.3-Configurar Cors:
app.use(cors());

//1.4-Convertir los datos del body a objetos js:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//2.3.1-Importamos y Cargar configuracion de rutas:
const UserRoutes = require('./routes/userRoutes');
app.use('/api/user', UserRoutes);

const FollowRoutes = require('./routes/followRoutes');
app.use('/api/follow', FollowRoutes);

const PublicationRoutes = require('./routes/publicationRoutes');
app.use('/api/publication', PublicationRoutes);

// app.get('/test-route', (req, res) => {
//     return res.status(200).json({
//         'id': 1,
//         'nombre': 'Fernando Cardona',
//         'web': 'fernandocardonaweb.com'
//     })
// });

//1.6-Poner servidor a escuchar peticiones:
app.listen(port, () => {
    console.log('Node server runing at port: ', port);
})