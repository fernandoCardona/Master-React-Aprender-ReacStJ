//IMPORTACIONES REACT
import { Link } from "react-router-dom"
import { ListadoTrabajos } from "../layout/ListadoTrabajos"

//IMPORTACIONES DE TERCEROS

//IMPORTACIONES DE LA APP


export const Inicio = () => {



    return (
        <div className="home">
            <h1 className="heading">
                <strong>Desarrollador fullStack</strong> en Madrid,
                y ofrezco mis servicios de <strong>programacion</strong>  y <strong>desarrollo</strong> en todo tipo de proyectos.
            </h1>
            <h2>
                Te ayudo a crear tu sitio o aplicacion web, tener mas visibilidad y relevancia en internet. <Link to="/contacto">Contacta conmigo</Link>.
            </h2>
            <section className="lasted-works">

                <h2>Algunos de mis proyectos:</h2>
                <p>Estos son algunos de mis trabajos de desarrollor web:</p>
                <div className="works">
                    <ListadoTrabajos limite="2"/>
                </div>

            </section>
        </div>
    )
}
