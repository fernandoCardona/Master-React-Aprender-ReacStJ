//Importaciones de React:
import { useState } from 'react';

//Importaciones de terceros:

//Importaciones de Hooks y Helpers:
import { useForm } from '../../hooks/useForm';

import { consultaDatos } from "../../helpers/consultaDatos";
import { variablesGlobales } from "../../helpers/variablesGlobales";

//Importaciones de la App:


export const Create_Article = () => {

    const { formulario, handleInputChange, guardarDatos } = useForm({});
    const [ resultado, setResultado ] = useState('no enciado');
     

    const guardarNewArticle = async(e) => {
        e.preventDefault();
        //Recogemos info del formulario
        let newArticle = formulario;
        
        //Guardamos el article en el backend:
        const { datos, cargando } = await consultaDatos(variablesGlobales.url + 'create', "POST", newArticle);
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
            <h1>Create Articles</h1>
            <p>Form to create new articles</p>
            <pre>{JSON.stringify(formulario)}</pre>

            <strong>{ resultado == 'guardado' ? (<h2>Article Saved</h2>) : ''}</strong>

            {/* Montamos el formulario */}
            <form className="formulario" onSubmit={ guardarNewArticle }>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" placeholder="Title" onChange={ handleInputChange }/>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea name="content" cols="30" rows="10" placeholder="Content" onChange={ handleInputChange }></textarea>
                </div>
                <div className="form-group form-group-btn">
                    <label htmlFor="image">Image</label>
                    <input type="file" name="ifile0" id="file" placeholder="Image"/>
                </div>
                
                <input type="submit" value="Save" className="btn btn-success"/>
                   
            </form>

       </div>
    )
}
