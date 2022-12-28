//IMPORTACIONES REACT
import {
    NavLink
  } from "react-router-dom";
//IMPORTACIONES DE TERCEROS

//IMPORTACIONES DE LA APP


export const Header = () => {



    return (
        <>
            <div className="header">
                <div className="logo">
                    <div className="logoTypo">
                        <span>FC</span>  
                    </div>
                    <div className="logoName">
                        <span>Fernando <br />
                        Cardona</span>
                    </div>
                    
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                to="/"
                                className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                                }
                            >Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="curriculum"
                                className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                                }
                            >Curriculim</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/portafolio"
                                className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                                }
                            >Portafolio</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/servicios"
                                className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                                }
                            >Servicios</NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/contacto"
                                className={ 
                                ({isActive}) => isActive ? "activo" : "" 
                                }
                            >Contacto</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </>
        
    )
}