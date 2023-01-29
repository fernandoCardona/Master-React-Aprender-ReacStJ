//Importaciones de paquetes de React:
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:
import useAuth from '../../hooks/useAuth';
import { Global } from '../../helpers/Global';
//Importaciones de ASSETS:
import avatar from '../../assets/img/user.png';
import { getProfile } from '../../helpers/getProfile';
import { PublicationList } from '../publication/PublicationList';


export const Feed = () => {
    const {auth} = useAuth();
    const [user, setUser] = useState({}); //console.log('USER',user);
    
    const [loading, setLoading] = useState(true);
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);


    const params = useParams(); //console.log('PARAMS',params);

    //Token
    const token = localStorage.getItem('token');

    //console.log('authIMAGE', auth.avatarImg)
    let avatarImg =  Global.url + 'user/userShowAvatar/' + user.avatarImg

    useEffect(() => {
        getPublications(1, false);
    }, []);

    //Publications:
    const getPublications = async ( nextPage = 1, showNews = false ) => {

        setLoading(true);
        if ( showNews ) {
            setPublications([]);
            setPage(1);
            nextPage = 1;
        }

        //Peticion obtener usuarios:
        const request = await fetch(Global.url + 'publication/feedPublications/' + nextPage, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token  
            }
            
        });
        //console.log('Params',params.userId);
        //console.log('REquest',request);
        //Recibimos toda la info:
        const data = await request.json();
        //console.log('data',data);
         //console.log(userId);
        //Creamos un estado para poder listarlos:
        if (data.status == 'success') {
            
            let newPublications = data.publications;
            if (!showNews && publications.length >= 1 ) {
                newPublications = [ ...publications, ...data.publications ];
            }
            

            setPublications(newPublications);
            
            setLoading( false );
            //Comprobamos numero publicatiosn para la paginacion:
            if( !showNews && publications.length >= (data.total - data.publications.length) ){
                setMore(false);
            }
            if (data.pages <= 1 ) {
                setMore(false);
            }
            
              
        }
        //console.log('PUBLICATIONS',publications)
    }

    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" 
                    onClick={ () => getPublications(1, true)}>Mostrar nuevas</button>
            </header>

            <PublicationList 
                publications={publications}
                getPublications={getPublications}
                page={page}
                setPage={setPage}
                more={more}
                setMore={setMore}
            />
        </>
    )
}

