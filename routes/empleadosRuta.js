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
      const query = await Empleado.findByIdAndUpdate(req.params.id, {
        foto: req.file.filename,
      });
      console.log(query)
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
    body("telefono", "Debes escribir un telefono").isLength({ min: 1 }),
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
        nombreCompleto: `${req.body.nombre} ${req.body.apellidos}`,
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
    const dni = req.body.email
    console.log(dni)
    const found = await Empleado.find({dni: req.body.email})
    console.log(found)
    const userFound = await Empleado.find({ $or: [{ dni }, { email }] });

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

ruta.put(
  "/editarEmpleado/:id",
  // [
  //   body("nombre", "Debes escribir un nombre").isLength({ min: 1 }),
  //   body("apellidos", "Debes escribir un apellido").isLength({ min: 1 }),
  //   body("dni", "Debes escribir un DNI").isLength({ min: 1 }),
  //   body("telefono", "Debes escribir un telefono").isLength({ min: 1 }),
  //   body("cuentaBancaria", "Debes escribir una cuenta bancaria").isLength({ min: 1 }),
  //   body("email", "Debe ser un email valido").isEmail().normalizeEmail(),
  //   // body("password", "La contraseña minimo 6 caracteres").isLength({ min: 6 }),
  //   // body("password").custom((value, { req }) => {
  //   //   if (value !== req.body.repassword) {
  //   //     throw new Error("Las contraseñas no coinciden");
  //   //   }
  //   //   return value;
  //   // }),
  // ],
  // validationResultMid,
  async (req, res) => {
    try {
      // const { dni, email } = req.body;

      // const data = await Empleado.find({ $or: [{ dni }, { email }] });
      // if (data.length > 0) return res.json([{ msg: "El usuario ya existe" }]);
      // console.log(req.body)
      const query = await Empleado.findByIdAndUpdate(req.params.id, req.body.action)
      res.send('Actualizado')
      // console.log('Actssu')

    } catch (error) {
      console.log(error.code);
      if (error && error.code === 11000) {
        return res.json([{ msg: "El usuario ya existe" }]);
      }
    }
  }
);

// ruta.put("/changeEmpresa", async(req, res)=>{
//   try {
//     await Empleado.updateMany({empresa: '6350346b5e2286c0a43467c4'})
//     res.send('actualizado')
//   } catch (error) {
//     console.log(error)
//   }
// })

ruta.post("/buscarEmpleados", async (req, res) => {
  try {
    const data = await Empleado.find(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// ruta.put("/nombre", async(req, res)=>{
//   try {
//     const data = await Empleado.find();
//     for(let i = 0; i < data.length; i++){
//       await Empleado.findByIdAndUpdate(data[i]._id, {nombreCompleto: `${data[i].nombre} ${data[i].apellidos}`})
//     }
//     // await Empleado.updateMany({empresa: '6350346b5e2286c0a43467c4'})
//     res.send('actualizado')
//   } catch (error) {
//     console.log(error)
//   }
// })

ruta.put("/empresa", async(req, res)=>{
  try {
    const empleados = await Empleado.find();
    console.log(empleados.length)
    for(let i = 0; i< empleados.length; i++){
      console.log(empleados[i])
      // if(empleados[i].empresa == "635034ab5e2286c0a43467c8"){
      //   await Empleado.findByIdAndUpdate(empleados[i]._id, {nombreEmpresa: 'Rosso'})
      // }
    }
    res.send(empleados)
  } catch (error) {
    console.log(error)
  }
})
export default ruta;
