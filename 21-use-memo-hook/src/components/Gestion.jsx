import React, { useState, useEffect, useMemo } from 'react'
import { Empleados } from './Empleados'

export const Gestion = () => {

    const [nombre, setNombre] = useState('');
    const [page, setPage] = useState(1);
     
    const asignarGestor = (e) => {
        setNombre(e.target.value); 
    }


    const handleDecrement= () => {
        setPage(page - 1)
    }
    const handleIncrement= () => {
        setPage(page + 1)
    }
    useEffect(() => {
        ;console.log('actualiza gestion ')
    }, []);


    return (
        <>
            <h2>Nombre del gestor : {nombre}</h2>
            <input type="text"  onChange={asignarGestor} placeholder="Introduce tu nombre de gestor.." />

            <h2>Listado de empleados:</h2>
            <p>Los usuarios son gestionados por {nombre} y vienen de la Api jsonplaceholder..</p>
            <Empleados page={page}/>
            <div className="cont-btn">
                <button
                    onClick={handleDecrement}
                >-1</button>
                <span>{page}</span>
                <button
                    onClick={handleIncrement}
                >+1</button>
            </div>
        </>
    )
}
