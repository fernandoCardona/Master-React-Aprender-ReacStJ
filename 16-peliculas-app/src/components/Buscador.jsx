//IMPORTACIONES DE REACT:
import { useState } from "react";


//IMPORTACIONES DE TERCEROS:


//IMPORTACIONES DE APP:



export const Buscador = () => {


    const handleInputChangeBusqueda = (e) => {
        const [ busqueda, setBusqueda ] = useState('');

        //Crear estado y actualizarlo
        setBusqueda(e.target.value);
        //Obtener listado completo de peliculas

        //Filtrar para buscar coincidencias

        //comprobar si tengo algun resultado

        //Dar valor al localSstorage

        /// Actializarel estado del listado principal con el filtrado 


    }

    return (
        <div className="search">
            <h3 className="title">Buscador: <strong>{ state.busqueda }</strong></h3>
            <form>
                <input 
                    type="text" 
                    id="search_field" 
                    name="busqueda"
                    autoComplete="off"
                    value={ state.busqueda }
                    onChange={ handleInputChangeBusqueda }
                />
                <button id="search">Buscar</button>
            </form>
        </div>
    )
}
