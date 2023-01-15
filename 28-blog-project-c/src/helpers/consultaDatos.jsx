

export const consultaDatos = async (url, method, guardarDatos = '', imageFile = false) => {

    //console.log('recibo:', url);
    //console.log('recibo:', method);
    //console.log('recibo:', guardarDatos);
    // let datos = {};
    let cargando = true;
    

    let options = {
        method: method
    }

    if (method == "GET" || method == "DELETE" ) { 
        //console.log(options,' metodo');
        options = {
            method: method,
        }
    }
    

    if (method == "POST" || method == "PUT" ) {
        //console.log('metodo: ',options);
        //console.log('body; ', options.body);
        let body =  JSON.stringify(guardarDatos);
        if( imageFile ){
            options = {
                method: method,
                body: guardarDatos
            }
        }else {
            options = {
                method: method,
                body,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        }

       
    }
    // if (method == "PUT" ) {
    //     //console.log('metodo: ',options);
    //     //console.log('body; ', options.body);
    //     options = {
    //         method: "POST",
    //         body: JSON.stringify(guardarDatos),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     }
    // }
    //console.log('metodo: ',options);
    //console.log('body; ', options.body);
    const peticion = await fetch(url, options).then(resp => resp.json());
    let datos = peticion;
    
    //let articles = datos.articles;
    //console.log('datos:', datos)
    //console.log('esta es la peticion: ',peticion);
    //console.log('url: ',url, 'options: ',options, 'guardarDatos: ',guardarDatos );

    cargando = false;
   
    return {
        datos,
        cargando
    }
}