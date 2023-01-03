import React, { useEffect, useState } from 'react'

export const Empleados = React.memo(({page}) => {

    

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        getUsuarios();
        console.log('se ha renderizado de nuevo lista de empleados ');
    }, [page]);

    const getUsuarios = async() => {
        const url = 'https://reqres.in/api/users?page=' + page;
        const peticion = await fetch(url);
        const { data: empleados } = await peticion.json();
        
        setEmpleados( empleados )
    }
    
    
  return (
    <div>
        <h2>Empleados</h2>
         <ol>
            {   
                empleados.length >= 1 &&
                    empleados.map( empleado => (
                        <li key={empleado.id}> { empleado.first_name } { empleado.last_name }</li>
                    ))
            }
         </ol>
    </div>
  )
})
