//Importaciones de paquetes de React:
import { useState } from 'react';


//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';

//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:



export const Register = () => {
    //1.1- Creamos un State para recoger y poder modificar el formulario:
    const { form, handleInputChange } = useForm({});
    const [saved, setSaved] = useState('not_sended');

    //1.2- Llamamos a la funcion async userRegister para registrar al nuevo usuario en la ddbb.
    const userRegister = async(e) => {
        e.preventDefault();
        //Recogemos los datos del formulario en un obj.
        let newUser = form;
        //Guardar el formulario en el Backend/ddb:
        //console.log(Global.url + 'user/register')
        const request = await fetch(Global.url + "user/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json'   
            }
        });
        //Recibimos toda la info:
        const data = await request.json();
        //Comprobamos si data ha sido success:
        if (data.status == 'success') {
            setSaved('saved');
        }else{
            setSaved('error');
        }
    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Register</h1>
            </header>

            <div className="content__posts">
                <div className="msg-succces-error">
                {
                    saved == 'saved'
                    ?  <strong className="alert alert-success">Usuario registrado correctamente</strong> 
                    : '' 
                }
                {saved == 'error'
                    ?  <strong className="alert alert-danger">Error!!, en el registrado de nuevo usuario</strong> 
                    : '' 
                }
                </div>
                <form 
                    className="form-register" 
                    onSubmit={ userRegister }
                >
                    <div className="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text" 
                            name='name' 
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Apellido</label>
                        <input 
                            type="text" 
                            name='surname' 
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nick">Nick</label>
                        <input 
                            type="text" 
                            name='nick' 
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name='email' 
                            onChange={ handleInputChange }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            name='password' 
                            onChange={ handleInputChange }
                        />
                    </div>
                    <input type="submit" value="Registrate" className='btn btn-success'/>
                </form>
            </div>
        </>
    )
}
