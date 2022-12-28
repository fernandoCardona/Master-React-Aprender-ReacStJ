import { useRef } from "react"


export const Formulario = () => {
    const nombreValue = useRef();
    const apellidoValue = useRef();
    const emailValue = useRef();
    const mensajeValue = useRef();

    const handleMostrar = (e) => {
        e.preventDefault();
        console.log(nombreValue.current.value)
        console.log(apellidoValue.current.value)
        console.log(emailValue.current.value)
        console.log(mensajeValue.current.value)
    }

    return (
        
        <>
           <form onSubmit={ handleMostrar }>
                
                <input type="text" name="nombre" placeholder="Escribe tu nombre"  ref={nombreValue}/>
            
                <input type="text" name="apellido" placeholder="Escribe tu apellido" ref={apellidoValue}/>
            
                <input type="email" name="email" placeholder="Escribe tu email" ref={emailValue}/>
							
                <textarea name="mensaje"  placeholder="Deja aquí tu comentario..." ref={mensajeValue}></textarea> 

                <input type="submit" value="Enviar"/>
           </form>
        </>
    )
}
