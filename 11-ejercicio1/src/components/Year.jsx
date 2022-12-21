import React, { useState } from 'react'
import PropTypes from 'prop-types';


export const Year = ({year}) => {

    const [fecha, setFecha] = useState(year);

    const añoAnterior = (e) =>{
        setFecha(fecha -1)
        console.log('anterior')
    }
    const añoSiguiente = (e) =>{
        setFecha(fecha +1)
        console.log('siguiente')
    }
    const cambiarYear = (e) =>{
        let dato = parseInt(e.target.value);
        if (Number.isInteger(dato)) {
            setFecha( dato )
        }else{
            setFecha( year-1 )
        }
        
    }
    return (
        <>
            <h1>Current Year: { fecha }</h1>
            <p> Cambiar año</p>
            <input 
                type="text" 
                placeholder='Cambia el año'
                onChange={ cambiarYear }
            />
            <div className="yearCont">
                <button onClick={ añoAnterior }>Año Anterior</button>
                <button onClick={ añoSiguiente }>Año Siguiente</button>
            </div>
        </>
        
    )
}
Year.prototype = {
    year: PropTypes.number.isRequired
}