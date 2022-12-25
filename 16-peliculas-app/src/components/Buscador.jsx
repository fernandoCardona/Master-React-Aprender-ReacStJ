//IMPORTACIONES DE REACT:
import { useState } from "react";


//IMPORTACIONES DE TERCEROS:


//IMPORTACIONES DE APP:



export const Buscador = ({ listadoState, setListadoState }) => {

    const [ busqueda, setBusqueda ] = useState('');
    const [ noEncontrado, setNoEncontrado ] = useState(false);

    const handleInputChangeBusqueda = (e) => {
        

        //Crear estado y actualizarlo
        setBusqueda(e.target.value);
        //Obtener listado completo de peliculas
        let peliculasMatch = listadoState.filter( peli => {
            return peli.titulo.toLowerCase().includes( busqueda.toLocaleLowerCase() ); 
            alert(' aqui estoy')
        }

        );
        
        if( busqueda.length <= 1 || peliculasMatch <= 0 ){
            peliculasMatch = JSON.parse( localStorage.getItem( 'peliculas' ) );  
            setNoEncontrado(true);
        }else {
            setNoEncontrado(false);
        }
        
        /// Actializarel estado del listado principal con el filtrado 
        setListadoState(peliculasMatch)

    }

    return (
        <div className="search">
            <h3 className="title">Buscador: <strong>{ busqueda }</strong></h3>
            {
               ( noEncontrado == true && busqueda.length > 1 ) && (<span className="no-encontrado">No se ha encontrado ninguna coincidencia</span>) 
            }
           
            <form>
                <input 
                    type="text" 
                    id="search_field" 
                    name="busqueda"
                    autoComplete="off"
                    //value={ busqueda }
                    onChange={ handleInputChangeBusqueda }
                />
                <button id="search">Buscar</button>
            </form>
        </div>
    )
}
