//Importaciones de paquetes de React:
import { useState } from 'react';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';
import { SerializeForm } from '../../helpers/SerializeForm';
//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';
//Importaciones de COMPONENTES de la App:


export const Settings = () => {
    //3.3- comprobamos los datos que tenemos en useAuth:
    const { auth, setAuth } = useAuth();
    console.log(auth)

    //3.1- Creamos un State para recoger y poder modificar el formulario:
    const { form, handleInputChange } = useForm({});
    const [saved, setSaved] = useState('not_sended');


    //3.2- Llamamos a la funcion async userSettings para editar al usuario en la ddbb.
    const userUpdate = async(e) => {
        e.preventDefault();
        SerializeForm(e.target);
        //Token
        const token = localStorage.getItem('token');
        //Recoger datos del formulario mediante el helper SerializeForm:
        let newDataUser = SerializeForm(e.target);
        //Borrar campo file0 de los campos recogidos:
        delete newDataUser.file0;
        //console.log(newDataUser);

        // Actualizar informacion en la base de datos:
        const request = await fetch(Global.url + "user/userUpdate", {
            method: "PUT",
            body: JSON.stringify(newDataUser),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        //Recibimos toda la info:
        const data = await request.json();
        //Comprobamos si data ha sido success:
        if (data.status == 'success' && data.user) {
            delete data.user.password;
            setAuth(data.user);
            setSaved('saved');
        }else{
            setSaved('error');
        }
        //3.3- Subida de imagenes:
        const fileInput = document.querySelector('#file');

        if (data.status == 'success' && data.user) {
            //Recoger imagen a subir:
            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);
            //Peticion para enviar imagen o fichero:
            const uploadRequest = await fetch(Global.url + "user/userUpload", {
                method: "POST",
                body: formData,
                headers: {
                    'Authorization': token
                }
            });

            const uploadData = await uploadRequest.json();
             
            if (uploadData.status == 'success' && uploadData.user ) {

                delete uploadData.user.password;
                setAuth(uploadData.user);
                setSaved('saved');

            }else{
                setSaved('error');
            }
        }

    }

    return (
      <>
        <header className="content__header content__header--public">
            <h1 className="content__title">Settings</h1>
        </header>

        <div className="content__posts">
            <div className="msg-succces-error">
            {
                saved == 'saved'
                ?  <strong className="alert alert-success">Usuario actualizado correctamente</strong> 
                : '' 
            }
            {saved == 'error'
                ?  <strong className="alert alert-danger">Error!!, en la actualizado  del usuario</strong> 
                : '' 
            }
            </div>
            <form 
                className="form-settings" 
                onSubmit={ userUpdate }
            >
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text" 
                        name='name' 
                        defaultValue={auth.name}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Apellido</label>
                    <input 
                        type="text" 
                        name='surname'
                        defaultValue={auth.surname} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nick">Nick</label>
                    <input 
                        type="text" 
                        name='nick' 
                        defaultValue={auth.nick}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea name="bio" cols="20" rows="5" defaultValue={auth.bio}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        defaultValue={auth.email}
                        name='email' 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        type="password" 
                        name='password' 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="file0">Avatar</label>
                    <div className="general-info__container-avatar">
                        {
                            auth.avatarImg != 'default.png' && 
                                <img src={
                                    Global.url + 'user/userShowAvatar/' + auth.avatarImg
                                } className="container-avatar__img" alt="Foto de perfil" />
                        }
                        {
                            auth.avatarImg == 'default.png' && 
                                <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />
                        }
                        
                    </div>
                    <br/>
                    <input 
                        type="file" 
                        name='file0' 
                        id='file'
                    />
                    
                </div>
                
                <br/>
                <input type="submit" value="Send" className='btn btn-success'/>
            </form>
        </div>
      </>

    )
}
