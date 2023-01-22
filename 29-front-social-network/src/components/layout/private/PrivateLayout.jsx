//Importaciones de paquetes de React:
import { useState } from 'react';
import { Outlet } from 'react-router-dom';


//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:

//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:
import { Header } from './Header';
import { SideBar } from './SideBar';



const PrivateLayout = () => {


    return (
        <>
        {/* LAYOUT */}
            {/* HEADER */}
            <Header/>

            {/* MAIN CONTENT */}
            <section className="layout__content">
                <Outlet/>
            </section>

            {/* SIDEBAR */}
            <SideBar/>

        </>
    )
}

export default PrivateLayout
