//IMPORTACIONES DE REACT:
import { useEffect, useState } from "react";

//IMPORTACIONES DE TERCEROS:

//IMPORTACIONES DE APP:
import { Editar } from "./Editar";



export const Listado = ({ listadoState, setListadoState }) => {
    //Creamos un state con el listado de peliculas almacenado en el localStorage:
    //const [listadoState, setListadoState] = useState([]);

    //Creamos un estado para la edicion de peliculas
    const [editarPelicula, setEditarPelicula] = useState(0);

    //Usamos useEffect para inicializar la funcion 'obtenerPeliculas' cargar las peliculas de localstorage:
    useEffect(() => {
        obtenerPeliculas();
    }, []); 

    //obtenemos las peliculas del localStorage
    const obtenerPeliculas = () => {
        let peliculas = JSON.parse(localStorage.getItem('peliculas'));
        //console.log(peliculas);
        //actualizamos el listadoState con las peliculas almacenadas en el localStorage
        setListadoState(peliculas);
        return peliculas;

    }
    const handleUpdate = (id) => {
        setEditarPelicula(id);
        console.log(id)
    }
    const handleDelete = (id) => {
        //obtener las peliculas almacenadas 
        let peliculasStorage = obtenerPeliculas();

        //Filtramos las peliculas del array para eliminar la pelicula
        let new_peliculasStorage = peliculasStorage.filter(
            pelicula => pelicula.id !== parseInt(id)
        );

        //Actualizar listadoState
        setListadoState( new_peliculasStorage );

        //Actualizar los datos del localStorage:
        localStorage.setItem( 'peliculas', JSON.stringify( new_peliculasStorage ) );

    }
     
    
    return (
        <>
            {/* <!--aqui van las peliculas--> */}
            {
                //ComproBamos que ellistado no este vacio y hacemos uso de la funcion.map() para recorrer el array peliculas y mostrar sus elementos:
                listadoState != null 
                    
                    ? listadoState.map( pelicula => {

                        return(
                            <article className="peli-item" key={ pelicula.id }>
                                <h3 className="title">{ pelicula.titulo }</h3>
                                <p className="description">{ pelicula.descripcion }</p>

                                <div className="btn-cont">
                                    <button 
                                        className="edit"
                                        onClick={ () => handleUpdate(pelicula.id) }
                                    >
                                        Editar
                                    </button>
                                    
                                    <button 
                                        className="delete"
                                        onClick={ () => handleDelete(pelicula.id) }
                                    >
                                        Borrar
                                    </button>
                                </div>
                                {/* componente formulario editar pelicula oculto */}
                                { 
                                    editarPelicula === pelicula.id && (
                                        <Editar 
                                            pelicula={pelicula}
                                            obtenerPeliculas={obtenerPeliculas}
                                            setListadoState={setListadoState}
                                            setEditarPelicula={setEditarPelicula}
                                        />
                                    )
                                }
                                
                            </article>
                        )
                    })
                    : <h2>No hay peliculas a mostrar</h2>
            }
           
            
        </>
    )
}
