
//Importaciones de paquetes de React:
import React, { useContext } from 'react'
//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import AuthContext from '../context/AuthProvider';
//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:


const useAuth = () => {
    
    return useContext(AuthContext);
}

export default useAuth;