import logo from './logo.svg';
import './App.css';
import { Year } from './components/Year';

function App() {

  var currentYear = new Date().getFullYear();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Year year={currentYear}/>
          
        </header>
      </div>
    );
}

export default App;
