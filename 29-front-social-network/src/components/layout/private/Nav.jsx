//Importaciones de paquetes de React:
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

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
                        <a href="#" className="menu-list__link">
                            <i className="fa-solid fa-house"></i>
                            <span className="menu-list__title">Inicio</span>
                        </a>
                    </li>

                    <li className="menu-list__item">
                        <a href="#" className="menu-list__link">
                            <i className="fa-solid fa-list"></i>
                            <span className="menu-list__title">Timeline</span>
                        </a>
                    </li>

                    <li className="menu-list__item">
                        <a href="#" className="menu-list__link">
                            <i className="fa-solid fa-user"></i>
                            <span className="menu-list__title">Gente</span>
                        </a>
                    </li>

                    {/* <li className="menu-list__item">
                        <a href="#" className="menu-list__link">
                            <i className="fa-regular fa-envelope"></i>
                            <span className="menu-list__title">Mensajes</span>
                        </a>
                    </li> */}
                </ul>

                <ul className="container-lists__list-end">
                    <li className="list-end__item">
                        <a href="#" className="list-end__link-image">
                            <img src={avatar} className="list-end__img" alt="Imagen de perfil"/>
                        </a>
                    </li>
                    <li className="list-end__item">
                        <a href="#" className="list-end__link">
                            <span className="list-end__name">Nick</span>
                            {/* <i className="fa-solid fa-caret-down"></i> */}
                        </a>
                    </li>
                    <li className="list-end__item">
                        <a href="#" className="list-end__link">
                            <i className="fa-solid fa-gear"></i>
                            <span className="list-end__name">Ajustes</span>
                            
                        </a>
                    </li>
                    <li className="list-end__item">
                        <NavLink to="/social/logout" className="list-end__link">
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            <span className="list-end__name">Logout</span> 
                        </NavLink>
                    </li>
                </ul>

            </nav>
    )
}
