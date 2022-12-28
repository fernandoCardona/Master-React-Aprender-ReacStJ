import React, { useEffect, useRef, useState } from 'react'

export const Example1 = () => {
    const [numeroSaludos, setNumeroSaludos] = useState(0);
    const saludosEnCola = useRef(numeroSaludos)
    useEffect(() => {
        saludosEnCola.current = numeroSaludos;
        setTimeout(() => {
            console.log('Mensajes en cola: ' + saludosEnCola.current)
        }, 2000);
    }, [numeroSaludos]);

    const enviarSaludo = (e) => {
        setNumeroSaludos( numeroSaludos +1 )
    }
  
    return (
        <div>
            <h1>Ejemplo con useRef</h1> 
            <h2>Saludos enviados: {numeroSaludos}</h2>
            <button onClick={ enviarSaludo }>Enviar saludo!</button>
        </div>
    )
}
