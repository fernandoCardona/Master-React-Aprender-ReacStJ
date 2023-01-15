//Importaciones de React:
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Importaciones de terceros:
import { variablesGlobales } from "../../helpers/variablesGlobales";
import { consultaDatos } from "../../helpers/consultaDatos";

//Importaciones de la App:
import { ListadoArticles } from "./ListadoArticles";

export const Article = () => {

    const [article, setArticle] = useState({});
    const [cargando, setCargando] = useState(true);
    const params = useParams();

    useEffect(() => {
    
        getArticle();
        
    }, []);

    const getArticle = async() => {
        const url = variablesGlobales.url;
        //console.log(variablesGlobales.url);
        let {datos, cargando}= await consultaDatos(variablesGlobales.url + 'article/' + params.id, 'GET');
        // let peticion = await fetch( url, {
        //     method: 'GET'
        // }).then(resp => resp.json());
        // let datos = consulta.datos;
        // let datos = peticion;
        //console.log(datos)
        if (datos.status === 'success') {
            setArticle(datos.article);    
        }
        setCargando(false);
        //console.log(article);
    }

    return (
        <div className="jumbo">
            {   
                cargando 
                ?   (<h1>Loading article...</h1>) 
                :   (
                        <>
                            <div className="mask">
                        
                                {
                                    article.image != 'default.png' &&
                                        <img src={variablesGlobales.url + 'image/' + article.image} alt="" />
                                }
                                {
                                    article.image == 'default.png' &&
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png?20120221235433" alt="" />
                                }
                                
                            </div>
                            <h1>{article.title}</h1>
                            <span>{article.date}</span>
                            <p>{article.content}</p>
                        </>
                        
                    )
                           
            }
        </div>
    )
}
