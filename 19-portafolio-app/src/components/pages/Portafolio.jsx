//IMPORTACIONES REACT

//IMPORTACIONES DE TERCEROS
import { Link } from "react-router-dom"
import { trabajos } from "../../data/trabajos"
import { ListadoTrabajos } from "../layout/ListadoTrabajos"
//IMPORTACIONES DE LA APP


export const Portafolio = () => {

    const imageUrl = './../../../public/img-proyects/'   

    return (
        <div className="page">
            <h1 className="heading">Portafolio</h1>
            <ListadoTrabajos />
            
        </div>
      
    )
}
