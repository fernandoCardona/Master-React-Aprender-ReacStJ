//2.2.2 Rutas Follow:
const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/followController');

//Definir Rutas:
router.get("/prueba-follow", FollowController.pruebaFollowController);

//exportar el router:
module.exports = router;