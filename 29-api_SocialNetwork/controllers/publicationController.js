//IMPORTAR DEPENDENCIAS Y MODULOS:
const Publication= require('../models/PublicationModel');



//2.1.3- Creamos los controller del Model publication:
//Accion de prueba:
const pruebaPublicationController = (req, res) => {
    return res.status(200).send({
        msg: 'Mensaje enviado desde: el controllers/publicationController.js'
    })
};


module.exports =  {
    pruebaPublicationController
}