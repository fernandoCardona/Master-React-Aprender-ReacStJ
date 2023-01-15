//Importaciones de React:
import { Link } from "react-router-dom";
//Importaciones de terceros:
import { variablesGlobales } from "../../helpers/variablesGlobales";
import { consultaDatos } from "../../helpers/consultaDatos";
//Importaciones de la App:

export const ListadoArticles = ({articles, setArticles}) => {
    const deleteArticle = async(id) => {
        let {datos} = await consultaDatos(variablesGlobales.url + 'article/' + id, 'DELETE');
        //console.log(datos)
        if (datos.status === 'success') {
            let articlesActualizados = articles.filter( article => article._id !== id);
            setArticles(articlesActualizados);
        }else{
            
        }
    }
 

    return (
        articles.map( article => {
            return (
                <article className="article-item" key={article._id}>
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
                    <div className="datos">
                        <h3 className="title"><Link to={ '/article/' + article._id }>{ article.title }:</Link></h3>
                        <p className="description">{article.content}</p>

                        <div className="btn-cont">
                                <Link  className="edit" to={'/edit/' + article._id }>
                                    Editar
                                </Link>
                                
                                <button  className="delete" onClick={() =>{
                                    deleteArticle(article._id) 
                                } }>
                                    Borrar
                                </button>
                        </div>
                    </div>                            
                </article>
            )

        })
    )
}
