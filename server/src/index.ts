import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { REGIONS } from "./data/regions";
import { fetchData } from "./utils/fetchData";

const PORT = Number(process.env.PORT) || 8080;
const ORIGIN = process.env.ORIGIN || "*";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: ORIGIN },
});

app.use(cors({ origin: ORIGIN }));

io.on("connection", async (socket) => {
  console.log("a user connected");

  const interval = setInterval(async () => {
    try {
      for (const region of REGIONS) {
        const data = await fetchData(region);
        socket.emit(region, data);
      }
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      clearInterval(interval);
      socket.emit("error", { message: error.message });
    }
  }, 1000);

  socket.on("disconnect", () => {
    console.log("user disconnected");
    clearInterval(interval);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
