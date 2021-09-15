import logo from './logo.svg';
import IntraDayChart from './IntraDayChart';
import FetchData from './FetchData';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IntraDayChart ></IntraDayChart>
        <FetchData 
        target='http://localhost:8000/invest/GetStockPriceHistory/' 
        interval='15min' 
        stock='TSLA'>
        </FetchData>
      </header>
    </div>
  );
}

export default App;
