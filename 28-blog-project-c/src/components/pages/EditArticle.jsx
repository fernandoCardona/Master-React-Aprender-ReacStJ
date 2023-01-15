//Importaciones de React:
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

//Importaciones de terceros:

//Importaciones de Hooks y Helpers:
import { useForm } from '../../hooks/useForm';

import { consultaDatos } from "../../helpers/consultaDatos";
import { variablesGlobales } from "../../helpers/variablesGlobales";

//Importaciones de la App:


export const EditArticle = () => {

    const [article, setArticle] = useState({});
    const { formulario, handleInputChange, guardarDatos } = useForm({});
   
    const [ resultado, setResultado ] = useState('no enciado');
    const params = useParams();
     
    useEffect(() => {
    
        getArticle();
        
    }, []);

    const getArticle = async() => {
        const url = variablesGlobales.url;
        //console.log(variablesGlobales.url);
        let { datos }= await consultaDatos(variablesGlobales.url + 'article/' + params.id, 'GET');
        // let peticion = await fetch( url, {
        //     method: 'GET'
        // }).then(resp => resp.json());
        // let datos = consulta.datos;
        // let datos = peticion;
        //console.log(datos)
        if (datos.status === 'success') {
            setArticle(datos.article);    
        }

    }

    const editArticle = async(e) => {
        e.preventDefault();
        //Recogemos info del formulario
        let newArticle = formulario;
        
        //Guardamos el article en el backend:
        const { datos, cargando } = await consultaDatos(variablesGlobales.url + 'article/' + params.id, "PUT", newArticle);
        if (datos.status === 'success') {
            setResultado('guardado'); 
        }else{
            setResultado('error')
        }
         //Subir imagen:
        const fileInput = document.querySelector('#file');

        if (datos.status === 'success' && fileInput.files[0]) {
             setResultado('guardado'); 
            //console.log(fileInput.value)
            const formData = new FormData();
            formData.append('file0', fileInput.files[0]);

            const imageUpload = await consultaDatos(variablesGlobales.url + 'add-image/' + datos.article._id, "POST", formData, true);
            if (imageUpload.datos.status === 'success') {
                setResultado('guardado'); 
            }else{
                setResultado('error')
            }

        }
       
        
        

       
    }
    return (
         <div className="jumbo">
            <h1>Edit Article</h1>
            <p>Form to edit article: {article.title}</p>
            <pre>{JSON.stringify(formulario)}</pre>

            <strong>{ resultado == 'guardado' ? (<h2>Article Saved</h2>) : ''}</strong>

            {/* Montamos el formulario */}
            <form className="formulario" onSubmit={ editArticle }>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" onChange={ handleInputChange } defaultValue={article.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" cols="30" rows="10" placeholder="Content" onChange={ handleInputChange } defaultValue={article.content}></textarea>
                </div>
                <div className="form-group form-group-btn">
                    <label htmlFor="image">Image</label>
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
                    <input type="file" name="ifile0" id="file" placeholder="Image"/>
                </div>
                
                <input type="submit" value="Save" className="btn btn-success"/>
                   
            </form>

       </div>
    )
}
