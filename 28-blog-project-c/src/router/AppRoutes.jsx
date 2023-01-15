
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
import { Article } from "../components/pages/Article";
import { Articulos } from "../components/pages/Articulos";
import { Contact } from "../components/pages/Contact";
import { Create_Article } from "../components/pages/Create_Article";
import { EditArticle } from "../components/pages/EditArticle";
import { Home } from "../components/pages/Home";
import { SearchArticle } from "../components/pages/SearchArticle";


export const AppRoutes = () => {


    return (
        <BrowserRouter>
            <Header />
            <Nav/>
            <section id="content" className="content" >
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/articles" element={<Articulos/>}/>
                    <Route path="/create" element={<Create_Article/>}/>                    
                    <Route path="/search/:search" element={<SearchArticle/>}/>
                    <Route path="/article/:id" element={<Article/>}/>
                    <Route path="/edit/:id" element={<EditArticle/>}/>
                    <Route path="/contact" element={<Contact/>}/>

                    <Route path="/*" element={<h1 className="heading">Error 404</h1>}/>
                </Routes>
            </section>
           <Sidebar/>
            <Footer />
        </BrowserRouter>
    )
}