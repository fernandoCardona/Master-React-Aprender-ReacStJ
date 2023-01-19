//IMPORTAR DEPENDENCIAS Y MODULOS:
const Follow = require('../models/followModel');


//2.1.2 - Creamos los controller del Model follow:
//Accion de prueba:
const pruebaFollowController = (req, res) => {
    return res.status(200).send({
        msg: 'Mensaje enviado desde: el controllers/followController.js'
    })
};


module.exports =  {
    pruebaFollowController
}