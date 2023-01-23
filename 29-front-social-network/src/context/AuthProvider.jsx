//Importaciones de paquetes de React:
import { createContext, useState, useEffect } from 'react';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import { Global } from '../helpers/Global';
//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:

//3.1- Creamos uns context;
const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        authUser();
    }, []);
    //3.2- funcion consulta al localStorage:
    const authUser = async() => {
        //Obtener datos y el token del usario identificado:
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        if (!token || !user ) {
            setLoading(false);
            return false;
        }
        //Transformar los datos a un obj;
        const userObj = JSON.parse(user);
        const userId = userObj.id;
        
        //Peticion al backend que compruebe el token y devuelva los datos del usuario:
        const request = await fetch(Global.url + "user/userProfile/" + userId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token   
            }
        });
        const data = await request.json();

        //Peticion para los contadores:
        const requestCounters = await fetch(Global.url + "user/counters/" + userId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token   
            }
        });
        const dataCounters = await requestCounters.json();

        //Setear el estado de auth:
        setAuth(data.user);
        setCounters(dataCounters);
        setLoading(false);
    }
    

    return (
        <AuthContext.Provider
            value={ { 
                auth,
                setAuth,
                counters,
                setCounters,
                loading
            } }
        >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;