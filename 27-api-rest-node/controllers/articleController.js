
const validator = require('validator');
const Article = require('../models/Article');
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
const crear = (req, res) => {

    //Recoger los datos por post
    let params = req.body;
    //Validar datos
    try {
        let validar_title = !validator.isEmpty(params.title) && 
                            validator.isLength(params.title, { min:5, max: undefined});
        let validar_content = !validator.isEmpty(params.content);

        if ( !validar_title || !validar_content) {
            throw new Error('No se ha validado la informacion!!');
        }

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Error en validacion',
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

//1.-Metodo para borrar un solo articulo:
const  deleteArticle = (req, res) => {
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


module.exports = {
    prueba,
    curso, 
    crear,
    getArticles,
    getSingleArticle,
    deleteArticle
};