import mongoose from 'mongoose'

const schemaCajasFinales = new mongoose.Schema({
    abiertaPor: String,
    cerradaPor: String,
    Comandas: Array,
    DineroCaja: Number,
    fecha: Number
})

export default mongoose.model('CajaFinal', schemaCajasFinales)