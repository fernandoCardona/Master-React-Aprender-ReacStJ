//IMPORTACIONES REACT
import {
    Routes,
    Route,
    BrowserRouter, 
    NavLink
  } from "react-router-dom";

//IMPORTACIONES DE TERCEROS

//IMPORTACIONES DE LA APP
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Contacto } from "../components/pages/Contacto";
import { Curriculum } from "../components/pages/Curriculum";
import { Inicio } from "../components/pages/Inicio";
import {Portafolio} from "../components/pages/Portafolio";
import { Servicios } from "../components/pages/Servicios";
import { Proyecto } from "../components/pages/proyecto";





export const MisRutas = () => {


    return (
        <BrowserRouter>
            <Header />
            <section className="content">
                <Routes>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/curriculum" element={<Curriculum/>}/>
                    <Route path="/portafolio" element={<Portafolio/>}/>
                    <Route path="/servicios" element={<Servicios/>}/>
                    <Route path="/contacto" element={<Contacto/>}/>
                    <Route path="/proyecto/:id" element={<Proyecto/>}/>

                    <Route path="/*" element={<h1 className="heading">Error 404</h1>}/>
                </Routes>
            </section>
           
            <Footer />
        </BrowserRouter>
    )
}
