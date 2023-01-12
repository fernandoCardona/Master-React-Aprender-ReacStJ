//IMPORTACIONES REACT
import {
    Routes,
    Route,
    BrowserRouter, 
    NavLink, 
    Navigate
  } from "react-router-dom";

//Importaciones de terceros:

//Importaciones de la App:

export const Nav = () => {

    
    return (
        <nav className="nav">
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/articles">Articles</NavLink></li>
                <li><NavLink to="/new">Create article</NavLink></li>
                
            </ul>
        </nav>
    )
}