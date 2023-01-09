import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

export const MiUsuario = () => {
    const [url, setUrl] = useState('https://reqres.in/api/users/1');
    const { datos, cargando } = useFetch(url);
    // const [usuario, setUsuario] = useState({
    //     datos: null,
    //     cargando: true
    // });
    
    // const getUsuario = async(url) => {
    //     setUsuario({
    //         ...usuario,
    //         cargando: true
    //     });

    //     setTimeout(async() => {
    //         const peticion = await fetch(url);
    //         const {data} = await peticion.json();
            
    //         setUsuario({
    //             datos: data,
    //             cargando: false
    //         });
    //     }, 2000);
        
       
    // }
    const getId = e => {
        let id = parseInt(e.target.value);
        setUrl('https://reqres.in/api/users/'+id);
        // getUsuario(url);
        
    }
    // useEffect(() => {
    //     getUsuario('https://reqres.in/api/users/1');
    // }, [])
    
    console.log(datos?.first_name)
    return (
        
        <>
            <h1>MiUsuario</h1>
            <div>
                {
                    cargando ? "Cargando..." : ""
                }
            </div>
            <div>
            Datos del usario:
            <p><strong><span>Nombre:</span></strong> { datos?.first_name}</p>
            <p><strong><span>Apellido:</span></strong> { datos?.last_name}</p>
            </div>
            <input type="number" name="id" onChange={ getId }/>
        </>
    )
}
