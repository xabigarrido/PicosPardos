import { Router } from "express";
import CajaActual from "../models/cajaActualModel.js";
const ruta = Router();

ruta.post("/add", async (req, res) => {
try {
    const nombreEncargado = "Xabi";
    const newCaja = new CajaActual({
      abiertaPor: nombreEncargado,
      dineroCaja: 0,
      fecha: Date.now(),
    });
    await newCaja.save();
} catch (error) {
    console.log(error)
}
});

export default ruta;
