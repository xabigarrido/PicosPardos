import { Router } from "express";
import { body } from "express-validator";
import validationResult from "../utils/validationResultMid.js";
import Zona from "../models/zonasModel.js";

const ruta = Router();

ruta.post(
  "/add",
  [
    body("nombre", "Debes rellenar el nombre").trim().notEmpty(),
    body("descripcion", "Debes rellenar la descripcion").trim().notEmpty(),
    validationResult,
  ],
  async (req, res) => {
    const data = await Zona.find({ nombre: req.body.nombre });
    if (data.length > 0)
      return res.status(400).send("La zona con ese nombe ya existe");
    const ordenZona = await Zona.find();
    const newZona = new Zona({
      ...req.body,
      nombreMin: req.body.nombre.toLowerCase(),
      habilitarZona: true,
      orden: ordenZona.length,
      fecha: Date.now(),
    });
    await newZona.save()
    res.json(newZona);
  }
);

export default ruta;
