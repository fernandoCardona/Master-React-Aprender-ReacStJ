//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';

//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';

//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';


//Importaciones de COMPONENTES de la App:
import { UsersList } from './UsersList';
 
export const People = () => {
    const { auth, counters } = useAuth();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    //Token
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        getUsers(1);
    }, []);

    const getUsers = async( nextPage = 1 ) => {
        setLoading(true);
        //Token
        const token = localStorage.getItem('token');
        //Peticion obtener usuarios:
        const request = await fetch(Global.url + 'user/userList/' + nextPage , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
        });
        //Recibimos toda la info:
        const data = await request.json();
        //console.log('data',data);
        

        //Creamos un estado para poder listarlos:
        if (data.users && data.status == 'success') {
            let newUsers = data.users;
            if ( users.length >= 1 ) {
                newUsers = [ ...users, ...data.users ];
            }
            setUsers( newUsers );
            setFollowing( data.user_following );
            setLoading( false );
            //Comprobamos numero users para la paginacion:
            if( users.length >= (data.total - data.users.length) ){
                setMore(false);
            }

            
        }
        
    }
    


    return (
      <>
            <header className="content__header">
                <h1 className="content__title">People</h1>
               
            </header>

             <UsersList
                getUsers={getUsers}
                users={users}
                setUsers={setUsers}
                following={following}
                setFollowing={setFollowing}
                more={more}
                loading={loading}
                page={page}
                setPage={setPage}
             />

            
        </>
    )
}
