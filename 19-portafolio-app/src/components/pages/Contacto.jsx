//IMPORTACIONES REACT

//IMPORTACIONES DE TERCEROS

//IMPORTACIONES DE LA APP


export const Contacto = () => {



    return (
        <div className="page">
            <h1 className="heading">Contacto</h1>
            <form className="contact">
                <input type="text" name="nombre" placeholder="Nombre"/>
                <input type="text" name="apellido" placeholder="Apellido"/>
                <input type="text" name="email" placeholder="Email"/>
                <textarea name="textarea" cols="30" rows="10" placeholder=""></textarea>
                <input type="submit" value="Enviar"/>
            </form>
        </div>
    )
}