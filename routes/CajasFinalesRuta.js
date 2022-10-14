import { Router } from "express";
import CajaFinal from "../models/cajaFinalesModel.js";
import moment from "moment";

const ruta = Router();
ruta.get("/", async (req, res) => {
  try {
    const data = await CajaFinal.find({}).sort({fechaCerrada: -1});
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

ruta.get("/id/:id", async (req, res) => {
    try {
        const data = await CajaFinal.findById(req.params.id);
        res.json(data);
    } catch (error) {
        console.log(error)
    }
});
export default ruta;
