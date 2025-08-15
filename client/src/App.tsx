import { useEffect, useState } from "react";
import { socket } from "./websocket";
import type { ServerStatus } from "./types";

function App() {
  const [data, setData] = useState<ServerStatus | null>(null);

  useEffect(() => {
    socket.on("endpoint", (data) => {
      console.log("response ->", data);
      setData(data);
    });
  }, [socket]);

  return (
    <>
      <h1>{socket.connected ? "Connected" : "Not connected"}</h1>
      <p className="text-lg text-black">{data?.version}</p>
    </>
  );
}

export default App;
