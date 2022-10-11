import { Router } from "express";
import Tikada from "../models/tikadaEmpleadoModel.js";
import moment from "moment";
const ruta = Router();

ruta.post("/entrada", async (req, res) => {
  const newTikada = new Tikada(req.body);
  await newTikada.save();
  return res.send("ok");
});

ruta.put("/salida/:id", async (req, res) => {
  try {
    const getTikada = await Tikada.find({
      idEmpleado: req.params.id,
      estado: "abierta",
    });
    if (getTikada.length > 0) {
      getTikada[0].estado = "cerrada";
      getTikada[0].salida = moment().unix(),
      getTikada[0].salidaHumana = moment().format("DD/MM/YYYY HH:mm:ss");
      getTikada[0].horas = moment().diff(moment.unix(getTikada[0].entrada), "h");
      getTikada[0].minutos = moment().diff(moment.unix(getTikada[0].entrada), "m");
      getTikada[0].segundos = moment().diff(moment.unix(getTikada[0].entrada), "s");
      getTikada[0].totalTrabajado = `${getTikada[0].horas}:${getTikada[0].minutos}:${getTikada[0].segundos}`


      const fin = await Tikada.findByIdAndUpdate(getTikada[0].id, getTikada[0]);
      return res.send("Actualizado");
    } else {
      return res.send("No se encontro la tikada");
    }
  } catch (error) {
    console.log(error);
  }
});

ruta.get("/empleado/:id", async(req, res)=>{
  try {
    console.log(req.params.id)
    const data = await Tikada.find({idEmpleado: req.params.id, estado: "cerrada"})
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

export default ruta;
