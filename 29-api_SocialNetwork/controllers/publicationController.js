//IMPORTAR DEPENDENCIAS:
const mongoosePaginate = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');

//IMPORTAR MODELOS:
const Publication = require('../models/PublicationModel');
const User = require('../models/userModel');
const followService = require('../services/followService');




//2.1.3- Creamos los controller del Model publication:
//Accion de prueba:
const pruebaPublicationController = (req, res) => {
    return res.status(200).send({
        msg: 'Mensaje enviado desde: el controllers/publicationController.js'
    })
};

//14.1.0- Guardar Publicaciones:
const savePublication = (req, res) => {
    //Recoger datos del body:
    const params = req.body;

    //Sino llegan dar respuesta negativa:
    if (!params.text) {
        return res.status(400).send({
            status: 'error',
            msg: 'Debes enviar el texto de la publicacion.'
        });
    }
    //Crear y rellenar el objeto del modelo:
    let newPublication = new Publication(params);
    newPublication.user = req.user.id;

    //Guardar objeto publicacion en la bbdd:
    newPublication.save( ( error, publicationStored ) => {
        if ( error || !publicationStored ) {
            return res.status(400).send({
                status: 'error',
                msg: 'No se ha guardado la publicacion.'
            });
        }
        //Devolver respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Publicacion guardada.',
            publicationStored
        });

    })
    
};

//15.1.0- Sacar una publicacion concreta:
const showPublication = (req, res) => {
    //Obtener id de la publicacion de la url:
    const publicationId = req.params.id;
    //Find con la condicion del id:
    Publication.findById( publicationId, (error, publicationStored) => {
        if ( error || !publicationStored ) {
            return res.status(404).send({
                status: 'error',
                msg: 'No se ha encontrado la publicacion.',
            });
        }
    

        //Devolver respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'mostrar una publicacion.',
            publication: publicationStored
        });
    });


    
}
//16.1.0- Eliminar publicaciones:
const deletePublication = (req, res) => {
    //Obtener id de la publicacion de la url:
    const publicationId = req.params.id;
    //Find con la condicion del id:
    Publication.find( {'user':req.user.id, '_id':publicationId}).remove(error => {
        if (error) {
            return res.status(404).send({
                status: 'error',
                msg: 'No se ha encontrado la publicacion a eliminar.',
            });
        }
    
        //Devolver respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Publicacion eliminada correctamente.',
            publication: publicationId
        });  
    });
}

//17.1.0- Listar publicaciones de un ususario:
const userPublication = (req, res) => {
    //Obtener id del usuario de la url:
    let userIdentityId = req.user.id;

    //Comprobar si m llega pagina, sino llega por defecto sera page 1:
    let page = 1;
    if ( req.params.page ) page = req.params.page; 

    //Find, populate, ordenar y paginar con la condicion del id:
    let itemPerPage = 5;
    Publication.find({'user':req.user.id})
                .sort("-createAt") //Ordenado de mas nueva a mas antigua
                .populate('user', '-password -__v -userRole -email')
                .paginate( page, itemPerPage, (error, publications, total) => {
                    if (error || !publications || publications.length <= 0) {
                        return res.status(404).send({
                            status: 'error',
                            msg: 'No se ha encontrado la publicaciones de este usuario.',
                        });
                    }
                    //Devolver respuesta:
                    return res.status(200).send({
                        status: 'success',
                        msg: 'Publicacion de un usuario.',
                        total,
                        pages: Math.ceil(total/itemPerPage),
                        publications: publications
                    });
                })
                //.exec();

    
}

//18.1.0- Listado de todas las publicaciones:
const feedPublications = async( req, res ) => {
    //Obtener la pagina actual:
    let page = 1;
    if ( req.params.page ) {
        page = req.params.page;
    }
    //Establecer numero de elementos por pagina:
    let itemsPerPage = 5;
    //Array de ids limpios de los usarios que nosotros seguimos:
    try {
        const myFollows = await followService.followUserIds( req.user.id );

        //Find de las publicaciones de los usarios logeados, ordenar, popular, paginar:
        const publications = await Publication.find({
            user: myFollows.following
            //user: {'$in': myFollows.following}
        }).populate('user', '-password -userRole -__v -email')
        .sort('-createAt')
        .paginate(page, itemsPerPage, (error, publications, total) => {
            if( error || !publications ) {
                return res.status(500).send({
                    status: 'error',
                    msg: 'no se han listado las publicaciones del feed.'
                }); 
            }
            //Devolver respuesta:
            return res.status(200).send({
                status: 'success',
                msg: 'Feed de todas las publicaciones.',
                following: myFollows.following,
                total,
                page,
                pages: Math.ceil(total/itemsPerPage),
                publications
            });
        });
        
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            msg: 'no se han listado las publicaciones del feed.'
        });
    }
    
    //Find de las publicaciones de los usarios logeados, ordenar, popular, paginar:


    
}

//19.1.0- Subir Ficheros:
const publicationUpload = ( req, res ) => {
    //Obtenemos id de la publicacion:
    const publicationId = req.params.id;
    //Obtener fichero imagen y combrobar que existe:
    if (!req.file) {
        return res.status(400).send({
            status: 'error',
            msg: 'Peticion no incluye imagen.'
        });
    }
    //Obtener nombre del archivo:
    let avatarImg = req.file.originalname;

    //Obtener extension del archivo:
    const imageSplit = avatarImg.split('\.');
    const extension = imageSplit[1];

    //Comprovamos extension del archivo:
    if ( extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif' && extension != 'mp4' && extension != 'pdf' ) {

        const filePath = req.file.path;
        //Si la extension no es correcta borramos el archivo:
        const fileDeleted = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: 'error',
            msg: 'extension del archivo invalida.'
        });

    }
    
    //Si la extension es correcta, guardamos la imagen en la base de datos:
    Publication.findOneAndUpdate( {'user': req.user.id, '_id': publicationId}, {file: req.file.filename}, {new: true}, (error, publicationUpdated) => {

        if (error || !publicationUpdated) {
            return res.status(500).send({
                status: 'error',
                msg: 'Error en la subida del avatar.'
            });
        }
        //Devolver Respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Metodo de Subida imagenes.', 
            publication: publicationUpdated,
            file: req.file
        });
    })  
}

//20.1.0- Devolver archivos multimedia:
const publicationShowMulti = ( req, res ) => {
    //Obtener parametro de la url:
    const file = req.params.file;
    //Montar el path real de la avatarImg:
    const filePath = './upload/publications/' + file;
    //Comprovar que avatarImg existe:
    fs.stat( filePath, ( error, exists ) => {
        if ( !exists ) {
            return res.status(404).send({
                status: 'error',
                msg: 'No existe la archivos multimedia en la publicacion.' 
            });
        }
        //Devolver Respuesta con la avatarImg:
        return res.sendFile(path.resolve( filePath ));
    });
    //devolvemos el file avatarImg:

    
}


module.exports =  {
    pruebaPublicationController,
    savePublication,
    showPublication,
    deletePublication,
    userPublication,
    feedPublications,
    publicationUpload,
    publicationShowMulti 
}