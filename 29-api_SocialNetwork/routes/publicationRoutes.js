//2.2.3 Rutas Publication:

//IMPORTAR DEPENDENCIAS: 
const express = require('express');
const router = express.Router();
const multer = require('multer');


const PublicationController = require('../controllers/publicationController');
const check = require('../middlewares/auth');


//Configuracion de subida de archivos:
const storage = multer.diskStorage({
    destination: (req, file, cd ) => {
        cd ( null, './upload/publications/' );
    },
    filename:  (req, file, cb) => {
        cb( null, 'pub-' + Date.now() + '-' + file.originalname );
    }
});

const uploads = multer({ storage});


//Definir Rutas:
router.get("/prueba-publication", PublicationController.pruebaPublicationController);

//RUTAS PUBLICATIONS:
//14.1.1- Creamos la ruta 'savePublication':
router.post("/savePublication", check.auth, PublicationController.savePublication);
//15.1.1- Creamos la ruta 'showPublication':
router.get("/showPublication/:id", check.auth, PublicationController.showPublication);
//16.1.1- Creamos la ruta 'deletePublication':
router.delete("/deletePublication/:id", check.auth, PublicationController.deletePublication);
//17.1.1- Creamos la ruta 'suserPublication':
router.get("/userPublication/:id/:page?", check.auth, PublicationController.userPublication);
//18.1.1- Creamos la ruta 'feedPublications' para user:
router.get("/feedPublications/:page?", check.auth, PublicationController.feedPublications);
//19.1.1- Creamos la ruta 'publicationUpload' para publication:
router.post("/publicationUpload/:id", [check.auth, uploads.single('file0')], PublicationController.publicationUpload);
//20.1.1- Creamos la ruta 'userShowAvatar' para publication:
router.get("/publicationShowMulti/:file", PublicationController.publicationShowMulti );

 


//exportar el router:
module.exports = router;