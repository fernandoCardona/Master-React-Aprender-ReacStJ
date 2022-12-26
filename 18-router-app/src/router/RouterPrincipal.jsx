//Importaciones de REACT
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Navigate,
  } from "react-router-dom";


//Importaciones de Terceros

//Importaciones de App
import { Articulos } from "../components/content/Articulos";
import { Contacto } from "../components/content/Contacto";
import { Error } from "../components/content/Error";
import { Inicio } from "../components/content/inicio";
import { Persona } from "../components/content/Persona";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { AcercaDe } from "../components/header/panel/AcercaDe";
import { CrearArticulo } from "../components/header/panel/CrearArticulo";
import { GestionUsuarios } from "../components/header/panel/GestionUsuarios";
import { InicioPanel } from "../components/header/panel/InicioPanel";
import { PanelControl } from "../components/header/PanelControl";


export const RouterPrincipal = () => {



    return (
        <BrowserRouter>
            
            <Header/>
            <section className="contenido-principal">
                <Routes>
                    <Route path="/" element={<Inicio/>}/>
                    <Route path="/inicio" element={<Inicio/>}/>
                    <Route path="/articulos" element={<Articulos/>}/>
                    <Route path="/contacto" element={<Contacto/>}/>
                    <Route path="/persona/:nombre" element={<Persona/>}/>
                    <Route path="/persona/:nombre/:apellido" element={<Persona/>}/>
                    <Route path="/persona/:nombre" element={<Persona/>}/>
                    <Route path="/persona" element={<Persona/>}/>
                    <Route path="/redirigir" element={<Navigate to='/persona/fernando/cardona'/>}/>
                    <Route path="/panel/*" element={<PanelControl/>}>
                        <Route index element={<InicioPanel/>}/>
                        <Route path="inicio" element={<InicioPanel/>}/>
                        <Route path="crear-articulos" element={<CrearArticulo/>}/>
                        <Route path="gestion-usuarios" element={<GestionUsuarios/>}/>
                        <Route path="acerca-de" element={<AcercaDe/>}/>
                    </Route>

                    <Route path="*" element={<Error/>}/>
                </Routes>
            </section>
            <Footer/>

             
        </BrowserRouter>
        
    )
}