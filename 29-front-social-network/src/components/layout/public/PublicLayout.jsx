//Importaciones de paquetes de React:
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../../hooks/useAuth';
//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:
import { Header } from './Header';



export const PublicLayout = () => {
    
    const { auth } = useAuth();

    return (
        <>
            {/* LAYOUT */}
            <Header/>

            {/* MAIN CONTENT */}
            <section className="layout__content">
                {
                    !auth._id 
                        ? <Outlet/>
                        : <Navigate to="/social" />
                }              
            </section>

        </>
    )
}
