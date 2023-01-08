//Importaciones de REACT
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    Link,
    Navigate,
  } from "react-router-dom";
import { useContext } from "react";

//Importaciones de Terceros

//Importaciones de App
import { PruebaContext } from '../context/PruebaContext'


export const Login = () => {

    const {usuario, setUsuario} = useContext( PruebaContext );

    const guardar = (e) => {
        e.preventDefault();
        let usuario = {
            userName: e.target.userName.value,
            nombre: e.target.nombre.value,
            apellido: e.target.apellido.value
        }
        setUsuario( usuario )

    }
    
    return (
        <div className="content">
            <h1>Login</h1>
            <form onSubmit={ guardar }>
                <input type="text" name="userName" placeholder="UserName" />
                <input type="text" name="nombre" placeholder="Nombre" />
                <input type="text" name="apellido" placeholder="Apellido" />
                <button>Login</button>
            </form>
        </div>
    )
}