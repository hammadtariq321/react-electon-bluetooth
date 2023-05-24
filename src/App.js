import logo from './logo.svg';
import './App.css';

function App() {

  const handleClick = async () => {
    console.log("navigator", navigator)
    const device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    console.log('device:', device)
    if (device) {
      let bleDevice = device;
      bleDevice.gatt
        .connect()
        .then((server) => {
          // bleGattServer = server;
          // setBleGattServer(server)
          // setConnected(true);
          console.log('BLE Connected', server);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleClick}>Click Me</button>
      </header>
    </div>
  );
}

export default App;
