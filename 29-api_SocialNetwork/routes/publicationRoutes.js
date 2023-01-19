//2.2.3 Rutas Publication:
const express = require('express');
const router = express.Router();
const PublicationController = require('../controllers/publicationController');

//Definir Rutas:
router.get("/prueba-publication", PublicationController.pruebaPublicationController);

//exportar el router:
module.exports = router;