//Importaciones de REACT

import { NavLink , Outlet } from "react-router-dom"

//Importaciones de Terceros

//Importaciones de App

export const PanelControl = () => {



    return (
        <>
            <h1>PANEL CONTROL</h1>
            <hr />

            <nav>
                <li>
                    <NavLink  to="/panel/inicio">InicioPanel</NavLink >
                </li>
                <li>
                    <NavLink  to="/panel/crear-articulos">Crear Articulos</NavLink >
                </li>
                <li>
                    <NavLink  to="/panel/gestion-usuarios">Gestion usuarios</NavLink >
                </li>
                <li>
                    <NavLink  to="/panel/acerca-de">Acerca de</NavLink >
                </li>
            </nav>

            <section>
                <Outlet/>
            </section>
        </>
        
    )
}