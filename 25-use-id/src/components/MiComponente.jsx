import React, { useId } from 'react'

export const MiComponente = () => {

    const identificador0 = useId(); 
    const identificador1 = useId();
    const identificador2 = useId();
    console.log(identificador0);
    console.log(identificador1);
    console.log(identificador2);
    return (
    <>
        <h1>Hook useID</h1>
        <p>Crea un identificador unico tanto para el cliente como para el servidor</p>

        <input type="text"id={identificador0} name="nombre" placeholder="Nombre" />

    </>
        
    )
}
