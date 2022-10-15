import { Router } from "express";
import { body } from "express-validator";
import Empleado from "../models/empleadosModel.js";
import uploadMiddlewares from "../utils/middlewareStorage.js";
import validationResultMid from "../utils/validationResultMid.js";
import jwt from "jsonwebtoken";
import b from "bcryptjs";
const ruta = Router();
ruta.delete("/deleteEmpleado/:id", async (req, res)=>{
  try {
    const data = await Empleado.findByIdAndDelete(req.params.id)
    console.log(data)
    res.send('Eliminado')
  } catch (error) {
    console.log(error)
  }
})
ruta.put(
  "/cambiarFoto/:id",
  uploadMiddlewares.single("image"),
  async (req, res) => {
    try {
      console.log(req.file)
      await Empleado.findByIdAndUpdate(req.params.id, {
        foto: req.file.filename,
      });
      return res.send("Actualizado");
    } catch (error) {
      console.log(error);
      return res.send("Usuario no encontrado");
    }
  }
);

ruta.post(
  "/add",
  [
    body("nombre", "Debes escribir un nombre").isLength({ min: 1 }),
    body("apellidos", "Debes escribir un apellido").isLength({ min: 1 }),
    body("dni", "Debes escribir un DNI").isLength({ min: 1 }),
    body("email", "Debe ser un email valido").isEmail().normalizeEmail(),
    body("password", "La contraseña minimo 6 caracteres").isLength({ min: 6 }),
    body("password").custom((value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      return value;
    }),
  ],
  validationResultMid,
  async (req, res) => {
    try {
      console.log(req.body)
      const { dni, email } = req.body;

      const data = await Empleado.find({ $or: [{ dni }, { email }] });
      if (data.length > 0) return res.json([{ msg: "El usuario ya existe" }]);
      const newEmpleado = new Empleado({
        ...req.body,
        dni: dni.toLowerCase(),
        email: email.toLowerCase(),
        foto: "fotoDefault.png",
        habilitarNotificaciones: false,
        tokenNotificacion: "null",
        totalCopas: 0,
        totalCopasHoy: 0,
        totalBotellas: 0,
        totalBotellasHoy: 0,
        totalChampagne: 0,
        totalChampagneHoy: 0,
        conectado: false,
        tikado: false,
        habilitadoUser: true,
        diaCreado: new Date(),
      });
      const token = jwt.sign({ id: newEmpleado.id }, "123");
      await newEmpleado.save();
      return res.json({ token });
    } catch (error) {
      console.log(error.code);
      if (error && error.code === 11000) {
        return res.json([{ msg: "El usuario ya existe" }]);
      }
    }
  }
);

ruta.get("/", async (req, res) => {
  try {
    const data = await Empleado.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
ruta.get("/user/:id", async (req, res) => {
  try {
    const data = await Empleado.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    return res.json(error);
  }
});
ruta.put("/changeInfo/:id", async (req, res) => {
  try {
    console.log(req.body);
    await Empleado.findByIdAndUpdate(req.params.id, req.body);
    return res.send("Actualizado");
  } catch (error) {
    console.log(error);
  }
});

ruta.post("/login", async (req, res) => {
  try {
    const email = req.body.email.toLowerCase();
    const dni = req.body.email.toLowerCase();
    const userFound = await Empleado.find({ $or: [{ email }, { dni }] });

    if (userFound.length == 0)
      return res.status(404).json([false, { message: "No existe el usuario" }]);

    const check = b.compareSync(req.body.password, userFound[0].password);

    if (check === true) {
      res.status(200).json([true, userFound[0]]);
    } else {
      res.status(404).json([false, { message: "Credenciales incorrectas" }]);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

ruta.get("/updateCantidad", async (req, res) => {
  try {
    await Empleado.updateMany(
      {},
      { totalBotellas: 0, totalCopas: 0, totalChampagne: 0 }
    );
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});

ruta.put("/updateCantidadComanda", async (req, res) => {
  console.log(req.body);
  const { botellas, copas } = req.body;
  console.log(copas)
  try {
    await Empleado.findByIdAndUpdate(req.body.idUser, {
      $inc: {totalBotellas: botellas, totalBotellasHoy: botellas, totalCopas: copas, totalCopasHoy: copas},
    });
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});
export default ruta;
