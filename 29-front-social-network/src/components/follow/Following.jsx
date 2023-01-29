//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';

//Importaciones de paquetes de terceros:
import { useParams } from 'react-router-dom';

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
import { getProfile } from '../../helpers/getProfile';
//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';
import { UsersList } from '../user/UsersList';

//Importaciones de COMPONENTES de la App:


 
export const Following = () => {
    const { auth, counters } = useAuth();
    const params = useParams();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState({});
    
    //Token
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        getUsers(1);
        getProfile( params.userId, setUserProfile );
    }, []);

    const getUsers = async( nextPage = 1 ) => {
        //Token
        const token = localStorage.getItem('token');

        setLoading(true);

        //Obtener useId:
        let userId = params.userId;
        
        //Peticion obtener usuarios:
        const request = await fetch(Global.url + 'follow/following/' + userId + '/' + nextPage , {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
        });

        //Recibimos toda la info:
        const data = await request.json();
        //console.log('data',data);

        let cleanUsers = [];

        //Recorrer y limpiar follows para quitarle los folloed:
        data.follows.forEach( follow => {
            cleanUsers = [...cleanUsers, follow.followed]
        })
        data.users = cleanUsers;
        
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
                <h1 className="content__title">Following users by {userProfile.nick}</h1>
               
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