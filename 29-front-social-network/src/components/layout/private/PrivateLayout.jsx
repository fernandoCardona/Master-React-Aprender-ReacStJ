//Importaciones de paquetes de React:
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../../hooks/useAuth';
//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:
import { Header } from './Header';
import { SideBar } from './SideBar';



const PrivateLayout = () => {

    const { auth, loading } = useAuth();

    if ( loading ) {
        return <h1>Loading...</h1>
    }else{
        return (
            <>
            {/* LAYOUT */}
                {/* HEADER */}
                <Header/>

                {/* MAIN CONTENT */}
                <section className="layout__content">
                    {
                        auth._id 
                            ? <Outlet/>
                            : <Navigate to="/login" />
                    } 
                    
                </section>

                {/* SIDEBAR */}
                <SideBar/>

            </>
        )
    }

    
}

export default PrivateLayout
