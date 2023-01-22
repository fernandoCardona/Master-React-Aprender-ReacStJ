//IMPORTAR MODELOS:
const Follow = require('../models/followModel');
const User = require('../models/userModel');
const followService = require('../services/followService');

//IMPORTAR DEPENDENCIAS:
const mongoosePaginate = require('mongoose-pagination');


//2.1.2 - Creamos los controller del Model follow:
//Accion de prueba:
const pruebaFollowController = (req, res) => {
    return res.status(200).send({
        msg: 'Mensaje enviado desde: el controllers/followController.js'
    })
};

//10.1.0- Accion de guardar Follow (accion seguir);
const saveFollow = ( req, res ) => {

    //Obtener datos por el body:
    const params = req.body;
    
    //Obtener id del usuario identificado:
    const userIdentity = req.user;

    //Crear objeto con followModel:
    let userToFollow = new Follow({
        user: userIdentity.id, //usuario que sigue
        followed: params.followed //usuario seguido
    });
    // userToFollow.user = userIdentity.id;
    // userToFollow.followed = params.followed;

    //Guardar objeto en bbdd:
    userToFollow.save( (error, followStored) => {
        if (error || !followStored) {
            return res.status(500).send({
                status: 'error',
                msg: 'Error, no se ha podido seguir al usuario'
            });
        }
        return res.status(200).send({
            status: 'success',
            identity: req.user,
            follow:followStored
        });
    })
            
}
//11.1.0- Accion de borrar Follow (accion dejar de seguir);
const unFollow = ( req, res ) => {
    //Obtener id del usuario identificado:
    const userIdentityId = req.user.id;
    //Obtener id del usuario que quiero dejar de seguir:
    const followedId = req.params.id;

    //Find de las coincidencias del usuario identificado y del usuario que sigo y quiero dejar de seguir:
    Follow.find({
        'user': userIdentityId,
        'followed': followedId
    }).remove(( error, followDeleted ) => {
        if (error || !followDeleted) {
            return res.status(500).send({
                status: 'error',
                msg: 'Error, no se ha podido Dejar seguir al usuario.'
            });
        }
        return res.status(200).send({
            status: 'success',
            msg: 'has eliminado el follow correctamente',
            // identity: req.user,
            // followDeleted
        })
    });
}
//12.1.0- Accion listado de usuarios que estoy siguiendo:
const following = ( req, res ) => {
    //Obtener id del usuario identidicado:
    let userIdentityId = req.user.id;

    //Obtener y comprobar id por parameto url:
    if ( req.params.id ) userIdentityId = req.params.id; 
    
    //Comprobar si m llega pagina, sino llega por defecto sera page 1:
    let page = 1;
    if ( req.params.page ) page = req.params.page; 

    //Usuarios por paagina que quiero mostrar:
    let itemsPerPage = 5;

    //find a follows, popular datos de los usuarios y paginamos con mongoose-pagination: 
    Follow.find( {user: userIdentityId} )
            // .populate('user followed', 'name surname avatarImg') //extrae solo estos campos
            .populate('user followed', '-password -userRole -__v -email') //Elimina estos campos 
            .paginate(page, itemsPerPage, async( error, follows, total ) => {

        //Obtener lista de usuarios k siguen a otro usuario m siguen a mi tambien:
        let followUserIds = await followService.followUserIds(req.user.id);
        //obtener array de ids de usuarios comunes:
        return res.status(200).send({
            status: 'success',
            msg: 'Listado de usuarios a los que sigo',
            total,
            pages: Math.ceil(total/itemsPerPage),
            follows, 
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
            
        });
    })
    
}
//13.1.0- Accion de usuarios que me siguen:
const followers = ( req, res ) => {
    //Obtener id del usuario identidicado:
    let userIdentityId = req.user.id;

    //Obtener y comprobar id por parameto url:
    if ( req.params.id ) userIdentityId = req.params.id; 
    
    //Comprobar si m llega pagina, sino llega por defecto sera page 1:
    let page = 1;
    if ( req.params.page ) page = req.params.page; 

    //Usuarios por paagina que quiero mostrar:
    let itemsPerPage = 5;

    //find a follows, popular datos de los usuarios y paginamos con mongoose-pagination: 
    Follow.find( {followed: userIdentityId} )
            // .populate('user followed', 'name surname avatarImg') //extrae solo estos campos
            .populate('user', '-password -userRole -__v -email') //Elimina estos campos 
            .paginate(page, itemsPerPage, async( error, follows, total ) => {

        //Obtener lista de usuarios k siguen a otro usuario m siguen a mi tambien:
        let followUserIds = await followService.followUserIds(req.user.id);

        //obtener array de ids de usuarios comunes:
        return res.status(200).send({
            status: 'success',
            msg: 'Listado de usuarios que me siguen',
            total,
            pages: Math.ceil(total/itemsPerPage),
            follows, 
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
            
        });
    })
}

module.exports =  {
    pruebaFollowController,
    saveFollow, 
    unFollow,
    following,
    followers
}