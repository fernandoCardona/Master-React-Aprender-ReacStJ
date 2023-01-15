//Importaciones de React:
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Importaciones de terceros:
import { variablesGlobales } from "../../helpers/variablesGlobales";
import { consultaDatos } from "../../helpers/consultaDatos";

//Importaciones de la App:
import { ListadoArticles } from "./ListadoArticles";

export const SearchArticle = () => {

    const [articles, setArticles] = useState([]);
    const [cargando, setCargando] = useState(true);
    const params = useParams();
    //console.log(params)

    useEffect(() => {
    
        getArticles();
        
    }, []);
    useEffect(() => {
    
      getArticles();
      
  }, [params]);

    const getArticles = async() => {
        const url = variablesGlobales.url;
        //console.log(variablesGlobales.url);
        let {datos, cargando}= await consultaDatos(variablesGlobales.url + 'search/' + params.search ,'GET');
        // let peticion = await fetch( url, {
        //     method: 'GET'
        // }).then(resp => resp.json());
        // let datos = consulta.datos;
        // let datos = peticion;
        //console.log(datos)
        if (datos.status === 'success') {
            setArticles(datos.articles);  
        }else {
          setArticles([]);
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
                        :   (<h1>Noo hay articulos</h1>)
                )           
            }
        </>
    )
}
