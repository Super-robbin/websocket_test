import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { Server } from "socket.io";

const PORT = Number(process.env.PORT) || 8080;
const ORIGIN = process.env.ORIGIN || "*";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: ORIGIN },
});

app.use(cors({ origin: ORIGIN }));

const fetchData = async () => {
  const response = await fetch(
    "https://data--us-east.upscope.io/status?stats=1"
  );
  const data = await response.json();
  console.log("data ->", data);
  return data;
};

io.on("connection", async (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  const data = await fetchData()
  io.emit("endpoint", data);
});

server.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
