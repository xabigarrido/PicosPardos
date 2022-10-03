import { Router } from "express";
import validationResultMid from "../utils/validationResultMid.js";
import { body } from "express-validator";
import middlewareStorage from "../utils/middlewareStorage.js";
import Product from "../models/productModel.js";
const ruta = Router();
ruta.get('/', async(req, res)=>{
  try {
    const data = await Product.find();
    return res.status(200).json(data)
  } catch (error) {
    console.log(error)
  }
})
ruta.post(
  "/add",
  middlewareStorage.single("image"),
  [
    body("nombre", "Debes poner un nombre").trim().notEmpty(),
    body("categoria", "Debes poner una categoria").trim().notEmpty(),
    body("precio", "Debes poner un precio").notEmpty(),
  ],
  validationResultMid,
  async (req, res) => {
    try {
      const data = await Product.find();
      const obj = JSON.parse(JSON.stringify(req.body));
      const newProduct = new Product({
        ...obj,
        nombreMin: obj.nombre.toLowerCase(),
        categoriaMin: obj.categoria.toLowerCase(),
        status: true,
        stock: 0,
        imagen: req.file.filename,
        orden: data.length,
        fecha: Date.now(),
      });
      await newProduct.save();
      console.log(newProduct)
      res.json(newProduct);
    } catch (error) {
      console.log(error);
    }
  }
);

export default ruta;
