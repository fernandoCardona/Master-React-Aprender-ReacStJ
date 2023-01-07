import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

export const EjemploComponente = () => {
    const [mostrar, setMostrar] = useState(false);
    const caja =  useRef();
    const boton =  useRef();

    useLayoutEffect(() => {
      console.log('useLayoutEffect: componente cargado!!');
    //   let caja = document.querySelector('#caja');
    //   caja.innerHTML='Hola';
    //     console.log(caja.getBoundingClientRect());
    }, [])

    useEffect(() => {
        console.log('useEffect: componente cargado!!');
         //let caja = document.querySelector('');
        // caja.innerHTML='Hola 2';
        // console.log(caja.getBoundingClientRect());
        if (caja.current == null) return
        const {bottom} = boton.current.getBoundingClientRect();
        setTimeout(() => {
            caja.current.style.marginTop= `${bottom + 25}px`;
            caja.current.style.marginLeft= `${bottom + 25}px`;
        }, 1500);
         
    }, [mostrar]);

    const mostrarMsg = () => {
        setMostrar(prev => !prev);
    }
    
    return (
        <>
            <div>EjemploComponente</div>
            <button onClick={ mostrarMsg } ref={boton}>Mostrar mensaje</button>
            {
                mostrar && (
                    <div id="caja" ref={caja}>
                        Hola, soy un mensaje
                    </div>
                )
            }
            
        </>
        
    )
}
