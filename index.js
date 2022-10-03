import express from "express";
import http from "http";
import { Server as ServerSocket } from "socket.io";
import morgan from "morgan";
import { connectDb } from "./database/database.js";
import empleadosRuta from "./routes/empleadosRuta.js";
import productsRuta from "./routes/productsRuta.js";
import categoryRuta from "./routes/categoryRuta.js";
import mesaRuta from "./routes/mesaRuta.js";
import zonaRuta from "./routes/zonaRuta.js";
import comandasRuta from "./routes/comandasRuta.js";
import cajaActualRuta from "./routes/cajaActualRuta.js";
import tikadaRuta from './routes/tikadaEmpleadoRuta.js'
import notificationRuta from './routes/notificationRuta.js'
import cors from 'cors'
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new ServerSocket(server, {
    cors: {
        origin: '*'
    }
});
connectDb();
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

io.on("connection", (socket) => {
    console.log('??' + socket.id)

//   socket.on("prueba", (data) => {
//     console.log(data);
//     io.emit("suma");
//   });
//   socket.on('delete', ()=>{
//     io.emit('cliente:delete')
//   })
});

app.use("/api/empleados", empleadosRuta);
app.use("/api/products", productsRuta);
app.use("/api/category", categoryRuta);
app.use("/api/mesas", mesaRuta);
app.use("/api/zonas", zonaRuta);
app.use("/api/comandas", comandasRuta);
app.use("/api/cajaActual", cajaActualRuta);
app.use("/api/tikada", tikadaRuta);
app.use("/api/notification", notificationRuta);

server.listen(4000, () => {
  console.log("👌👌 Servidor en puerto: " + 4000);
});
