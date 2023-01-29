//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//Importaciones de paquetes de terceros:
import ReactTimeAgo from 'react-time-ago';
//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';


//Importaciones de COMPONENTES de la App:

export const UsersList = ({ getUsers, users, setUsers, following, setFollowing, more, loading, page, setPage }) => {

    const { auth, counters } = useAuth();
    
    
    //Token
    const token = localStorage.getItem('token');
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
            setFollowing( [ ...following, userId ] );
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
            let filterFollowings = following.filter( followingUserId => userId !== followingUserId );
            setFollowing( filterFollowings );
        }
        
    }

    //Metodos de Paginacion:
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getUsers(next);
    }
    
    
    return (
        <>
            <div className="content__posts">
                        
                        {
                        users.map( user => {
                            // console.log('User',follow.user.avatarImg);
                            return (
                                    <article key={user._id} className="posts__post">

                                        <div className="post__container">

                                            <div className="post__image-user">
                                                <Link to={"/social/profile/" + user._id}  className="post__image-link">
                                                    {
                                                        user.avatarImg != 'default.png' && 
                                                            <img src={ Global.url + 'user/userShowAvatar/' + user.avatarImg } className="post__user-image" alt="Foto de perfil" />
                                                    }
                                                    
                                                    {
                                                        user.avatarImg == 'default.png' && 
                                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                                    }
                                                </Link>
                                            </div>

                                            <div className="post__body">

                                            <div className="post__user-info">
                                            
                                                <Link to={"/social/profile/" + user._id} 
                                                    className="user-info__name"
                                                >
                                                    {user.name} {user.surname}
                                                </Link>

                                                    <span className="user-info__divider"> | </span>

                                                    <Link to={"/social/profile/" + user._id} 
                                                    className="user-info__create-date"
                                                >
                                                    <ReactTimeAgo date={user.createAt} locale="en-US" />   
                                                </Link>

                                            </div>

                                                <h4 className="post__content">{user.bio}</h4>

                                            </div>

                                        </div>

                                    { user._id != auth._id &&  
                                        <div className="post__buttons">
                                                { !following.includes(user._id) && 
                                                    <button className="post__button post__button--green"  
                                                        onClick={ () =>  follow( user._id )  }
                                                    >
                                                        Follow
                                                    </button>
                                                }
                                                { following.includes(user._id) && 
                                                    <button className="post__button "
                                                        onClick={ () =>  unFollow( user._id )  }
                                                    >
                                                        Unfollow
                                                    </button>
                                                }
                                        </div>
                                    }
                                    </article> 
                            )
                        })
                        }
                

            </div>

            { loading ? <h1>Loading users... </h1> : '' }

            {
                more && 
                    <div className="content__container-btn">
                        <button className="content__btn-more-post" onClick={ nextPage }>
                            See more people
                        </button>
                    </div>
            }
        </>
        
    )
}

