import { useEffect, useState } from "react";
import { socket } from "./websocket";
import type { ServerStatus } from "@appTypes/index";
import ServerStatusCard from "@components/ServerStatusCard"
import { REGIONS } from "@data/regions"

function App() {
  const [data, setData] = useState<ServerStatus | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [region, setRegion] = useState<string>(REGIONS[0]);

  useEffect(() => {
    const onListen = (data: ServerStatus) => {
      console.log(data);
      setData(data);
    };

    const onError = (error: string) => {
      console.log(error);
      setErrorMessage(error);
    };

    socket.on(region, onListen);
    socket.on("error", onError);

    return () => {
      socket.off(region, onListen);
      socket.off("error", onError);
    };
  }, [region]);

  return (
    <>
      <header className="flex flex-wrap gap-6 justify-center items-center gap-x-12 p-7 w-full bg-gradient-to-r from-[#E081FA] to-[#8D5AF5]">
        <p className="text-7xl text-white">Upscope</p>

        <select
          defaultValue={REGIONS[0]}
          className="bg-white border outline-none border-slate-300 rounded-lg shadow-sm p-3"
          onChange={(e) => {
            setErrorMessage("");
            setRegion(e.target.value);
          }}
        >
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </header>
      <main className="flex flex-col h-full items-center p-8">
        {data && <ServerStatusCard data={data} />}
        {errorMessage && (
          <div className="absolute top-[50%] p-10 bg-rose-50 text-rose-700 ring-1 ring-rose-200 rounded-xl shadow-lg">
            <p className="text-2xl ">Error: {errorMessage}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
