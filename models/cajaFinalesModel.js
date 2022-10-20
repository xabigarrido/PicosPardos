import mongoose from 'mongoose'

const schemaCajasFinales = new mongoose.Schema({
    abiertaPor: String,
    cerradaPor: String,
    comandas: Array,
    dineroCaja: Number,
    fecha: Number,
    empresa: String,
    fechaCerrada: Number
})

export default mongoose.model('CajaFinal', schemaCajasFinales)