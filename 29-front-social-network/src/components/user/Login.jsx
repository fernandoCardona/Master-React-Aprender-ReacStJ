//Importaciones de paquetes de React:
import { useState } from 'react';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import { useForm } from '../../hooks/useForm';
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:


export const Login = () => {
    //2.1- Creamos un State para recoger y poder modificar el formulario:
    const { form, handleInputChange } = useForm({});
    const [saved, setSaved] = useState('not_loged');
    const { auth, setAuth } = useAuth();

    //2.2- Llamamos a la funcion async userLogin para logar a un usuario en la ddbb.
    const userLogin = async(e) => {
        e.preventDefault();
        //Recogemos los datos del formulario en un obj.
        let userToLogin = form;

        //Guardar el formulario en el Backend/ddb:
        //console.log(Global.url + 'user/register')
        const request = await fetch(Global.url + "user/login", {
            method: "POST",
            body: JSON.stringify(userToLogin),
            headers: {
                'Content-Type': 'application/json'   
            }
        });

        //Recibimos toda la info:
        const data = await request.json();
        //Comprobamos si data ha sido success:
        if (data.status == 'success') {
            //Persistir los datos en el navegador:
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setSaved('login');
            //Setear datos en el auth:
            setAuth(data.user);
            //Redireccion:
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        }else{
            setSaved('error');
        }
        
        console.log(data)

    }

    return (
        <>
            <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
            </header>
            <div className="content__posts">
                <div className="msg-succces-error">
                {
                    saved == 'login'
                    ?  <strong className="alert alert-success">Usuario logado correctamente</strong> 
                    : '' 
                }
                {saved == 'error'
                    ?  <strong className="alert alert-danger">Error!!, en el login de usuario</strong> 
                    : '' 
                }
                </div>
                <form 
                    className="form-login" 
                    onSubmit={ userLogin }
                >
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
                    <input type="submit" value="Login" className='btn btn-success'/>
                </form>

            </div>
        </>
    )
}
