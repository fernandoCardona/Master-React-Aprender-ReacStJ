import { useState } from 'react';
import { useMays } from '../hooks/useMays'

export const MiComponente = () => {

    

    const { estado, mayusculas, minusculas, concatenar } = useMays( "Fernando Cardona" );
    // console.log(mayusculas());
    // console.log(minusculas());
    // console.log(concatenar('WEB'));
    return (
        <>
            <h1>Probando hooks personalizados:</h1>
            {estado}
            <div className="btn-cont">
                <button onClick={ mayusculas }>Mayusculas</button>
                <button onClick={ minusculas }>Minusculas</button>
                <button onClick={ e => concatenar(" esta provando hooks personalizados") }>Concatenar</button>
            </div>
            
        </>
        
    )
}
