import { Router } from "express";
import CajaActual from "../models/cajaActualModel.js";
import CajaFinal from "../models/cajaFinalesModel.js";
import moment from 'moment'
import mongoose from 'mongoose'
// import {connectDb} from '../database/database.js'
// connectDb();
const ruta = Router();
ruta.get("/", async (req, res) => {
  const data = await CajaActual.find();
  res.json(data);
});
ruta.post("/add", async (req, res) => {
  try {
    const newCaja = new CajaActual({
      abiertaPor: req.body.abiertaPor,
      dineroCaja: 0,
      fecha: Date.now(),
    });
    await newCaja.save();
    return res.send("Abierta");
  } catch (error) {
    console.log(error);
  }
});

ruta.put("/addComanda", async (req, res) => {
  const idCajaActual = await CajaActual.find();
  let listcomandas = idCajaActual[0].comandas;
  const newArraycomandas = req.body.comandas[0].map((element) => {
    if (element.pagadaIndiComanda == false) {
      return element;
    }
  });
  const filterArray = newArraycomandas.filter(
    (element) => element != undefined
  );
  for (let i = 0; i < filterArray.length; i++) {
    listcomandas.push(filterArray[i]);
  }
  await CajaActual.findByIdAndUpdate(idCajaActual[0]._id, {
    dineroCaja: idCajaActual[0].dineroCaja + req.body.precio,
    comandas: listcomandas,
  });
  res.send("ok actualixado");
});
ruta.put("/addComandaIndi", async (req, res) => {
  const arrayComandas = [req.body.comandas];
  console.log(req.body.precio);
  const idCajaActual = await CajaActual.find();
  let listcomandas = idCajaActual[0].comandas;
  for (let i = 0; i < arrayComandas.length; i++) {
    listcomandas.push(arrayComandas[i]);
  }
  await CajaActual.findByIdAndUpdate(idCajaActual[0]._id, {
    dineroCaja: idCajaActual[0].dineroCaja + req.body.precio,
    comandas: listcomandas,
  });
  res.send("ok actualixado");
});

ruta.post("/cerrarCaja", async (req, res) => {
  const data = await CajaActual.find();
  const newCajafinal = new CajaFinal({
    ...data[0]._doc,
    cerradaPor: req.body.nombreCompleto,
    fechaCerrada: moment()
  });
  await newCajafinal.save()
  await CajaActual.findByIdAndDelete(data[0]._id)
  await mongoose.connection.collection('comandas').drop()
  return res.send("Caja cerrada");
});

export default ruta;
