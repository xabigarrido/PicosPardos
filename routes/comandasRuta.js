import { Router } from "express";
import Comanda from "../models/comandaModel.js";
import Mesa from "../models/mesasModel.js";

const ruta = Router();
ruta.get("/", async (req, res) => {
  const pal = [
    "fanta-limon",
    "fanta-limon",
    "heineken",
    "heineken",
    "cocacola",
    "fanta-limon",
    "fanta-limon",
    "fanta-limon",
    "heineken",
    "sprite",
  ];
  const resultado = {};
  pal.forEach((el) => (resultado[el] = resultado[el] + 1 || 1));
  const newArray = Object.entries(resultado);
  const result = newArray.forEach((el) => {
    console.log("El producto: " + el[0] + " se repite: " + el[1]);
  });
  res.send("ok");
});
// ruta.post("/add", async (req, res) => {
//   try {
//     const newComanda = new Comanda({
//       idMesa: "630f23abee5282afec2a46e3", //Mesa 1 Terraza
//       tipo: ["Botella", "Copas"],
//       contenido: [
//         {
//           producto: "copa",
//           alchol: "Ron Brugal",
//           refresco: "Coca-cola",
//           precio: 30,
//         },
//         {
//           producto: "copa",
//           alchol: "Segrams",
//           refresco: "Fanta-Limon",
//           precio: 20,
//         },
//         {
//           producto: "botella",
//           alchol: "Hendricks",
//           refresco: ["coca-cola", "fanta-limon"],
//           precio: 383,
//         },
//       ],
//       precioComanda: 0,
//       fecha: Date.now(),
//       atendidoPor: "Xabi",
//       pagada: false,
//     });
//     let precio = 0;
//     const calcular = (obj) => {
//       console.log(obj);
//       for (let i = 0; i < obj.contenido.length; i++) {
//         precio += obj.contenido[i].precio;
//       }
//     };
//     calcular(newComanda);
//     newComanda.precioComanda = precio;
//     console.log(newComanda);
//     await newComanda.save();
//     res.send("agregado");
//   } catch (error) {
//     console.log(error);
//   }
// });

ruta.post("/addComanda", async (req, res) => {
  try {
    const newComanda = new Comanda(req.body);
    await newComanda.save();
    res.send("ok");
  } catch (error) {
    console.log(error);
  }
});

ruta.get("/getcomanda/:id", async (req, res) => {
  try {
    const data = await Comanda.find({ idMesa: req.params.id, pagada: false });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

ruta.put("/handlePagado/:id", async (req, res) => {
  const separar = req.params.id.split(",");
  // console.log('idMesa: ' +separar[0])
  // console.log('idComanda: '+separar[1])
  // console.log('idPrecisa: '+separar[2])
  const data = await Comanda.find({
    _id: separar[2],
    idMesa: separar[0],
    pagada: false,
  });
  const foundComanda = data.map((element) =>
    element.contenido.map((element) => {
      if (element.idComanda == separar[1]) {
        element.pagadaIndiComanda = !element.pagadaIndiComanda;
        return element;
      }

      return element;
    })
  );

  const foundMesa = await Comanda.findByIdAndUpdate(separar[2], {
    contenido: foundComanda[0],
  });
  res.json({ ok: "ok" });
});

ruta.put("/handleCobrarTodo/:id", async (req, res) => {
  const query = await Comanda.updateMany(
    { idMesa: req.params.id },
    { $set: { pagada: true } }
  );
  res.send("ok");
});

ruta.get("/getComandaCajaActual/:id", async (req, res) => {
  const data = await Comanda.find({ idCaja: req.params.id });
  res.json(data);
});

export default ruta;
