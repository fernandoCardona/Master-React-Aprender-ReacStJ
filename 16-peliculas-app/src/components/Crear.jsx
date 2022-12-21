//IMPORTACIONES DE REACT:
import { useState } from "react";


//IMPORTACIONES DE TERCEROS:


//IMPORTACIONES DE APP:
import { guardarEnStorageHelper } from "../helpers";



export const Crear = ({ listadoState, setListadoState }) => {

    const tituloComponente = "Añadir pelicula";
    const [peliculaState, setPeliculaState] = useState({
        id: '',
        titulo: '',
        descripcion: ''
    });
    const { titulo, descripcion } = peliculaState;

    const handleForm = (e) => {
        e.preventDefault();
        //capturar datos formulario
        let target = e.target;
        let titulo = target.titulo.value;
        let descripcion = target.descripcion.value;

        let pelicula = {
            id: new Date().getTime(),
            titulo: titulo,
            descripcion: descripcion
        }
        //guardar el estado
        setPeliculaState( pelicula );

        //actualizamos el estado de listadoState en el componente principal:
        setListadoState( elementos => {
            return [ ...elementos, pelicula ]
        });
        
        //llamamos a la funcion guardarStorage y le pasamos pelicula como argumento:
        guardarEnStorageHelper('peliculas', pelicula );

        //console.log(pelicula)
    }

    return (
        <div className="add">
            <h3 className="title">{ tituloComponente }</h3>
            <strong>
                {( titulo && descripcion ) && 'Has creado la peliculas: ' + titulo}
            </strong>
            
            <form onSubmit={ handleForm }>
                <input 
                    type="text" 
                    id="titulo" 
                    name="titulo"
                    placeholder="Titulo" 
                />
                <textarea 
                    id="descripcion" 
                    name="descripcion"
                    placeholder="Descripción"
                ></textarea>
                <input 
                    type="submit" 
                    id="save" 
                    value="Guardar" 
                />
            </form>
        </div>
    )
}
