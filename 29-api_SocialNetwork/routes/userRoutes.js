//2.2.1 Rutas User:
const express = require('express');
const router = express.Router();
const multer = require('multer');
const UserController = require('../controllers/userController');
const check = require('../middlewares/auth');

//Configuracion de subida de archivos:
const storage = multer.diskStorage({
    destination: (req, file, cd ) => {
        cd ( null, './upload/avatars/' );
    },
    filename:  (req, file, cb) => {
        cb( null, 'avatar-' + Date.now() + '-' + file.originalname );
    }
});

const uploads = multer({ storage});

//Definir Rutas:
router.get("/prueba-user", check.auth, UserController.pruebaUserController);

//RUTAS USER:
//3.1.3- Creamos la ruta 'Register' para user:
router.post("/register", UserController.register);
//4.1.1- Creamos la ruta 'login' para user:
router.post("/login", UserController.login);
//5.1.1- Creamos la ruta 'userProfile' para user:
router.get("/userProfile/:id", check.auth, UserController.userProfile);
//6.1.1- Creamos la ruta 'usersList' para user:
router.get("/userList/:page?", check.auth, UserController.usersList);
//7.1.1- Creamos la ruta 'userUpdate' para user:
router.put("/userUpdate", check.auth, UserController.userUpdate);
//8.1.1- Creamos la ruta 'userUpload' para user:
router.post("/userUpload", [check.auth, uploads.single('file0')], UserController.userUpload);
//9.1.1- Creamos la ruta 'userShowAvatar' para user:
router.get("/userShowAvatar/:file", UserController.userShowAvatar);

router.get("/counters/:id", check.auth, UserController.counters);



//exportar el router:
module.exports = router;