import { Router } from "express";
import Reserva from "../models/reservasModel.js";
const ruta = Router();

ruta.post("/addReserva", async (req, res) => {
  try {
    const newReserva = new Reserva(req.body);
    await newReserva.save();
    res.send("iok");
  } catch (error) {
    console.log(error);
  }
});

ruta.get("/getReserva/:id/:idEmpresa", async (req, res) => {
  try {
    const data = await Reserva.find({
      reservaDia: req.params.id,
      empresa: req.params.idEmpresa,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
ruta.get("/getReservas/:idEmpresa", async (req, res) => {
  try {
    console.log(req.params.idEmpresa);
    const data = await Reserva.find({ empresa: req.params.idEmpresa });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

ruta.put("/reservaRecibida/:id", async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    await Reserva.findByIdAndUpdate(
      { _id: req.params.id },
      { reservaLlegada: !reserva.reservaLlegada }
    );
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});

ruta.delete("/deleteReserva/:id", async (req, res) => {
  try {
    await Reserva.findByIdAndDelete(req.params.id);
    res.send("eliminado");
  } catch (error) {
    console.log(error);
  }
});
export default ruta;
