//Importaciones de REACT

import { Link } from "react-router-dom"

//Importaciones de Terceros

//Importaciones de App

export const Error = () => {



    return (
        <>
            <h1>Error 404</h1>
            <strong>esta pagina no existe</strong> <br />
            <h3>
                <Link to="/inicio">Vuelve al inicio</Link>
            </h3>
            
        </>
        
    )
}