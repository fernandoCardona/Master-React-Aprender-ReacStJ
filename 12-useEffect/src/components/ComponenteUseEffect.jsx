import React, { useEffect, useState } from 'react'

const initialState = "Fernando Cardona "
export const ComponenteUseEffect = () => {

    const [usuario, setUsuario] = useState(initialState);
    const [fecha, setFecha] = useState(Date.now());
    const [counter, setCounter] = useState(0);

    const handleUsuario = (e) => {
        setUsuario(e.target.value)
    }
    const handleFecha = (e) => {
        setFecha(Date.now())
    }

    useEffect(() => {
      console.log('Has realizado un cambio la fecha');
    }, [ fecha ])
    useEffect(() => {
        console.log('Has realizado un cambio la usuario');
        setCounter(counter +1 )
      }, [ usuario ])
    
    return (
        <div>
            <h1>Hook useEffect</h1>
            <h2 className="label">{ usuario }</h2>
            <h3 className="label2"> { fecha }</h3>
            <h3 className="label3"> El numero de cambios es: { counter }</h3>
            <div >
                <input 
                    type="text" 
                    onChange={ handleUsuario }
                    placeholder="Cambiar el nombre del usuario"
                />
                <button onClick={ handleFecha }>Cambiar fecha</button>
            </div>
         
          
        </div>
    )
}


