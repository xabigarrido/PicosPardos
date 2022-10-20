import mongoose from 'mongoose'

const schemaCajaActual = new mongoose.Schema({
    abiertaPor: String,
    comandas: Array,
    dineroCaja: Number,
    empresa: String,
    fecha: Number
})

export default mongoose.model('CajaActual', schemaCajaActual)