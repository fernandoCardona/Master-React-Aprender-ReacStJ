//Importaciones de paquetes de React:
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../../hooks/useAuth';
import { Global } from '../../../helpers/Global';

//Importaciones de ASSETS:
import avatar from '../../../assets/img/user.png'


//Importaciones de COMPONENTES de la App:



export const Nav = () => {
    const { auth, counters } = useAuth();
    //console.log('auth', auth)

    return (
        <nav className="navbar__container-lists">

                <ul className="container-lists__menu-list">
                    <li className="menu-list__item">
                        <NavLink to="/social" className="menu-list__link">
                            <i className="fa-solid fa-house"></i>
                            <span className="menu-list__title">Home</span>
                        </NavLink>
                    </li>

                    <li className="menu-list__item">
                        <NavLink to="/social/feed" className="menu-list__link">
                            <i className="fa-solid fa-list"></i>
                            <span className="menu-list__title">Timeline</span>
                        </NavLink>
                    </li>

                    <li className="menu-list__item">
                        <NavLink to="/social/people" className="menu-list__link">
                            <i className="fa-solid fa-user"></i>
                            <span className="menu-list__title">People</span>
                        </NavLink>
                    </li>
                </ul>

                <ul className="container-lists__list-end">
                    <li className="list-end__item">
                        <a href="#" className="list-end__link-image">
                        {
                                auth.avatarImg != 'default.png' && 
                                    <img src={
                                        Global.url + 'user/userShowAvatar/' + auth.avatarImg
                                    } className="list-end__img" alt="Foto de perfil" />
                            }
                            {
                                auth.avatarImg == 'default.png' && 
                                    <img src={avatar} className="list-end__img" alt="Foto de perfil" />
                            }
                        </a>
                    </li>
                    <li className="list-end__item">
                        <NavLink to="" className="list-end__link">
                            <span className="list-end__name">{ auth.nick }</span>
                            {/* <i className="fa-solid fa-caret-down"></i> */}
                        </NavLink>
                    </li>
                    <li className="list-end__item">
                        <NavLink to="/social/settings" className="list-end__link">
                            <i className="fa-solid fa-gear"></i>
                            <span className="list-end__name">Settings</span>
                            
                        </NavLink>
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
