import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { EjemploComponente } from './components/EjemploComponente'

function App() {
  

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
      <h1>useLayoutEffect</h1>
      <hr />
      <EjemploComponente/>

      
    </div>
  )
}

export default App
