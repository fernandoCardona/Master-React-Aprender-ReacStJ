import { useEffect, useReducer } from "react";
import { juegoReducer } from "../reducers/juegoReducer";

 const init = () => {
    return JSON.parse(localStorage.getItem('juegos')) || [];
 }

export const MisJuegos = () => {

    const [juegos, dispatch] = useReducer(juegoReducer, [], init)

    useEffect(() => {
        localStorage.setItem('juegos', JSON.stringify(juegos))
    }, [juegos]);


    const conseguirDatosForm = (e) => {
        e.preventDefault();
        let juego = {
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.value
        }
        console.log(juego);

        const accion = {
            type: 'crear',
            payload: juego,
        }
        dispatch(accion); 
    }
    const editJuego = (e, id) => {
        let juego = {
            id,
            titulo: e.target.value,
            descripcion: e.target.value
        }
        const action = {
            type: 'editar',
            payload: juego
        }
        dispatch(action);
    }

    const borrarJuego = (id) => {
        const action = {
            type: 'borrar',
            payload: id
        }
        dispatch(action);
    }

    return (
        <div>
            <h1>MisJuegos</h1>
            <p>Numero de videojuegos: {juegos.length}</p>
            <ul>
                {
                    juegos.map( 
                        juego => (
                            <li key={juego.id}>
                                <span><strong>{juego.titulo}</strong></span>
                                <p>{juego.descripcion}</p>
                               
                                <button onClick={ e => borrarJuego(juego.id) }>X</button>

                                <input type="text" onBlur={ e => editJuego(e, juego.id) } />
                            </li>
                        )
                    )
                }
                
            </ul>
            <h3>Agregar juego</h3>
            <form onSubmit={ conseguirDatosForm }> 
                <input type="text" name="titulo" placeholder="Titulo del Juego"/>
                <textarea name="descripcion" placeholder='Descripcion' cols="30" rows="10"></textarea>
                <input type="submit" value="Agregar" />
            </form>
        </div>
        

    )
}
