//Importaciones de REACT

import { Navigate, useNavigate, useParams } from "react-router-dom"

//Importaciones de Terceros

//Importaciones de App

export const Persona = () => {
    //Valores por defecto en parametros opcionales 
    //let { nombre="Fernando", apellido="Cardona" } = useParams();

    const { nombre, apellido } = useParams();
    const navegar = useNavigate();

    const enviar = (e) =>{
        e.preventDefault();
        let nombre = e.target.nombre.value;
        let apellido = e.target.apellido.value;
        let url = `/persona/${nombre}/${apellido}`

        if (nombre.length <= 0 && apellido.length <= 0){ 
            navegar("/inicio")
        }else{
            navegar(url);
        }
        
        
    }
 
    return (
        <>
        {
           ( !nombre )
            ? <h1>No hay persona que mostrar</h1> 
            : <h1>Persona: {nombre} {apellido} </h1>
        }
        <p>Esta es la pagina de persona</p>

        <form onSubmit={enviar}>
            <input type="text" name="nombre"/> <br />
            <input type="text" name="apellido"/><br />
            <input type="submit" name="enviar" value="Enviar" />
        </form>   
            
            
        </>
        
    )
}