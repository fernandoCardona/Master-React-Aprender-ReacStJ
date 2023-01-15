const express = require('express');
//17.2-Importamos el paquete de Multer
const multer = require('multer');

const router = express.Router();
//17.3-almacenamiento de imagenes:
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/articles/');
    },

    filename: (req, file, cb) => {
        cb(null, 'article' + Date.now() + file.originalname);
    }
})
const uploadImage = multer({storage: imageStorage});

const ArticleController = require('../controllers/articleController.js');

//10.-Creamos las rutas de Articles:

router.get( '/ruta-de-prueba', ArticleController.prueba );
router.get( '/curso', ArticleController.curso );

//11.1-creamos la ruta de crear;
router.post( '/create', ArticleController.create );

//12.1-Creamos ruta para obtener los articulos de la db:
router.get( '/articles/:ultimos?', ArticleController.getArticles );

//13.1-Creamos ruta para obtener un articulo de la db:
router.get( '/article/:id', ArticleController.getSingleArticle );

//14.1-Creamos ruta para borrar un articulo de la db:
router.delete( '/article/:id', ArticleController.deleteArticle );

//15.1-Creamos ruta para editar un articulo de la db:
router.put( '/article/:id', ArticleController.editarArticle );

//17.1-Creamos ruta para una imagen al article con 'MULTER':
router.post( '/add-image/:id', [ uploadImage.single('file0') ], ArticleController.addImageArticle );

//18.1-Creamos ruta para mostrar una imagen:
router.get( '/image/:imageFile', [ uploadImage.single('file0') ], ArticleController.showImageArticle );

//19.1-Creamos ruta para mostrar una imagen:
router.get( '/search/:searchString', ArticleController.searchArticle );


module.exports = router;