//IMPORTACIONES DE REACT:
import { useState } from 'react';

//IMPORTACIONES DE TERCEROS:

//IMPORTACIONES DE APP:
import { Buscador, Crear, Footer, Header, Listado, Nav } from './components';


function App() {
    //Pasmos listadoState del componente listado a componente principal para que por medio de props pasarlo a los diferentes componente que requieren su utilizacionaccordion
    const [listadoState, setListadoState] = useState([]);


    return (
        <div className="layout">
            {/* <!--Cabecera--> */}
            <Header/>

            {/* <!--Barra de navegación--> */}
            <Nav/>

            {/* <!--Contenido principal--> */}
            <section id="content" className="content">
                <Listado 
                    listadoState = { listadoState } 
                    setListadoState = { setListadoState }
                />
            </section>

            {/* <!--Barra lateral--> */}
            <aside className="lateral">
                <Buscador 
                    listadoState ={ listadoState } 
                    setListadoState = { setListadoState } 
                />
                <Crear 
                    listadoState = { listadoState } 
                    setListadoState = { setListadoState }
                />
            </aside>

            {/* <!--Pie de página--> */}
            <Footer/>

        </div>
    )
}

export default App;
