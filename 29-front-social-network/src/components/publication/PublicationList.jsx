//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//Importaciones de paquetes de terceros:
import ReactTimeAgo from 'react-time-ago';
//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';
import { getProfile } from '../../helpers/getProfile';







export const PublicationList = ( {
    publications,
    getPublications,
    page,
    setPage,
    more,
    setMore,
} ) => {

    const {auth} = useAuth();
    //Paginacion:
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getPublications(next);
    }

    //Delete publications:
    const deletePublication = async( publicationId ) => {
        const request = await fetch(Global.url + 'publication/deletePublication/' + publicationId, { 
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
        });
        const data = await request.json();
        //console.log('data',data);
        
        setPage(1);
        setMore(true);
        getPublications(1, true);
    }


    return (
        <>
            <div className="content__posts">
                {
                    publications.map(
                        publication => {
                            return (
                                <article className="posts__post" key={publication._id}>

                                    <div className="post__container">

                                        <div className="post__image-user">
                                                <Link to={"/social/profile/" + publication.user._id}  className="post__image-link">
                                                    { 
                                                        publication.user.avatarImg != 'default.png' && 
                                                            <img src={ Global.url + 'user/userShowAvatar/' + publication.user.avatarImg } className="post__user-image" alt="Foto de perfil" />
                                                    }
                                                    
                                                    {
                                                        publication.user.avatarImg == 'default.png' && 
                                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                                    }
                                                </Link>
                                        </div>

                                        <div className="post__body">

                                            <div className="post__user-info">
                                                <a href="#" className="user-info__name"> 
                                                    {publication.user.name} {publication.user.surname}
                                                </a>
                                                <span className="user-info__divider"> | </span>
                                                <a href="#" className="user-info__create-date">
                                                    <ReactTimeAgo date={publication.user.createAt} locale="en-US" />  
                                                    {/* <ReactTimeAgo date={publication.user.createAt} locale="en-US" timeStyle="twitter"/> */}
                                                </a>
                                            </div>

                                            <h4 className="post__content">
                                                {publication.text}
                                            </h4>
                                            {
                                                publication.file && <img src={Global.url + 'publication/publicationShowMulti/' + publication.file } alt={publication.file} /> 
                                            }

                                        </div>

                                    </div>
                                    { 
                                        auth._id == publication.user._id &&
                                            <div className="post__buttons">
                                                        <button className="post__button" onClick={ ()=> deletePublication(publication._id) }>
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </button>
                                            </div>
                                    }
                                </article>
                            )
                        }
                    )
                } 
                
            </div>
            {
                more &&
                    <div className="content__container-btn">
                        <button className="content__btn-more-post" onClick={ nextPage }>
                            Ver mas publicaciones
                        </button>
                    </div>
            }
        </>
        
    )
}
