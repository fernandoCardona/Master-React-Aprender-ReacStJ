//Importaciones de REACT
import { NavLink, Link } from "react-router-dom";


//Importaciones de Terceros

//Importaciones de App




export const Navbar = () => {



    return (
        <>
            <ul className="nav-wrapper">
                <li>
                    <NavLink 
                        to="/inicio" 
                        className={ 
                            ({isActive}) => isActive ? "activo" : "" 
                        } 
                    > Inicio</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/articulos"
                        className={ 
                            ({isActive}) => isActive ? "activo" : "" 
                        } 
                    > Articulos</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/panel"
                        className={ 
                            ({isActive}) => isActive ? "activo" : "" 
                        } 
                    > Panel de Control</NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contacto"
                        className={ 
                            ({isActive}) => isActive ? "activo" : "" 
                        } 
                    > Contacto</NavLink>
                </li>
            </ul>
           
        </>
        
    )
}