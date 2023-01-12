
//IMPORTACIONES REACT
import {
    Routes,
    Route,
    BrowserRouter, 
    NavLink, 
    Navigate
  } from "react-router-dom";

//IMPORTACIONES DE TERCEROS

//IMPORTACIONES DE LA APP Components

//IMPORTACIONES DE LA APP Layout
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";

//IMPORTACIONES DE LA APP Pages
import { Articles } from "../components/pages/articles";
import { CreateArticle } from "../components/pages/createArticle";
import { Home } from "../components/pages/Home";


export const AppRoutes = () => {


    return (
        <BrowserRouter>
            <Header />
            <Nav/>
            <section id="content" className="content" >
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/articles" element={<Articles/>}/>
                    <Route path="/new" element={<CreateArticle/>}/>

                    <Route path="/*" element={<h1 className="heading">Error 404</h1>}/>
                </Routes>
            </section>
           <Sidebar/>
            <Footer />
        </BrowserRouter>
    )
}