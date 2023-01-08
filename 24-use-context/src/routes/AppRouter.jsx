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



//Importaciones de Terceros
import reactLogo from '../assets/react.svg'
//Importaciones de App
import { About } from "../components/About";
import { Articulos } from "../components/articulos";
import { Contacto } from "../components/Contacto";
import { Error } from "../components/Error";
import { Inicio } from "../components/Inicio";
import { Login } from "../components/Login";

import { PruebaContext } from "../context/PruebaContext";


export const AppRouter = () => {
    const {usuario, setUsuario} = useContext( PruebaContext );
    const cerrarSesion = (e) => {
        e.preventDefault();
        setUsuario(null);
    }
    return (
        <BrowserRouter>
            {/* //Menu Navigation */}
            <nav>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
                <ul>
                    
                    <li>
                        <NavLink 
                            to="/inicio" 
                            className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                        } >Inicio</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/about" 
                            className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                        } >About</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/articulos" 
                            className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                        } >Articulos</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/contacto" 
                            className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                        } >Contacto</NavLink>
                    </li>
                    
                    {
                        usuario.hasOwnProperty('userName') && usuario.userName !== null 
                            ?   (   <>
                                        <li>
                                            <NavLink to="/" 
                                                className={ ({isActive}) => isActive ? "activo" : "" } >
                                                    { usuario.userName }
                                            </NavLink>
                                        </li>
                                        <li>
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                setUsuario({});
                                            } }>
                                                Cerrar Sesion 
                                            </a>
                                        </li>
                                    </>
                                    
                                )
                            :   (   
                                    <li>
                                        <NavLink to="/login" 
                                            className={  ({isActive}) => isActive ? "activo" : "" 
                                            } >Login
                                        </NavLink>
                                    </li>
                                )
                    }
                        
                  
                    
                </ul>
            </nav>

            {/* //Configuracion de Rutas */}
            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/inicio" element={<Inicio/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/articulos" element={<Articulos/>}/>
                <Route path="/contacto" element={<Contacto/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="*" element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    )
}
