//IMPORTACIONES REACT
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//IMPORTACIONES DE TERCEROS
import { trabajos } from "../../data/trabajos"
//IMPORTACIONES DE LA APP


export const Proyecto = () => {
    const [proyecto, setProyecto] = useState({});
    const params= useParams();
    useEffect(() => {
        let proyecto = trabajos.filter(
            trabajo => trabajo.id === params.id
        );
        console.log(proyecto)
        setProyecto(proyecto[0]);
    }, []);

    return (
        <div className="page proyecto">
            <div className="mask">
                <img src={"./../../../public/img-proyects/" + proyecto.id + ".png"} alt={proyecto.nombre} />
            </div>
            <h1 className="heading">{ proyecto.nombre }</h1>
            <p>{proyecto.tecnologia}</p>
            <p>{proyecto.descripcion}</p>
            <a href={'http://' + proyecto.url} target="_blank">Ir al proyecto</a>
        </div> 
    )
}