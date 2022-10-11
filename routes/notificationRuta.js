import { Router } from "express";
import Notification from "../models/notificationsModel.js";
const ruta = Router();

ruta.get("/tokens", async (req, res) => {
  try {
    const data = await Notification.find();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

ruta.post("/addToken", async (req, res) => {
  try {
    if (req.body.token != "") {
      const tokenFound = await Notification.find({ token: req.body.token });
      // console.log(tokenFound.length);
      if (tokenFound.length == 0) {
        const newToken = new Notification(req.body);
        await newToken.save();
        return res.send("Agregado");
      } else {
        // console.log("Ya existe el pushToken");
        res.send("Ya existe");
      }
      return;
    } else {
      res.send("Llego el token vacio");
    }
  } catch (error) {
    console.log(error);
  }
});

export default ruta;
