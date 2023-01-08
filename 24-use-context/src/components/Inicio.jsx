//Importaciones de REACT
import { useContext } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    Link,
    Navigate,
  } from "react-router-dom";
import { PruebaContext } from "../context/PruebaContext";


//Importaciones de Terceros

//Importaciones de App


export const Inicio = () => {
    const {usuario, setUsuario} = useContext( PruebaContext );


    return (
        <div className="content">
            <h1>Inicio</h1>
            {/* <h2>Valor del contexto: { contextCompartido.titulo }</h2>
            <p>Contenido: { contextCompartido.contenido }</p> */}
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
        </div>
    )
}