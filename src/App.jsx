import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';
// fvtt-Scene-test-example.json

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Map />
    </div>
  );
}

export default App;
