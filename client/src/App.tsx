// import './App.css'
import { socket } from "./websocket";

function App() {
  return (
    <>
      <h1>{socket.connected ? "Connected" : "Not connected"}</h1>
    </>
  );
}

export default App;
