
const validator = require('validator');
const fs = require('fs');
const path = require('path');
const Article = require('../models/Article');
const { validarArticle } = require('../helpers/validarArticle');
//9.-Creamos las funciones del controlador de Articles
const prueba = (req, res) => {

    return res.status(200).json({
        mensaje: 'Soy una accion de prueba en mi controlador de articles'
    })

};

const curso = (req ,res) =>{
    console.log('se ha ejecutado el ENPOINT /curso');
    return res.status(200).json([
        {
            curso: 'Master en React',
            autor: 'Fernando Cardona',
            url: 'http://fernandocardonaweb.com'        
        },
        {
            curso: 'Master en Node',
            autor: 'Fernando Cardona',
            url: 'http://fernandocardonaweb.com'        
        }
    ])
};

//11.-Creamos el Controlador para crear articles nuevos:
const create = (req, res) => {

    //Recoger los datos por post
    let params = req.body;
    console.log('params_recibidos: ', params)
    //Validar datos
    try {
        //16.1-HELPER Validar el params:
        validarArticle(params);

    } catch (error) {
        return res.status(404).json({
            mensaje: 'Error en validacion Backend',
            status: 'error' 
        });
    }

    //Crear objeto a guardar
    //const article = new Article();
    //asignar valores de forma manual o automatica
        //asignacion manual:
        // article.title = params.title;
        // article.content = params.content;

        //Asignacion automatica:
        const article = new Article(params)

    //guardar el articulo en la base de datos:
    article.save( (error, articleGuardado) => {
        if (error || !articleGuardado ) {
            return res.status(400).json({
                mensaje: 'Error no se ha guardo el articulo',
                status: 'error' 
            });
        }
    

        //Devolver resultado

        return res.status(200).json({
            status: 'success',
            article: articleGuardado,
            mensaje: 'articulo creado con exito!!'
            
        })
    });
};

//12.-Metodo para obtener los articulos:
const getArticles = (req, res) => {
  
        let consulta = Article.find({});
        //Filtro limitede articlulos:
        if (req.params.ultimos) {
            consulta.limit(3);
        }
        
        //Filtro orden articlulos:
        consulta.sort({date: -1})
                .exec((error, articles) => {
        
                if (error || !articles ) {
                    return res.status(404).json({
                        mensaje: 'Error no se ha encontrado articulos',
                        status: 'error' 
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    //params_url:req.params.ultimos,
                    counter: articles.length,
                    articles
                });
            
        });

   

}
//13.-Metodo para obtener un solo articulo:
const getSingleArticle = (req, res) => {
    //Obtener un id por la url:
    let id = req.params.id
    //Buscar articulo por su id:
    Article.findById( id, (error, article) => {
        //Si no existe devolver un error:
        if (error || !article ) {
            return res.status(404).json({
                mensaje: 'Error no se ha encontrado el articulo',
                status: 'error' 
            });
        }
        //Devolver resultado:
        return res.status(200).send({
            status: 'success',
            article
        });


    });
    
}

//14.-Metodo para borrar un solo articulo:
const deleteArticle = (req, res) => {
    //Obtener un id por la url:
    let id = req.params.id
    //Buscar articulo por su id:
    Article.findOneAndDelete({_id:id}, (error, articleBorrado) => {
        if (error || !articleBorrado ) {
            return res.status(400).json({
                mensaje: 'Error no se ha borrado el articulo',
                status: 'error' 
            });
        }

        //Devolver resultado:
        return res.status(200).json({
            status: 'success',
            article: articleBorrado,
            mensaje: 'Articulo borrado',
        });
    });
}
//15.-Metodo para borrar un solo articulo:
const editarArticle = (req, res) => {
    //Obtener un id por la url:
    let id = req.params.id;
    //Obtener datos del body del articulo:
    let params = req.body;
    //Validar los datos:
    try {
        //16.1-HELPER Validar el params:
        validarArticle(params);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en validacion',
            status: 'error' 
        });
    }
    //Buscar y actualizar articulo:
    Article.findOneAndUpdate({_id:id}, params, {new: true}, (error, articleActualizado) => {
        if (error || !articleActualizado ) {
            return res.status(500).json({
                mensaje: 'Error no se ha editado el articulo correctamente',
                status: 'error' 
            });
        }
        //Devolver resultado:
        return res.status(200).json({
            status: 'success',
            article: articleActualizado,
            mensaje: 'Articulo actualizado',
        });
    })
}

