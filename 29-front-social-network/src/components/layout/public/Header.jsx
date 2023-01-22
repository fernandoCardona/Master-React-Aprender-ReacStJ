//Importaciones de paquetes de React:
import { useState } from 'react';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:

//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:
import { Nav } from './Nav';



export const Header = () => {


    return (
        <header className="layout__navbar">

            <div className="navbar__header">
                <a href="#" className="navbar__title">REACTSOCIAL</a>
            </div>

            <Nav/>

        </header>
    )
}
