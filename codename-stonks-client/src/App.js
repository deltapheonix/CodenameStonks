import logo from './logo.svg';
import IntraDayChart from './IntraDayChart';
import FetchData from './FetchData';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IntraDayChart ></IntraDayChart>
        <FetchData></FetchData>
      </header>
    </div>
  );
}

export default App;
