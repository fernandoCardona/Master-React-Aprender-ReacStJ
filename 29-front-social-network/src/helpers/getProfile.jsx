//Importaciones de HOOKS/HELPES/CONTEXT:
import { Global } from './Global';




export const getProfile = async( userId, setState ) => {
     //Token
    const token = localStorage.getItem('token');

    //Peticion obtener usuarios:
    const request = await fetch(Global.url + 'user/userProfile/' + userId , {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token  
        }
    });
    //Recibimos toda la info:
    const data = await request.json();

    if (data.status == 'success') {
        setState(data.user);
    }
    //console.log(data, userProfile, token);
    return data;
}   