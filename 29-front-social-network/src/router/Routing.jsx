//Importaciones de paquetes de React:
import {
    Routes,
    Route,
    BrowserRouter, 
    Link,
    NavLink, 
    Navigate
  } from "react-router-dom";



//Importaciones de paquetes de terceros:

//Importaciones de HOOKS/HELPES/CONTEXT:

//Importaciones de ASSETS:

//Importaciones de COMPONENTES de la App:
import { PublicLayout } from "../components/layout/public/PublicLayout";
import PrivateLayout from "../components/layout/private/PrivateLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Feed } from "../components/publication/Feed";


export const Routing = () => {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PublicLayout/>}>
                    <Route index element={<Login/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>

                <Route path="/social" element={<PrivateLayout/>}>
                    <Route index element={<Feed/>}/>
                    <Route path="feed" element={<Feed/>}/>
                </Route>
                

                <Route path="/*" element={
                <>
                <div className="following__title">
                    <h1 className="heading">Error 404</h1>
                    <Link to="/">Back to Home</Link>
                </div>
                    
                </>
                
                }/>
            </Routes>

        </BrowserRouter>
    )
}


