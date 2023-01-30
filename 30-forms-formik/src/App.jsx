//IMPORTACIONES DE REACT:
import { useState } from 'react';
//IMPORTACIONES DE EXTERNAL PACKS:

//IMPORTACIONES DE HOOKS/HELPERS:

//IMPORTACIONES DE ASSETS:
import reactLogo from './assets/react.svg'
import './App.css'

//IMPORTACIONES DE APP COMPONENTS:
import { MyForm } from './components/MyForm';


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
      <h1>Forms with Formik</h1>
      <MyForm/>
    </div>
  )
}

export default App
