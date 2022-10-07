import mongoose from 'mongoose'

const schemaCajasFinales = new mongoose.Schema({
    abiertaPor: String,
    cerradaPor: String,
    comandas: Array,
    dineroCaja: Number,
    fecha: Number,
    fechaCerrada: Number
})

export default mongoose.model('CajaFinal', schemaCajasFinales)