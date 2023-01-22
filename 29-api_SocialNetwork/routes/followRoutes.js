//2.2.2 Rutas Follow:
const express = require('express');
const router = express.Router();
const FollowController = require('../controllers/followController');
const check = require('../middlewares/auth');

//Definir Rutas:
router.get("/prueba-follow", FollowController.pruebaFollowController);

//RUTAS FOLLOW:
//10.1.1- Creamos la ruta 'saveFollow' para seguir a un user:
router.post("/saveFollow", check.auth, FollowController.saveFollow);

//11.1.1- Creamos la ruta 'unFollow' para dejar de segir a un user:
router.delete("/unFollow/:id", check.auth, FollowController.unFollow);

//12.1.1- Creamos la ruta 'following' para user:
router.get("/following/:id?/:page?", check.auth, FollowController.following);

//13.1.1- Creamos la ruta 'followers' para user:
router.get("/followers/:id?/:page?", check.auth, FollowController.followers);

//exportar el router:
module.exports = router;