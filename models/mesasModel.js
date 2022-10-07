import mongoose from 'mongoose'

const schemaMesa = new mongoose.Schema({
    zona: String,
    numeroMesa: Number,
    habilitarMesa: Boolean, // Para auto-pedir
    mesaAbierta: Boolean, //  new uuid?id??? true, vacio false
    status: Boolean,
    sinPagarComandas: Number,
    cuenta: Number,
    mesaAbiertaPor: String,
    orden: Number,
    fecha: String
});

export default mongoose.model('Mesa', schemaMesa)