import { Router } from "express";
import Mesa from "../models/mesasModel.js";
import validationResult from "../utils/validationResultMid.js";
import { body } from "express-validator";
const ruta = Router();

// ruta.get("/prueba", (req, res) => {
//   const obj = {
//     contenido: [
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10.60,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 20,
//       },
//       {
//         producto: "copa",
//         alchol: "Ron Brugal",
//         refresco: "Coca-cola",
//         precio: 10,
//       },
//       {
//         producto: "champagne",
//         alchol: "Moet Chandom",
//         refresco: "Fanta Limon",
//         precio: 150.50,
//       },
//       {
//         producto: "champagne",
//         alchol: "Moet Chandom",
//         refresco: "Fanta Limon",
//         precio: 150.10,
//       },
//       {
//         producto: "botella",
//         alchol: "Belverede",
//         refresco: "Royal Bliss",
//         precio: 100,
//       },
//     ],
//   };

//   let cuenta = 0;
//   let cuentaBotella = 0;
//   let cuentaChampagne = 0;
//   let cuentaCopa = 0;

//   const mapBotellas = obj.contenido.filter((product) => {
//     if (product.producto == "botella") {
//       return true;
//     }
//   });
//   const mapCopas = obj.contenido.filter((product) => {
//     if (product.producto == "copa") {
//       return true;
//     }
//   });
//   const mapChampagne = obj.contenido.filter((product) => {
//     if (product.producto == "champagne") {
//       return true;
//     }
//   });

//   function recorrerCuentaBotella(arreglo) {
//     if (arreglo.length > 0) {
//       for (let i = 0; i < arreglo.length; i++) {
//         cuentaBotella += arreglo[i].precio;
//       }
//     }
//   }
//   function recorrerCuentaCopa(arreglo) {
//     if (arreglo.length > 0) {
//       for (let i = 0; i < arreglo.length; i++) {
//         cuentaCopa += arreglo[i].precio;
//       }
//     }
//   }
//   function recorrerCuentaChampagne(arreglo) {
//     if (arreglo.length > 0) {
//       for (let i = 0; i < arreglo.length; i++) {
//         cuentaChampagne += arreglo[i].precio;
//       }
//     }
//   }
//   function recorrerCuentaFinal(obj) {
//     if (obj.contenido.length > 0) {
//       obj.contenido.map((product) => {
//         cuenta += product.precio;
//       });
//     }
//     // if (obj.contenido.length > 0) {
//     //   for (let i = 0; i < obj.contenido.length; i++) {
//     //     cuenta += obj.contenido[i].precio;
//     //   }
//     // }
//   }
//   recorrerCuentaBotella(mapBotellas);
//   recorrerCuentaChampagne(mapChampagne);
//   recorrerCuentaCopa(mapCopas);
//   recorrerCuentaFinal(obj);

//   const mapTodo = obj.contenido.map((product) => {
//     return product;
//   });
//   const comandaFinal = {
//     ...obj,
//     precioComandaVer: cuenta.toFixed(2),
//     precioComanda: cuenta
//   };
//   res.json({
//     comandaFinal,
//     cuentaBotella,
//     cuentaCopa,
//     cuentaChampagne,
//     cuenta,
//   });
// });

ruta.get("/", async (req, res) => {
  try {
    const data = await Mesa.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

ruta.get("/idMesa/:id", async (req, res) => {
  try {
    const data = await Mesa.find({_id: req.params.id});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});

ruta.post(
  "/add",
  [
    body("numeroMesa")
      .notEmpty()
      .withMessage("Debes rellenar el campo")
      .isNumeric()
      .withMessage("Debe ser un numero"),
    body("zona", "Rellena el campo zona").notEmpty(),
  ],
  validationResult,
  async (req, res) => {
    const data = await Mesa.find({
      numeroMesa: req.body.numeroMesa,
      zona: req.body.zona,
    });
    const ordenMesa = await Mesa.find();
    if (req.body.numeroMesa == 0)
      return res.status(400).json({msg: "La mesa 0 no se puede crear"});
    if (data.length > 0)
      return res.status(400).json({msg: "El numero de mesa ya existe en esa zona"});
    const newMesa = new Mesa({
      ...req.body,
      habilitarMesa: true,
      mesaAbierta: false,
      status: false,
      gestion: "null",
      cuenta: 0,
      mesaAbiertaPor: "Xabi",
      orden: ordenMesa.length,
      fecha: Date.now(),
    });
    await newMesa.save();
    res.json(newMesa);
  }
);

export default ruta;
