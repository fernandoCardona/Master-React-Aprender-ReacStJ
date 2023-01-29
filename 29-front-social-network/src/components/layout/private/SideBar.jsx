//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import { useForm } from '../../../hooks/useForm';
import useAuth from '../../../hooks/useAuth';
import { Global } from '../../../helpers/Global';
//Importaciones de ASSETS:
import avatar from '../../../assets/img/user.png';




//Importaciones de COMPONENTES de la App:


export const SideBar = () => {
    const { auth, counters } = useAuth();
    const { form, handleInputChange } = useForm({});
    const [ stored, setStored ] = useState('not_stored');

    //Token
    const token = localStorage.getItem('token');

    //console.log('authIMAGE', auth.avatarImg)
    let avatarImg =  Global.url + 'user/userShowAvatar/' + auth.avatarImg
    //console.log(auth)
    useEffect(() => {
        avatarImg =  Global.url + 'user/userShowAvatar/' + auth.avatarImg
    }, [auth]);

    const savePublication = async(e) => {
        e.preventDefault();

        //Recoger datos del formulario:
        let newPublication = form;
        newPublication.user = auth._id;

        //Hacer Request para guardaar en base de datos:
        const request = await fetch(Global.url + 'publication/savePublication'  , {
            method: "POST",
            body: JSON.stringify(newPublication),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
        });
        //Recibimos toda la info:
        const data = await request.json();

        //Mostrar mensaje de exito o error:
        if (data.status == 'success') {
            setStored('stored');
        }else {
            setStored('error');
        }
        //Subir imagen:
        const fileInput = document.querySelector('#file');

        if (data.status == 'success' && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);
        
            const uploadRequest = await fetch(Global.url + "publication/publicationUpload/" + data.publicationStored._id, { 
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': token  
                }
            });
            //Recibimos toda la info:
            const uploadData = await uploadRequest.json();

            if (uploadData.status == 'success') {
                setStored('stored');
            }else {
                setStored('error');
            }

            
        }
        //Reset delFormulario:
        //if (data.status == 'success' && uploadData.status == 'success') {
            const myForm = document.querySelector('#publicationForm');
            myForm.reset();
        //}
    }
    
    
    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, { auth.name }</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {
                                auth.avatarImg != 'default.png' && 
                                    <img src={ avatarImg } className="container-avatar__img" alt="Foto de perfil" />
                            }
                              
                            {
                                auth.avatarImg == 'default.png' && 
                                    <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                            }
                            
                        </div>

                        <div className="general-info__container-names">
                            <Link to={"/social/profile/" + auth._id}  
                                     className="container-names__name">
                                        { auth.name } { auth.surname }
                            </Link>
                            <p className="container-names__nickname">{auth.nick}</p>
                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={'/social/following/' + auth._id} 
                                  className="following__link">
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
                            <Link to={'/social/followers/' + auth._id} 
                                  className="following__link">
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
                            <Link to={"/social/profile/" + auth._id}  
                                     className="following__link">
                                        <span className="following__title">Publications</span>
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
                </div>


                <div className="aside__container-form">
                {
                    stored == 'stored'
                    ?  <strong className="alert alert-success">Publication upload Succes</strong> 
                    : '' 
                }
                {
                    stored == 'error'
                    ?  <strong className="alert alert-danger">Error!!, Publication not upload</strong> 
                    : '' 
                }
                    <form id="publicationForm" className="container-form__form-post" onSubmit={ savePublication }>

                        <div className="form-post__inputs">
                            <label htmlFor="text" className="form-post__label">¿What you are thinking?</label>
                            <textarea name="text" className="form-post__textarea" onChange={ handleInputChange }></textarea>
                        </div>

                        <div className="form-post__inputs">
                            <label htmlFor="file" className="form-post__label">Upload Image</label>
                            <input type="file" name="file0" id="file" className="form-post__image"/>
                        </div>

                        <input type="submit" value="Publish" className="form-post__btn-submit" />

                    </form>

                </div>

            </div>

        </aside>
    )
}
