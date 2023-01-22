//Importaciones de paquetes de React:
import { useState } from 'react';
import { NavLink,  Navigate } from "react-router-dom";

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:

//Importaciones de ASSETS:
import avatar from '../../../assets/img/user.png'
//Importaciones de COMPONENTES de la App:



export const Nav = () => {


    return (
        <nav className="navbar__container-lists">

                <ul className="container-lists__menu-list">
                    <li className="menu-list__item">
                        <NavLink to="/login" className="menu-list__link">
                            <i className="fa-solid fa-user"></i>
                            <span className="menu-list__title">Login</span>
                        </NavLink>
                    </li>

                    <li className="menu-list__item">
                        <NavLink to="/register" className="menu-list__link">
                            <i className="fa-solid fa-users"></i>
                            <span className="menu-list__title">Registro</span>
                        </NavLink>
                    </li>

                    
                </ul>

                

            </nav>
    )
}
