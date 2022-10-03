import mongoose from "mongoose";
import b from "bcryptjs";
const schemaEmpleado = new mongoose.Schema({
  email: { type: String, required: true, trim: true, unique: true },
  nombre: { type: String, required: true, trim: true },
  apellidos: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  dni: { type: String, required: true, trim: true, unique: true },
  foto: String,
  habilitarNotificaciones: Boolean,
  tokenNotificacion: { type: String },
  totalCopas: { type: Number },
  totalBotellas: { type: Number },
  totalChampagne: { type: Number },
  conectado: Boolean,
  tikado: { type: Boolean },
  rango: { type: String },
  habilitadoUser: Boolean,
  diaCreado: { type: String },
});

schemaEmpleado.pre("save", async function (next) {
  try {
    const salt = await b.genSaltSync(10);
    const hash = await b.hashSync(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("Empleado", schemaEmpleado);
