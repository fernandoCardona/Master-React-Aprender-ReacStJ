//IMPORTAR DEPENDENCIAS Y MODULOS:
const bcrypt = require('bcrypt');
const mongoosePagination = require('mongoose-pagination');const multer = require('multer');
const fs = require('fs');
const path = require('path');


const User = require('../models/userModel');
const Follow = require("../models/followModel");
const Publication = require('../models/PublicationModel');

const userJWT = require('../services/userJWT');
const followService = require('../services/followService');
const validate = require("../helpers/validate");



//2.1.1 Creamos los controller del Model user:
//Accion de prueba:
const pruebaUserController = (req, res) => {
    return res.status(200).send({
        msg: 'Mensaje enviado desde: el controllers/userController.js',
       usuario: req.user 
    });
};
//3.1.2- Creamos el metodo 'Register' para user:
const register = (req, res) => {
    //Recoger valores de la peticion:
    let params = req.body;

    //Comprobar si los params required me lleguen bien (+validacion):
    if ( !params.name || !params.surname || !params.nick || !params.email || !params.password ) {

        return res.status(400).json({
            status: 'error',
            msg: 'Faltan datos por enviar.'
        });

    }
    //Validacion:
    try {
        validate(params);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            msg: 'Validacion no superada.'
        });
    }
    

    //Comprobacion de usuario duplicado:
    User.find({ 
        $or: [
          { email: params.email.toLowerCase() },
          { nick: params.nick.toLowerCase() }  
        ]
    }).exec(async (error, users) =>{
        if (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'error en la consulta de usuarios'
            });
        }
        if ( users && users.length >=1 ) {
            return res.status(200).send({
                status: 'succes',
                msg: 'El usuario ya existe'
            });
        }
        //Cifrar contraseña:
        let pwd = await bcrypt.hash( params.password, 10 );
        params.password = pwd;

        //Crear el oobj de usuario con la password cifraza
        let user_to_save = new User(params);

        //Guardar ususario en la base de datos:
        user_to_save.save( ( error, userStored ) => {
            if (error || !userStored) {
                return res.status(500).send({
                    status: 'error',
                    msg: 'error al guardar el usuarios'
                }); 
            }
            
            //Devolver resultado:
            return res.status(200).json({
                status: 'success',
                msg: 'Usuario Registrado correctamente.',
                user: userStored
                    
           
            });

        });    

    });
    

}
//4.1.0- Login de usuario:
const login = ( req, res ) => {
    //Recoger parametro del body que llegan en la peticion:
    const params = req.body;
    if ( !params.email || !params.password ) {
        return res.status(400).send({
            status: 'error',
            msg: 'Faltan datos por enviar'
        });
    }
    //Buscar en la base de datos si existe el usuario:
    User.findOne( {email: params.email})
        //Con el metodo '.select()' evitamos que nos devuelva la password en el objeto user que nos devuelve la consulta
        //.select({'password':0})
        .exec((error, user) => {
        if ( error || !user ) {
            return res.status(404).send({
                status: 'error',
                msg: 'El usuario no existe'
            });
        }
        //Comprobamos si la contraseña es correcta:
        const pwd = bcrypt.compareSync(params.password, user.password);
        if ( !pwd ) {
            return res.status(400).send({
                status: 'error',
                msg: 'No te has identificado correctamente'
            });
        }
        //4.2.0- Conseguir el token JWT:
        const token = userJWT.createToken(user);

        //Devolvemos los datos de usuario:
        return res.status(200).send({
            status:'success',
            msg: 'Te has identificado correctamente', 
            user: {
                id: user._id,
                name: user.name,
                nick: user.nick
            },
            token
        });

    });
    
}
//5.1.0- creamos el Profil del usuario:
const userProfile = ( req, res ) => {
    //Recibir el parametro de id del usuario:
    const id = req.params.id
    //Consulta para obtener los datos del usuario:
    User.findById(id)
        .select({password:0})
        .exec( async(error, userProfile) => {
        if ( error || !userProfile ) {
            return res.status(404).send({
                status: 'error',
                msg: 'El usuario no existe o hay un error'
            });
        }

        //Informacion de seguimiento:
        const followInfo = await followService.followThisUser( req.user.id, id )
        //Devolver resultado:
        return res.status(200).send({
            status: 'success',
            user: userProfile,
            following: followInfo.following,
            follower: followInfo.followers
        });

    });
    
}
//6.1.0- creamos el Profil del usuario:
const usersList = ( req, res ) => {
    
    //Controlar en que pagina estamos:
    let page = 1;
    if( req.params.page ) {
        page = req.params.page;
    }
    page = parseInt( page );

    //Consulta con mongoose-pagination:
    let itemPerPage = 5;
    User.find().sort('_id') .paginate( page, itemPerPage, async( error, users, total ) => {

        if ( error || !users ) {
            return res.status(404).send({
                status: 'error',
                msg: 'Error en la consulta de usuarios o no hay usuarios disponibles.'
            });
        }

        //Obtener lista de usuarios k siguen a otro usuario m siguen a mi tambien:
        let followUserIds = await followService.followUserIds(req.user.id);

        //Devolver resultado:(posteriormente info de follows)
        return res.status(200).send({
            status: 'success',
            users,
            page,
            itemPerPage,
            total,
            pages: Math.ceil(total/itemPerPage),
            user_following: followUserIds.following,
            user_follow_me: followUserIds.followers
        });


    } ); 
}
//7.1.0- creamos el Profil del usuario:
const userUpdate = ( req, res ) => {
    //Recoger info del usuaria a actualizar:
    const userIdentity = req.user;
    const userToUpdate = req.body;
    //Eliminar los campos que no vaamos a actualizar:
    delete userToUpdate.iat;
    delete userToUpdate.exp;
    //delete userToUpdate.role;
    //delete userToUpdate.avatarImg;
    //Comprobar si el usuario ya existe:
    //Comprobacion de usuario duplicado:
    User.find({ 
        $or: [
          { email: userToUpdate.email.toLowerCase() },
          { nick: userToUpdate.nick.toLowerCase() }  
        ]
    }).exec(async (error, users) =>{
        if (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'error en la consulta de usuarios'
            });
        };

        let userIsset = false;
        users.forEach( user => {
            if ( user && user._id != userIdentity.id ) userIsset = true;
        });
        if ( userIsset ) {
            return res.status(200).send({
                status: 'succes',
                msg: 'El usuario ya existe'
            });
        };

        //Si nos llega la password cifrarla:
        if ( userToUpdate.password ) {
            let pwd = await bcrypt.hash( userToUpdate.password, 10 );
            userToUpdate.password = pwd;
        } else{
            delete userToUpdate.password;
        }

        //Buscar y actualizar:
        User.findByIdAndUpdate( { _id: userIdentity.id }, userToUpdate, { new:true }, ( error, userUpdated) => {

            if ( error || !userUpdated ) {
                return res.status(500).json({
                    status: 'error',
                    msg: 'error en la actualizacion de usuarios'
                });
            }

            //Devolver Respuesta:
            return res.status(200).send({
                status: 'success',
                msg: 'Metodo de actualizar usuario.', 
                userIdentity,
                user: userToUpdate
            });
        })
        
    });

    //Si nos llega la password cifrarla:
    
}
//8.1.0- creamos el Profil del usuario:
const userUpload = ( req, res ) => {
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
    if ( extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif' ) {

        const filePath = req.file.path;
        //Si la extension no es correcta borramos el archivo:
        const fileDeleted = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: 'error',
            msg: 'extension del archivo invalida.'
        });

    }
    
    //Si la extension es correcta, guardamos la imagen en la base de datos:
    User.findOneAndUpdate( {_id: req.user.id}, {avatarImg: req.file.filename}, {new: true}, (error, userUpdated) => {

        if (error || !userUpdated) {
            return res.status(500).send({
                status: 'error',
                msg: 'Error en la subida del avatar.'
            });
        }
        //Devolver Respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Metodo de Subida imagenes.', 
            user: userUpdated,
            file: req.file
        });
    })  
}
//9.1.0- creamos el Profil del usuario:
const userShowAvatar = ( req, res ) => {
    //Obtener parametro de la url:
    const file = req.params.file;
     
    //Montar el path real de la avatarImg:
    const avatarImgPath = './upload/avatars/' + file;
    //Comprovar que avatarImg existe:
    fs.stat( avatarImgPath, ( error, exists ) => {
        if ( !exists ) {
            return res.status(404).send({
                status: 'error',
                msg: 'No existe la imagen.' 
            });
        }
        //Devolver Respuesta con la avatarImg:
        return res.sendFile(path.resolve(avatarImgPath));
    });
    //devolvemos el file avatarImg:

    
}
// añadido
const counters = async (req, res) => {

    let userId = req.user.id;

    if (req.params.id) {
        userId = req.params.id;
    }

    try {
        const following = await Follow.count({ "user": userId });

        const followed = await Follow.count({ "followed": userId });

        const publications = await Publication.count({ "user": userId });

        return res.status(200).send({
            userId,
            following: following,
            followed: followed,
            publications: publications
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en los contadores",
            error
        });
    }
}


module.exports =  {
    pruebaUserController,
    register, 
    login,
    userProfile,
    usersList,
    userUpdate,
    userUpload,
    userShowAvatar,
    counters
}