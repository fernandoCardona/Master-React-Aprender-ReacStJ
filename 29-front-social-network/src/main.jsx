//Importaciones de paquetes de React:
import React from 'react';
import ReactDOM from 'react-dom/client';

//Importaciones de paquetes de terceros:
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
 
//Importaciones de HOOKS/HELPES/CONTEXT:

//Importaciones de ASSETS:
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css';
import './assets/css/normalize.css';
import './assets/css/styles.css';
import './assets/css/responsive.css';

//Importaciones de COMPONENTES de la App:
import App from './App';

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(en)
//0.0- Arrancaamos APP de React:
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
