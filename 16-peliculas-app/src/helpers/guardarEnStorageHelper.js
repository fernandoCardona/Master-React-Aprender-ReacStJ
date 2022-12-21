//IMPORTACIONES DE REACT:


//IMPORTACIONES DE TERCEROS:


//IMPORTACIONES DE APP:


export const guardarEnStorageHelper = ( clave, elemento ) => {

    //obtener info almacenada en localStorage
    let elementos = JSON.parse(localStorage.getItem( clave ));
    //verificar si es un array
    if (Array.isArray( elementos )) {
        //Añadimos al array el elemento nuevo
        elementos.push( elemento );
    }else {
        //Sino es un array creamos uno con el elemento nuevo
        elementos = [ elemento ]
    }
    //guardamos en el localStorage
    localStorage.setItem( clave, JSON.stringify(elementos) );
    //console.log(elementos)

    //devolver objeto 
    return elemento;

}
