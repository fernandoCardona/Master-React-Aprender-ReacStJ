import React, { useEffect, useState } from 'react'



export const AjaxComponent = () => {

    const [usuariosAW, setUsuariosAW] = useState([]);
    const [usuariosStatic, setUsuariosStatic] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const getUsuariosStaticos = () => {
        setUsuariosStatic([
            {
                "id": 1,
                "email": "Manue.Piedraita@reqres.in",
                "first_name": "Manuel",
                "last_name": "Piedraita",
            },
            {
                "id": 2,
                "email": "Silvia.Cascarrajosn@reqres.in",
                "first_name": "Silvia",
                "last_name": "Cascarrajos",
            },
            {
                "id": 3,
                "email": "Toñi.Pucheros@reqres.in",
                "first_name": "Toñi",
                "last_name": "Pucheros",
            }
        ])
    }
    useEffect(() => {
        getUsuariosStaticos();
    }, []);

    // peticion Ajax
    const getUsuariosAjax = () => {
        
        fetch('https://reqres.in/api/users?page=1')
        .then(response => response.json())
        .then(result_final => {
            setUsuarios( result_final.data );
        }, error => {
            console.log( error )
        })
    }
    useEffect(() => {
        getUsuariosAjax();
    }, []);

    // peticion Ajax Async/Await
    const getUsuariosAjaxAW = async() => {
        
        const peticion = await fetch('https://reqres.in/api/users?page=2')
        const {data} = await peticion.json()
        setUsuariosAW(data)
    }   
    useEffect(() => {
        getUsuariosAjaxAW();
    }, []);
    
    

    return (
        <div>
            <h1>AjaxComponent</h1>
            <h3>Listado de Usiarios Estaticos</h3>
            <ol>
                {
                    usuariosStatic.map( usuario => {
                        return <li key={usuario.id}>
                                    {usuario.first_name} {usuario.last_name}
                                </li>
                    }) 
                }
            </ol>
            <h3>Listado de Usiarios Peticion Ajax</h3>
            <ol>
                {
                    usuarios.map( usuario => {
                        return <li key={usuario.id}>
                                    {usuario.first_name} {usuario.last_name}
                                </li>
                    }) 
                }
            </ol>
            <h3>Listado de Usiarios Peticion Ajax Async / Await</h3>
            <ol>
                {
                    usuariosAW.map( usuario => {
                        return <li key={usuario.id}>
                                    {usuario.first_name} {usuario.last_name}
                                </li>
                    }) 
                }
            </ol>
         
        </div>
    )
}
