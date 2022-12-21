//IMPORTACIONES DE REACT:
import { useState } from "react";


//IMPORTACIONES DE TERCEROS:


//IMPORTACIONES DE APP:

export const Editar = ( { pelicula, obtenerPeliculas, setListadoState,
    setEditarPelicula } ) => {

    const tituloComponente = "Editar pelicula";

    const handleFormEditar = (e, id) => {
        e.preventDefault();
        //obtener datos del formulario edicionar
        let target = e.target;
        //Buscar el indice del objeto de la pelicula a actualizar 
        const peliculasAlmacenadas = obtenerPeliculas();
        const indice = peliculasAlmacenadas.findIndex(
            pelicula => pelicula.id === id
        );
        //Crear objeto con ese indice
        let peliula_actualizada = {
            id,
            titulo: target.titulo.value,
            descripcion: target.descripcion.value
        } 
        
        //Aactualzar el elemento con ese indice:
        peliculasAlmacenadas[indice] = peliula_actualizada;
        //guardar el nuevo array objeto en el localStorage
        localStorage.setItem('peliculas',JSON.stringify( peliculasAlmacenadas ))
        //actualizar estado
        setListadoState( peliculasAlmacenadas );
        setEditarPelicula(0);
    }


    return (
        <>
            <div className="edit_form">
                <h3>{ tituloComponente }</h3>

                <form onSubmit={ e => handleFormEditar(e, pelicula.id) }>
                    <input 
                        type="text" 
                        name="titulo"
                        className="titulo_editado"
                        defaultValue={ pelicula.titulo }
                    />

                    <textarea 
                        name="descripcion"
                        className="descripcion_editada"
                        defaultValue={ pelicula.descripcion }
                    ></textarea>

                    <input 
                        type="submit" 
                        className="editar"
                        value="Actualizar" 
                    />
                </form>
            </div>
            
            
        </>
        
    )
}
