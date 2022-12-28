//IMPORTACIONES REACT

//IMPORTACIONES DE TERCEROS
import { Link } from "react-router-dom"
import { trabajos } from "../../data/trabajos"
//IMPORTACIONES DE LA APP


export const ListadoTrabajos = ({limite}) => {

    const imageUrl = './../../../public/img-proyects/'   

    return (
       
            <div className="works-content">
                {
                    
                trabajos.slice(0,limite).map( trabajo =>{
                    return (
                        
                            <article key={trabajo.id} className="card"> 
                                <div 
                                    className="mask" 
                                    style={{
                                        backgroundImage: `url(${imageUrl}${trabajo.id}.png)`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat'
                                      }}
                                >
                                    {/* <img src={"/public/img-proyects/" + trabajo.id + ".png"} alt={trabajo.nombre} /> */}
                                </div>
                                <span>{trabajo.categoria}</span>
                                <h3>{trabajo.nombre}</h3>
                                <Link to={"/proyecto/" + trabajo.id }>{trabajo.url}</Link>
                                <p>{trabajo.tecnologia}</p>
                                
                            </article >
                            )
                })
            }
            </div>
            

      
    )
}
