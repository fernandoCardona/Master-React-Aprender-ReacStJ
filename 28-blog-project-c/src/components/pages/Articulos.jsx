//Importaciones de React:
import { useEffect, useState } from "react";

import { variablesGlobales } from "../../helpers/variablesGlobales";
import { consultaDatos } from "../../helpers/consultaDatos";
import { ListadoArticles } from "./ListadoArticles";

//Importaciones de terceros:

//Importaciones de la App:

export const Articulos = () => {

    const [articles, setArticles] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
    
        getArticles();
        
    }, []);

    const getArticles = async() => {
        const url = variablesGlobales.url;
        //console.log(variablesGlobales.url);
        let {datos, cargando}= await consultaDatos(variablesGlobales.url + 'articles', 'GET');
        // let peticion = await fetch( url, {
        //     method: 'GET'
        // }).then(resp => resp.json());
        // let datos = consulta.datos;
        // let datos = peticion;
        //console.log(datos)
        if (datos.status === 'success') {
            setArticles(datos.articles);   
        }
        setCargando(false);
    }

    return (
        <>
            {   
                cargando 
                ?   (<h1>Loading articles...</h1>) 
                :   (

                    articles.length >= 1
                        ?   <ListadoArticles articles={articles} setArticles={setArticles}/>
                        :   (<h1>No hay articulos</h1>)
                )           
            }
        </>
    )
}
