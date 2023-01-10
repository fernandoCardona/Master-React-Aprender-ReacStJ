const express = require('express');
const router = express.Router();

const ArticleController = require('../controllers/articleController.js');

//10.-Creamos las rutas de Articles:

router.get( '/ruta-de-prueba', ArticleController.prueba );
router.get( '/curso', ArticleController.curso );

//11.1-creamos la ruta de crear;
router.post( '/crear', ArticleController.crear );

//12.1-Creamos ruta para obtener los articulos de la db:
router.get( '/articles/:ultimos?', ArticleController.getArticles );

//13.1-Creamos ruta para obtener un articulo de la db:
router.get( '/article/:id', ArticleController.getSingleArticle );

//14.1-Creamos ruta para borrar un articulo de la db:
router.delete( '/article/:id', ArticleController.deleteArticle );

module.exports = router;