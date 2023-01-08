import { useState } from "react";
import { useForm } from "../hooks/useForm";


export const MiFormulario = () => {

    const { formulario, handleInputChange, guardarDatos } = useForm({});
    
    return (
        <>
            <h1>MiFormulario</h1>
            <strong>Datos guardados:</strong>
            <div className="datos-cont">
                <p><strong>Email: </strong>{formulario.email}</p>
                <p><strong>Nombre: </strong>{formulario.nombre}</p>
                <p><strong>Password: </strong>{formulario.password}</p>
                <p><strong>descripcion: </strong>{formulario.descripcion}</p>
            </div>
            <div className="container">
                <form className="card" onSubmit={guardarDatos}>
                    <input type="email" name="email"onChange={handleInputChange} placeholder="Email"/>
                    <input type="text" name="nombre"onChange={handleInputChange} placeholder="Nombre"/>
                    <input type="password" name="password"onChange={handleInputChange} placeholder="Password"/>
                    <textarea name="descripcion" onChange={handleInputChange} placeholder="descripcion" cols="30" rows="5"></textarea>

                    <button className="btn">Enviar</button>
                </form> 
                
            </div>
        </>
        
    )
}
