//Importaciones de React:
import { useEffect, useState } from "react";

//Importaciones de terceros:

//Importaciones de la App:

export const Articles = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
       let data = [
            {
                _id: 1,
                title: 'titulo 1',
                content: 'Content 1'
            }, 
            {
                _id: 2,
                title: 'titulo 2',
                content: 'Content 2'
            },
            {
                _id: 3,
                title: 'titulo 3',
                content: 'Content 3'
            },
        ];
        setArticles(data);
    }, []);
    

    return (
        <>
            {
                articles.map(article =>(
                    <article className="article-item" key={article._id}>
                        <div className="mask">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png?20120221235433" alt="" />
                        </div>
                        <div className="datos">
                            <h3 className="title">Desarrolloweb</h3>
                            <p className="description">fernandocardonaweb.es</p>

                            <div className="btn-cont">
                                    <button 
                                        className="edit"
                                    >
                                        Editar
                                    </button>
                                    
                                    <button 
                                        className="delete"
                                    >
                                        Borrar
                                    </button>
                            </div>
                        </div>
                    
                    </article>
                ))
            }
            <p>JJJJJ</p>
        </>
        
    )
  }