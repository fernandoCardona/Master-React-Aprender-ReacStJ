//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:



export const Logout = () => {
    const { setAuth, setCounters } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //Vaciar localStorage:
        localStorage.clear();
        //Setear estados globales a vacios:
        setAuth({});
        setCounters({});
        //Navigate(redireccion) al Login:
        navigate('/login');
        
    }, []);


    return (
        <h1>Closing session...</h1>
    )
}
