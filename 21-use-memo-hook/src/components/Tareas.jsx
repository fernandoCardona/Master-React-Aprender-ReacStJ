import { useMemo, useState } from "react"


export const Tareas = () => {

    const [tareas, setTareas] = useState([]);
    const [contador, setContador] = useState(0);
    const guardarTareas = (e) => {
      e.preventDefault();
      let tareasActualizadas = [ ...tareas, e.target.titulo.value ]
      setTareas( tareasActualizadas );
      console.log(tareasActualizadas);
    }
     const borrarTarea = (id) => {
        //Filtrar tareas para borrar la que no quiero
        let nuevas_tareas =  tareas.filter( (tarea, indice ) => indice !== id);
        console.log( nuevas_tareas)
        //guardar el nuevo listado de tareas en el estado
        setTareas( nuevas_tareas );
     }

    const sumarTarea = () => {
        setContador( contador + 1)
    }
    const contadoresPasados = (acumulacion) => {
      for (let i = 0; i <= acumulacion; i++) {
          console.log('ejecutando acumulacion')
      }
      return `Contador manual de tareas: ${acumulacion}`;
    }
    const memoContadores = useMemo(() => contadoresPasados(contador), [contador])

    return (
      <>
          <h1>Mis Tareas</h1>

          <form onSubmit={ guardarTareas }>
            
              <input type="text" name="titulo" placeholder="titulo de la tarea "/>
              <button>Guardar</button>
              {/* <input type="submit" value="Enviar"/> */}
          </form>
          <h3>{memoContadores}</h3>
          <button onClick={ sumarTarea }>Sumar</button>
          <h3>Lista de tareas</h3>
          <ul>
            {
              tareas.map( (tarea, indice) => (
                <li key={indice}>{tarea} &nbsp; <button onClick={ () => borrarTarea(indice) }>X</button></li> 

              ))
            }
          </ul>
          
  
      </>
    ) 
}
