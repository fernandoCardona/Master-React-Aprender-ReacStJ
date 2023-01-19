//2.2.1 Rutas User:
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const check = require('../middlewares/auth')

//Definir Rutas:
router.get("/prueba-user", check.auth, UserController.pruebaUserController);
//3.1.3- Creamos la ruta 'Register' para user:
router.post("/register", UserController.register);
//4.1.1- Creamos la ruta 'login' para user:
router.post("/login", UserController.login);
//5.1.1- Creamos la ruta 'userProfile' para user:
router.get("/userProfile/:id", check.auth, UserController.userProfile);
//6.1.1- Creamos la ruta 'usersList' para user:
router.get("/userList/:page?", check.auth, UserController.usersList);
//6.1.1- Creamos la ruta 'usersList' para user:
router.put("/userUpdate", check.auth, UserController.userUpdate);


//exportar el router:
module.exports = router;