//17-Subir una imagen al article con 'MULTER':
const addImageArticle = (req, res) => {
    //Configurar Multer para la subida de archivos:

    //Obtenemos el fichero de la imagen subida:
    if ( !req.file && !req.files) {
        return res.status(404).json({
            mensaje: 'Error, peticion invalida',
            status: 'error' 
        });
    }
    //Obtener nombre del archivo:
    let fileName = req.file.originalname;
    //Obtener extension del archivo:
    let fileNameSplit = fileName.split('\.');
    let fileNameExtension = fileNameSplit[1];
    //Comprobamos que es la extension corecta:
    if (fileNameExtension != 'png' &&
        fileNameExtension != 'jpg' &&
        fileNameExtension != 'jpeg' &&
        fileNameExtension != 'gif' 
    ) {
        //Borrar archivo no valido:
        fs.unlink(req.file.path, (error) => {
            return res.status(400).json({
                mensaje: 'Error, la extension del archivo no es valida',
                status: 'error' 
            });
        })
    }else {
        //Actualizamos el Articleen la db:
            //Obtener un id por la url:
            let id = req.params.id;
            console.log(req.file.filename)
            //Buscar y actualizar articulo:
            Article.findOneAndUpdate({_id:id}, { image: req.file.filename }, {new: true}, (error, articleActualizado) => {
                if (error || !articleActualizado ) {
                    return res.status(500).json({
                        mensaje: 'Error no se ha editado el articulo correctamente',
                        status: 'error' 
                    });
                }
                //Devolver resultado:
                return res.status(200).json({
                    status: 'success',
                    article: articleActualizado,
                    ficherosubido: req.file,
                    mensaje: 'Imagen subida correctamente',
                });
            })
    }
    
}

//18-Subir una imagen al article con 'MULTER':
const showImageArticle = (req, res) => {
    //Obtenemos el archivo-imagen que queremos mostrar:
    let imageFile = req.params.imageFile;
    let imagePathFile = './images/articles/' + imageFile;
    //Buscamos el archivo en la carpeta images:
    fs.stat(imagePathFile, (error, exist) => {
        if (exist) {
            return res.sendFile(path.resolve(imagePathFile))
        }else {
            return res.status(404).json({
                mensaje: 'La imagen no existe',
                status: 'error' 
            });
        }
    })
}

//19-Buscar article en la db:
const searchArticle = (req, res) => {
    //Obtener el String de busqueda:
    let searchString = req.params.searchString;
    //Find OR:
    Article.find({'$or': [
        {'title':{ '$regex': searchString, '$options': 'i'}},
        {'content':{ '$regex': searchString, '$options': 'i'}},
    ]})
    .sort({ date: -1 })
    .exec( ( error, articlesFinded ) => {
        if ( error || !articlesFinded || articlesFinded.length <= 0) {
            return res.status(404).json({
                mensaje: 'Articulos no encontrados',
                status: 'error' 
            });

        }else {
            //Devolver resultado:
            return res.status(200).json({
                status: 'success',
                articles: articlesFinded,
                mensaje: 'Imagen subida correctamente',
            });
        }
        
    })

    

}



module.exports = {
    prueba,
    curso, 
    create,
    getArticles,
    getSingleArticle,
    deleteArticle,
    editarArticle,
    addImageArticle,
    showImageArticle,
    searchArticle 
};