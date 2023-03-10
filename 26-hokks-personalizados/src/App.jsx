import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { MiComponente } from './components/MiComponente'
import { MiFormulario } from './components/MiFormulario'
import { MiUsuario } from './components/MiUsuario'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hooks Personalizados</h1>
      <hr />
      <MiComponente/>
      <hr />
      <MiFormulario/>
      <hr />
      <MiUsuario/>
    </div>
  )
}

export default App
