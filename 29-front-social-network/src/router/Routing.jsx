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
import { AuthProvider } from "../context/AuthProvider";
import { Logout } from "../components/user/Logout";
import { People } from "../components/user/People";
import { Settings } from "../components/user/Settings";
import { Following } from "../components/follow/Following";
import { Followers } from "../components/follow/Followers";
import { Profile } from "../components/user/Profile";


export const Routing = () => {


    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* PUBLIC */}
                    <Route path="/" element={<PublicLayout/>}>
                        <Route index element={<Login/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>

                    {/* PRIVATE */}
                    <Route path="/social" element={<PrivateLayout/>}>
                        <Route index element={<Feed/>}/>
                        <Route path="feed" element={<Feed/>}/>
                        <Route path="people" element={<People/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="logout" element={<Logout/>}/>
                        <Route path="following/:userId" element={<Following/>}/>
                        <Route path="followers/:userId" element={<Followers/>}/>
                        {/* <Route path="publications/:userId" element={<Publications/>}/> */}
                        <Route path="profile/:userId" element={<Profile/>}/>
                        
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
            </AuthProvider>
        </BrowserRouter>
    )
}


