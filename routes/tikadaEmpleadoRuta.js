import { Router } from "express";
import Tikada from "../models/tikadaEmpleadoModel.js";
import moment from "moment";
const ruta = Router();
function secondsToString(seconds) {
  var hour = Math.floor(seconds / 3600);
  hour = (hour < 10)? '0' + hour : hour;
  var minute = Math.floor((seconds / 60) % 60);
  minute = (minute < 10)? '0' + minute : minute;
  var second = seconds % 60;
  second = (second < 10)? '0' + second : second;
  return hour + ':' + minute + ':' + second;
}
ruta.post("/entrada", async (req, res) => {
  console.log(req.body)
  const newTikada = new Tikada(req.body);
  await newTikada.save();
  return res.send("ok");
});

ruta.put("/salida/:id", async (req, res) => {
  console.log(req.body)
  try {
    const getTikada = await Tikada.find({
      idEmpleado: req.params.id,
      estado: "abierta",
    });
    if (getTikada.length > 0) {
      
      getTikada[0].estado = "cerrada";
      getTikada[0].salida = req.body.salida,
      getTikada[0].salidaHumana = req.body.salidaHumana,

      getTikada[0].segundos = moment().diff(moment.unix(getTikada[0].entrada), "s");
      getTikada[0].totalTrabajado = secondsToString(getTikada[0].segundos)
      const separar = getTikada[0].totalTrabajado.split(":")
      getTikada[0].horas = separar[0]
      getTikada[0].minutos = separar[1]
      getTikada[0].segundosMostrar = separar[2]


      const fin = await Tikada.findByIdAndUpdate(getTikada[0].id, getTikada[0]);
      return res.send("Actualizado");
    } else {
      return res.send("No se encontro la tikada");
    }
  } catch (error) {
    console.log(error);
  }
});

ruta.get("/empleado/:id/:mes/:year", async(req, res)=>{
  try {
    console.log(req.params)
    const data = await Tikada.find({idEmpleado: req.params.id, estado: "cerrada", mes: req.params.mes, año: req.params.year})
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})
ruta.delete("/tikadaDelete/:id", async(req, res)=>{
  try {
    await Tikada.findByIdAndDelete(req.params.id)
    res.send('eliminada')
  } catch (error) {
    console.log(error)
  }
})
export default ruta;
