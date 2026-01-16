import express from "express";
import http from "http";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/ProductRoute.js";
import orderRoutes from "./src/routes/OrderRoute.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: "*" },
});

connectDB();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.get("/", (req, res) => {
    res.send("Backend Running!");
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

io.on("connection", (socket) => {
    console.log("Websocket connected:", socket.id);
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server + Socket.IO running on port ${PORT}`);
});
