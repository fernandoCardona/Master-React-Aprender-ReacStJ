//IMPORTACIONES REACT
import {Link } from "react-router-dom";

//Importaciones de terceros:

//Importaciones de la App:

export const Home = () => {

    
    return (
       <div className="jumbo">
            <h1>Bienvenidos al blog de React</h1>
            <p>Blog desarrollado con MERN stack (Mongo, Express, React y NodeJS).</p>
            <Link to="/articles" className='button'>Ver los articulos</Link>
        
       </div>
    )
}