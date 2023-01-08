import { useEffect, useState } from 'react'
 
import './App.css'
import { PruebaContext } from './context/PruebaContext'
import { AppRouter } from './routes/AppRouter'



function App() {

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    //se ejecuta la primera vez que se carga el componente 
    let usuario_Local= JSON.parse(localStorage.getItem('usuario'));
    setUsuario(usuario_Local);
  }, []);

  useEffect(() => {
    //Cada vez que se actualice el usuario se guarda en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuario));

  }, [usuario]);
  const curso = {
    id: 1,
    titulo: "Master JavaScript",
    contenido: "Curso de JavaScript ES6"
  }

  return (
    <div className="App">
      <PruebaContext.Provider value={ { usuario, setUsuario } }>
        <AppRouter/>
      </PruebaContext.Provider>     
    </div>
  )
}

export default App
