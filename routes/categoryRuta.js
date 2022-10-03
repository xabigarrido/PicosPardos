import { Router } from "express";
import { body } from "express-validator";
import validationResult from "../utils/validationResultMid.js";
import Category from "../models/categoryModel.js";
const ruta = Router();

ruta.post(
  "/add",
  [body("nombre", "Escribe un nombre").trim().notEmpty()],
  validationResult,
  async (req, res) => {
    try {
      const data = await Category.find();
      const newCategory = new Category({
        ...req.body,
        nombreMin: req.body.nombre.toLowerCase(),
        status: true,
        orden: data.length,
        fecha: Date.now(),
      });
      await newCategory.save();
      res.json(newCategory);
    } catch (error) {
      console.log(error);
    }
  }
);

export default ruta;
