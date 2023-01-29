//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';
import { getProfile } from '../../helpers/getProfile';
import { PublicationList } from '../publication/PublicationList';

export const Profile = () => {
    const {auth} = useAuth();
    const [user, setUser] = useState({}); //console.log('USER',user);
    const [counters, setCounters] = useState({});
    const [iFollow, setIfollow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);


    const params = useParams(); //console.log('PARAMS',params);

    //Token
    const token = localStorage.getItem('token');

    //console.log('authIMAGE', auth.avatarImg)
    let avatarImg =  Global.url + 'user/userShowAvatar/' + user.avatarImg

    //console.log(auth)

    useEffect(() => {
        getDataUSer();
        getCounters();
        getPublications(1, true);
    }, []);

    useEffect(() => {
        getDataUSer();
        getCounters();
        setMore(true);
        getPublications(1, true);
    }, [params]);

    const getDataUSer = async() => {
        let dataUser = await getProfile( params.userId, setUser);
        if (dataUser.following && dataUser.following._id) {
            setIfollow(true);
        }
    }
    const getCounters = async() => {

        //Hacer Request para Counters en base de datos:
        const request = await fetch(Global.url + 'user/counters/' + params.userId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
        });
        //Recibimos toda la info:
        const data = await request.json(); //console.log('DATA',data);

        //Mostrar mensaje de exito o error:
        if (data.following) {
            setCounters(data);
        }else {
            setCounters('error');
        }

    }

    //Metodos Follos / UnFollow:
    const follow = async(userId) => { 
        //console.log(user._id ); console.log(userId);
       
        //Peticion al backend para guardar el follow:
        const request = await fetch(Global.url + 'follow/saveFollow', {
            method: "POST",
            body: JSON.stringify({followed: userId}),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }  
        });
        //Recibimos toda la info:
        const data = await request.json();
 
        //Cuando todo este bien :
        if (data.status == 'success') {
            //Actualizar el estado de following, agregando el nuevo follow:
            setIfollow(true);
        }
        

    }
    const unFollow = async(userId) => {
        ///Peticion al backend para borrar el follow:
        const request = await fetch(Global.url + 'follow/unFollow/' + userId, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }      
        });

        //Recibimos toda la info:
        const data = await request.json();
        //Cuando todo este bien :
        if (data.status == 'success') {
            //Actualizar el estado de following, filtrando los datos para eliminar el antiguo follow:
            setIfollow(false);
        }
        
    }

    //Publications:
    const getPublications = async ( nextPage = 1, newProfile = false ) => {

        setLoading(true);

        //Peticion obtener usuarios:
        const request = await fetch(Global.url + 'publication/userPublication/' + params.userId + '/' + nextPage, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
            
        });
        //console.log('Params',params.userId);
        //console.log('REquest',request);
        //Recibimos toda la info:
        const data = await request.json();
        //console.log('data',data);
         //console.log(userId);
        //Creamos un estado para poder listarlos:
        if (data.status == 'success') {
            
            let newPublications = data.publications;
            if (!newProfile && publications.length >= 1 ) {
                newPublications = [ ...publications, ...data.publications ];
            }
            if (newProfile) {
                newPublications = data.publications;
                setMore(true);
                setPage(1);
            }

            setPublications(newPublications);
            
            setLoading( false );
            //Comprobamos numero publicatiosn para la paginacion:
            if( !newProfile && publications.length >= (data.total - data.publications.length) ){
                setMore(false);
            }
            if (data.pages <= 1 ) {
                setMore(false);
            }
            
              
        }
        //console.log('PUBLICATIONS',publications)
    }

    

    return (
        <>
            <header className="aside__profile-info">

                <div className="profile-info__general-info">
                    <div className="general-info__container-avatar">
                    {
                        user.avatarImg != 'default.png' && 
                            <img src={ avatarImg } className="container-avatar__img" alt="Foto de perfil" />
                    }
                        
                    {
                        user.avatarImg == 'default.png' && 
                            <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                    }
                    </div>

                    <div className="general-info__container-names">
                        <div className="container-names__name">
                            <h1>{user.name} {user.surname}</h1>
                            
                        </div>
                        <h2 className="container-names__nickname">{user.nick}</h2> 
                        <p>{user.bio}</p>
                        {
                            user._id != auth._id &&
                                (iFollow 
                                    ? <button className="content__button content__button--rigth content__button--danger"
                                    onClick={ () =>  unFollow( user._id )  }>unFollow</button>
                                    : <button className="content__button content__button--rigth" 
                                    onClick={ () =>  follow( user._id )  }
                                    >Follow</button>
                                )      
                        }
                        
                    </div>
                    
                </div>

                <div className="profile-info__stats">

                    <div className="stats__following">
                        <Link to={'/social/following/' + user._id} className="following__link">
                                <span className="following__title">Following</span>
                                <span className="following__number">
                                    {
                                        counters.following >= 1
                                            ? counters.following
                                            : '0'
                                    }
                                </span>
                        </Link>
                    </div>
                    <div className="stats__following">
                        <Link to={'/social/followers/' + user._id} className="following__link">
                            <span className="following__title">Followers</span>
                            <span className="following__number">
                                {
                                    counters.followed >= 1
                                        ? counters.followed
                                        : '0'
                                }
                            </span>
                        </Link>
                    </div>


                    <div className="stats__following">
                        <Link to={"/social/profile/" + user._id} className="following__link">
                            <span className="following__title">Publicaciones</span>
                            <span className="following__number">
                                {
                                    counters.publications >= 1
                                        ? counters.publications
                                        : '0'
                                }
                            </span>
                        </Link>
                    </div>


                </div>
            </header>

            
            <PublicationList 
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
            
            
        </>
    )
}
