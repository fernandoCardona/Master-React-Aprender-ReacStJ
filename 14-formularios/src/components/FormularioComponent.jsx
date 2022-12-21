import { useState } from "react";


export const FormularioComponent = () => {

    const [usuario, setUsuario] = useState({});

    const handlesubmint = (e) => {
        e.preventDefault();
        let datos = e.target;
        let usuario = {
            nombre: datos.nombre.value,
            apellido: datos.apellido.value,
            genero: datos.genero.value,
            bio: datos.bio.value
        }
        console.log(usuario);
        setUsuario(usuario);
    }
    const cambiarDatos = (e) => {
        let nameInput = e.target.name;
        let updateUsuario = usuario; 
        // updateUsuario[nameInput] = e.target.value;
        // setUsuario(updateUsuario);
        setUsuario(state_previous =>{
            return{
                ...state_previous,
                [nameInput]: e.target.value
            }    
        })
    }

    return (
        <>
            <h1>FormularioComponent</h1>
            <hr />
            <h2>Datos del Usuario</h2>
            {
                usuario.bio && usuario.bio.length >1 && (
                    <div className="info_Usuario">
                        <ol>
                            <li>Nombre:&nbsp;<span>{usuario.nombre}</span></li>
                            <li>Apellido:&nbsp;<span>{usuario.apellido}</span></li>
                            <li>Genero:&nbsp;<span>{usuario.genero}</span></li>
                            <li>Biografia:&nbsp;<span>{usuario.bio}</span></li>
                        </ol>
                    </div>
                )
            }
            

            <form onSubmit={ handlesubmint }>
                <input 
                    type="text" 
                    name="nombre"
                    placeholder="Nombre"
                    onChange={cambiarDatos}
                />
                <input 
                    type="text" 
                    name="apellido" 
                    placeholder="Apellido"
                    onChange={cambiarDatos}
                />
                <select name="genero"
                onChange={cambiarDatos}>
                     <option value="hombre">Genero</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                </select>
                <textarea 
                    name="bio" 
                    placeholder="biografia"
                    onChange={cambiarDatos}
                ></textarea>
                <input type="submit" value="enviar" className="enviar"
                />
            </form>
        </>
        
    )
}
